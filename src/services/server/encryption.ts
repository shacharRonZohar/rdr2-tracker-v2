import { compare, genSalt, hash } from 'bcrypt'

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10 // You can adjust the number of salt rounds as needed
  try {
    const salt = await genSalt(saltRounds)
    const hashedPassword = await hash(password, salt)
    return hashedPassword
  } catch (error) {
    // TODO: Handle error
    // eslint-disable-next-line no-console
    console.error('Error hashing password:', error)
    throw error
  }
}

export function checkPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword)
}
