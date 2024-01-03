import { createError } from 'h3'

export type HttpError = ReturnType<typeof createError>
type HttpErrorPayload = Parameters<typeof createError>[0]

export const httpStatusCodes = {
  ok: 200,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  internalServerError: 500,
} as const

export const httpErrors = {
  public: {
    unknown: () =>
      createError({
        statusCode: httpStatusCodes.internalServerError,
        name: 'UNKNOWN_ERROR',
        message: 'Unknown error',
      }),
    missingBody: () =>
      createError({
        statusCode: httpStatusCodes.badRequest,
        name: 'MISSING_BODY',
        message: 'Missing body',
      }),
    missingRouteParam: (paramName: string) =>
      createError({
        statusCode: httpStatusCodes.badRequest,
        name: 'MISSING_ROUTE_PARAM',
        message: `Missing route param ${paramName}`,
      }),
    emailExists: () =>
      createError({
        statusCode: httpStatusCodes.badRequest,
        name: 'EMAIL_EXISTS',
        message: 'This email already exists',
      }),
    incorrectCredentials: () =>
      createError({
        statusCode: httpStatusCodes.badRequest,
        name: 'INCORRECT_CREDENTIALS',
        message: 'Incorrect credentials',
      }),
    notLoggedIn: () =>
      createError({
        statusCode: httpStatusCodes.unauthorized,
        name: 'NOT_LOGGED_IN',
        message: 'Not logged in',
      }),
    notAuthorized: () =>
      createError({
        statusCode: httpStatusCodes.unauthorized,
        name: 'NOT_AUTHORIZED',
        message: 'Not authorized',
      }),
    invalidRefreshToken: () =>
      createError({
        statusCode: httpStatusCodes.unauthorized,
        name: 'INVALID_REFRESH_TOKEN',
        message: 'Invalid refresh token',
      }),
    //   TODO: Move these out of the httpErrors, since it's not an http error
    parsingError: (message: string) =>
      createError({
        statusCode: httpStatusCodes.badRequest,
        name: 'PARSING_ERROR',
        message,
      }),
  },
  private: {
    userNotFound: () =>
      createError({
        statusCode: httpStatusCodes.notFound,
        name: 'USER_NOT_FOUND',
        message: 'User not found',
      }),
    jwtSecretMissing: () =>
      createError({
        statusCode: httpStatusCodes.internalServerError,
        name: 'JWT_SECRET_MISSING',
        message: 'JWT secret is not set',
      }),
  },
} as const satisfies Record<
  string,
  Record<string, (payload: string) => HttpErrorPayload>
>
