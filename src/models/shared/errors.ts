export const errorMsgs = {
  public: {
    emailExists: 'This email already exists',

    incorrectCredentials: 'Incorrect credentials',
  },
  internal: {
    userNotFound: 'User not found',
    jwtSecretMissing: 'JWT secret is not set',
  },
} as const
