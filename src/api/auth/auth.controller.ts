import { NextFunction, Response } from 'express'
import { TypedRequest } from '../../utils/typed-request.interface'
import { AddUserDTO, LoginDTO } from './auth.dto'
import { omit, pick } from 'lodash'
import { UserExistsError } from '../../errors/user-exists'
import userService from '../user/user.service'
import passport from 'passport'
import * as jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
export const JWT_SECRET = process.env.JWT_SECRET ?? ''

export const add = async (req: TypedRequest<AddUserDTO>, res: Response, next: NextFunction) => {
  try {
    const userData = omit(req.body, 'username', 'password')
    const credentials = pick(req.body, 'username', 'password')
    const newUser = await userService.add(userData, credentials)
    res.status(201).send(newUser)
  } catch (err) {
    if (err instanceof UserExistsError) {
      res.status(400)
      res.send(err.message)
    } else {
      next(err)
    }
  }
}

export const login = async (req: TypedRequest<LoginDTO>, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      res.status(400)
      res.json({
        error: 'LoginError',
        message: info.message
      })
      return
    }
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7 days' })
    res.status(201)
    res.json({
      user,
      token
    })
  })(req, res, next)
}
