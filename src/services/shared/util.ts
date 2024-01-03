import { httpErrors, type HttpError } from '~/consts/errors/http'

export function isKeyOf<T extends object>(obj: T, key: any): key is keyof T {
  return key in obj
}

export function hasAtLeastOneKey<T>(obj: any): obj is T {
  return Object.keys(obj).length > 0
}

export function isNull(item: unknown): item is null {
  return item === null
}

export function isHttpError(error: unknown): error is HttpError {
  return !!error && typeof error === 'object' && 'statusCode' in error
}

export function handleHttpServerError(err: unknown) {
  // eslint-disable-next-line no-console
  console.log(err)
  if (isHttpError(err)) {
    throw err
  }
  throw httpErrors.public.unknown()
}
