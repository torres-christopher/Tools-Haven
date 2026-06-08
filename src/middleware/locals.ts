import type { Request, Response, NextFunction } from 'express'
import { env } from '../config/env.js'
import { randomBytes } from 'crypto'

// So the app has locally saved default data
export const localsMiddleware = (_req: Request, res: Response, next: NextFunction): void => {
  res.locals.siteName = env.SITE_NAME
  res.locals.siteUrl = env.SITE_URL
  res.locals.currentYear = new Date().getFullYear()
  res.locals.gtmContainerId = env.GTM_CONTAINER_ID
  res.locals.adsenseClientId = env.ADSENSE_CLIENT_ID
  res.locals.NODE_ENV = env.NODE_ENV
  res.locals.nonce = randomBytes(16).toString('base64')
  // Default lang — overridden by individual controllers when lang param is present
  res.locals.lang = 'cs'
  next()
}
