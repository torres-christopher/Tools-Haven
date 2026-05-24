import type { Request, Response, NextFunction, RequestHandler } from 'express'

// Explicit type for async handlers — ensures fn always returns Promise<void>
// and prevents accidental return of a value from a route handler.
type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>

// Wraps async route handlers so that any rejected promise is passed to next(),
// which Express's error handler middleware then picks up.
// Without this, an unhandled rejection in an async handler would hang the request.
export const catchAsync = (fn: AsyncRequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next)
  }
}
