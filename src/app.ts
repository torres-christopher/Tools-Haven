// Dependencies
import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
// Config
import { env } from './config/env.js'
import { handle } from 'i18next-http-middleware'
import i18next from './config/i18n.js'
// System middleware
import { localsMiddleware } from './middleware/locals.js'
import { notFoundHandler } from './middleware/not-found.js'
import { errorHandler } from './middleware/error-handler.js'
// Routes - Core
import coreRoutes from './modules/core/core.routes.js'
// Routes - Language variants
import langRouter from './modules/tools/lang.router.js'

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
                'https://*.googletagmanager.com',
                'https://cdnjs.cloudflare.com',
                'https://pagead2.googlesyndication.com',
                'blob:',
                (_req, res) => `'nonce-${(res as express.Response).locals.nonce}'`, // Cast as Response otherwise it does not recognise locals
              ],
              'style-src': ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
              'font-src': ["'self'", 'https://fonts.gstatic.com'],
              'connect-src': [
                "'self'",
                'https://*.google-analytics.com',
                'https://*.analytics.google.com',
                'https://*.googletagmanager.com',
              ],
              'frame-src': ["'self'", 'https://www.googletagmanager.com'],
              'img-src': [
                "'self'",
                'https://*.google-analytics.com',
                'https://*.googletagmanager.com',
                'https://pagead2.googlesyndication.com',
                'https://googleads.g.doubleclick.net',
              ],
              'worker-src': ["'self'", 'blob:'], // Ace Editor web worker
            },
          },
  }),
)

// Rate limiting
app.use(limiter)

// Locales
app.use(handle(i18next))

// Initialise Pug templates
app.set('view engine', 'pug')
app.set('views', join(__dirname, '../views'))

// Static files
app.use(express.static(join(__dirname, '../public')))

// Body parsing
app.use(express.json({ limit: '100kb' }))
app.use(express.urlencoded({ extended: true, limit: '500kb' }))

// Language detection and redirect to the appropriate language
app.get('/', (req, res) => {
  const accepted = req.acceptsLanguages(['cs', 'sk'])
  const lang = accepted && accepted !== 'cs' ? accepted : 'cs'
  res.redirect(302, `/${lang}`)
})

// Core routes
app.use('/', coreRoutes)

// Tool routes
app.use('/', langRouter)

// On 404
app.use(notFoundHandler)

// Error handler - Needs to be last
app.use(errorHandler)

export { app }
