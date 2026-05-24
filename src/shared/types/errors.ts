// Custom HTTP codes
export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORISED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
} as const

// Export the type
export type HttpStatusCode = (typeof HttpStatus)[keyof typeof HttpStatus]

// AppError class
export class AppError extends Error {
  public readonly statusCode: HttpStatusCode
  // isOperational distinguishes expected runtime errors (true) from programming bugs (false).
  // Error handler uses this to decide whether to show a user-facing message or a generic 500.
  public readonly isOperational: boolean

  constructor(
    message: string,
    statusCode: HttpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    isOperational = true,
  ) {
    super(message)

    // Restores the correct prototype chain after extending built-in Error.
    // Without this, instanceof checks would fail in transpiled code.
    Object.setPrototypeOf(this, new.target.prototype)

    this.name = this.constructor.name
    this.statusCode = statusCode
    this.isOperational = isOperational

    // Captures the stack trace, excluding the constructor itself
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

// Typeguard for unknown errors
export const isAppError = (err: unknown): err is AppError => {
  return err instanceof AppError
}
