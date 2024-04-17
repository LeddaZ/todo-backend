import { NextFunction, Request, Response } from 'express'

export class CheckedError extends Error {
  constructor(alreadyChecked: boolean) {
    if (alreadyChecked) {
      super('The item is already checked')
    } else {
      super('The item is already unchecked')
    }
  }
}

export const checkedHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CheckedError) {
    res.status(400)
    res.json({
      error: 'CheckedError',
      message: err.message
    })
  } else {
    next(err)
  }
}
