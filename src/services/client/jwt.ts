import { jwtDecode } from 'jwt-decode'
export function unsafeDecode<T>(token: string) {
  return jwtDecode(token) as T
}
