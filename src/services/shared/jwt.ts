import jwt from 'jsonwebtoken'

export function unsafeDecode<T>(token: string) {
  return jwt.decode(token) as T
}
