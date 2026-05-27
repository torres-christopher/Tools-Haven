// Dependencies
import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
// Config
import { env } from './config/env.js'
// System middleware
import { localsMiddleware } from './middleware/locals.js'
import { notFoundHandler } from './middleware/not-found.js'
import { errorHandler } from './middleware/error-handler.js'
// Routes - Core
import coreRoutes from './modules/core/core.routes.js'
// Routes - Tools
import textRouter from './modules/tools/text/text.routes.js'
import developerRouter from './modules/tools/developer/developer.routes.js'
import healthRouter from './modules/tools/health/health.routes.js'
import czechRouter from './modules/tools/czech/czech.routes.js'

// Initialise dirname and filename (NodeNext does not allow)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Define rate limiter
const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  limit: env.RATE_LIMIT_MAX,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56,
})

// Run app
const app = express()

// Locals must be before routers and helmet
app.use(localsMiddleware)

// Trust proxy headers (for codespaces and Roští.cz)
app.set('trust proxy', 1)

// Helmet for security in headers
app.use(
  helmet({
    contentSecurityPolicy:
      env.NODE_ENV === 'development' // Disable for development
        ? false
        : {
            directives: {
              'default-src': ["'self'"],
              'script-src': [
                "'self'",
                'cdnjs.cloudflare.com',
                'www.googletagmanager.com',
                'pagead2.googlesyndication.com',
                (_req, res) => `'nonce-${(res as express.Response).locals.nonce}'`, // Cast as response otherwise it does not recognise locals
              ],
              'style-src': ["'self'", 'fonts.googleapis.com'],
              'font-src': ["'self'", 'fonts.gstatic.com'],
              'connect-src': ["'self'", 'www.google-analytics.com', 'analytics.google.com'],
              'frame-src': ["'self'", 'www.googletagmanager.com'],
              'img-src': ["'self'", 'pagead2.googlesyndication.com', 'googleads.g.doubleclick.net'],
            },
          },
  }),
)

// Rate limiting
app.use(limiter)

// Initialise Pug templates
app.set('view engine', 'pug')
app.set('views', join(__dirname, '../views'))

// Static files
app.use(express.static(join(__dirname, '../public')))

// Body parsing
app.use(express.json({ limit: '100kb' }))
app.use(express.urlencoded({ extended: true, limit: '500kb' }))

// Core routes
app.use('/', coreRoutes)

//Tool routes
app.use('/textove-nastroje', textRouter)
app.use('/vyvojarske-nastroje', developerRouter)
app.use('/zdravotni-nastroje', healthRouter)
app.use('/ceske-nastroje', czechRouter)

// On 404
app.use(notFoundHandler)

// Error handler - Needs to be last
app.use(errorHandler)

export { app }
