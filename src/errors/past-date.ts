import { Request, Response, NextFunction } from 'express'

export class PastDateError extends Error {
  constructor() {
    super('Date cannot be in the past')
  }
}

export const pastDateHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof PastDateError) {
    res.status(400)
    res.json({
      error: 'PastDateError',
      message: err.message
    })
  } else {
    next(err)
  }
}
