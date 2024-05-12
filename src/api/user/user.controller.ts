import { NextFunction, Response, Request } from 'express'
import userService from './user.service'

export const me = async (req: Request, res: Response, _next: NextFunction) => {
  res.json(req.user!)
}

export const users = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.list()
    res.json(users)
  } catch (err) {
    next(err)
  }
}
