import type { User } from '@prisma/client'

export type UserWithoutPasswordOrData = Omit<User, 'password' | 'data'>
