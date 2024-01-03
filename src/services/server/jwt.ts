import jwt from 'jsonwebtoken'

export function generateAccessToken(payload: object, secretKey: string) {
  return generateToken(payload, secretKey, '15m')
}

export function generateRefreshToken(payload: object, secretKey: string) {
  return generateToken(payload, secretKey, '7d')
}

export function generateToken<E extends `${number}d` | `${number}m`>(
  payload: object,
  secretKey: string,
  expiresIn: E
): string {
  const token = jwt.sign(payload, secretKey, {
    expiresIn, // Expires in 7 days. You can adjust the duration as needed.
  })
  return token
}

export function verifyToken(token: string, secretKey: string) {
  try {
    return jwt.verify(token, secretKey) as { id: string }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error verifying token:', error)
    return null
  }
}
