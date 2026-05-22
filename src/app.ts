// Tools
import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
// Middleware
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

// Run app
const app = express()

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

// 404
app.use(notFoundHandler)

// Error handler -- Needs to be last
app.use(errorHandler)

export { app }
