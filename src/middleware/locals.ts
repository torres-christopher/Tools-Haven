import type { Request, Response, NextFunction } from 'express'
import { env } from '../config/env.js'

// So the app has locally saved default data
export const localsMiddleware = (_req: Request, res: Response, next: NextFunction): void => {
  res.locals.siteName = env.SITE_NAME
  res.locals.siteUrl = env.SITE_URL
  res.locals.currentYear = new Date().getFullYear()
  res.locals.gaMeasurementId = env.GA_MEASUREMENT_ID
  res.locals.adsenseClientId = env.ADSENSE_CLIENT_ID
  res.locals.NODE_ENV = env.NODE_ENV
  next()
}
