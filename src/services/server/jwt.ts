import { sign, verify } from 'jsonwebtoken'

export function generateToken(payload: object, secretKey: string): string {
  const token = sign(payload, secretKey, {
    expiresIn: '7d', // Expires in 7 days. You can adjust the duration as needed.
  })
  return token
}

export function decodeToken(token: string, secretKey: string) {
  try {
    return verify(token, secretKey)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error verifying token:', error)
    throw error
  }
}
