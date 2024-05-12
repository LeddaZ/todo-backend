import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { UserModel } from '../../../api/user/user.model'
import dotenv from 'dotenv'

dotenv.config()
export const JWT_SECRET = process.env.JWT_SECRET ?? ''

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET
    },
    async (token, done) => {
      try {
        const user = await UserModel.findById(token.id)
        if (user) {
          return done(null, user.toObject())
        } else {
          return done(null, false, { message: 'Invalid token' })
        }
      } catch (err) {
        done(err)
      }
    }
  )
)
