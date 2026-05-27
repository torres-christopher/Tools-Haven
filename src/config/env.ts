import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z
    .string()
    .default('8080')
    .transform((val) => parseInt(val, 10)),
  SITE_URL: z.string().url().default('http://tools-haven.com'),
  SITE_NAME: z.string().default('Tools Haven'),
  GA_MEASUREMENT_ID: z.string().default(''),
  ADSENSE_CLIENT_ID: z.string().default(''),
  RATE_LIMIT_WINDOW_MS: z
    .string()
    .default('900000')
    .transform((val) => parseInt(val, 10)),
  RATE_LIMIT_MAX: z
    .string()
    .default('100')
    .transform((val) => parseInt(val, 10)),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('Invalid environment variables:')
  console.error(parsed.error.flatten().fieldErrors)
  process.exit(1)
}

export const env = parsed.data
