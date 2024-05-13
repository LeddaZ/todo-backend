import { Request, Response, NextFunction } from 'express'

export class UserNotFoundError extends Error {
  constructor() {
    super('User not found')
  }
}

export const userNotFoundHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof UserNotFoundError) {
    res.status(400)
    res.json({
      error: 'UserNotFoundError',
      message: 'User not found'
    })
  } else {
    next(err)
  }
}
