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

// TODO: Whitelisting for sources when adding external libraries and GA/GTM/AdSense
// Helmet for security in headers
app.use(
  helmet({
    contentSecurityPolicy: false,
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

// Locals must be before routers
app.use(localsMiddleware)

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
