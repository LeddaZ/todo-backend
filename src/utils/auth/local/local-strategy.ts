import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { UserIdentity } from './user-identity.model'
import * as bcrypt from 'bcrypt'

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false
    },
    async (username, password, done) => {
      try {
        const identity = await UserIdentity.findOne({ 'credentials.username': username })
        if (!identity) {
          return done(null, false, { message: `Username ${username} not found` })
        }
        const match = await bcrypt.compare(password, identity.credentials.hashedPassword)
        const plainUser = identity.toObject().user
        if (match) {
          return done(null, plainUser)
        }
        done(null, false, { message: 'Invalid password' })
      } catch (err) {
        done(err)
      }
    }
  )
)
