import jwt from 'jsonwebtoken'

export function generateToken(payload: object, secretKey: string): string {
  const token = jwt.sign(payload, secretKey, {
    expiresIn: '30d', // Expires in 7 days. You can adjust the duration as needed.
  })
  return token
}

export function decodeToken(token: string, secretKey: string) {
  try {
    return jwt.verify(token, secretKey) as { id: string }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error verifying token:', error)
    return null
  }
}
