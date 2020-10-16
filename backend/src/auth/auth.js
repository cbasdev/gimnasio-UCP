import passport from 'passport'
import passportLocal from 'passport-local'
import passportJWT from 'passport-jwt'

import { encryptPassword, verifyPassword } from '../utils/authentication'

const LocalStrategy = passportLocal.Strategy
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

import { Admin } from '../models/Admin'
passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallBack: true,
    },
    async (email, password, done) => {
      const passwordEncrypted = await encryptPassword(password)
      const newAdmin = new Admin(email, passwordEncrypted)
      console.log('\n\n', email, password, '\n\n')
      // Saving admin in database
      const admin = await newAdmin.saveAdmin()
      if (!admin.error) {
        return done(null, admin.error)
      } else {
        done(null, admin)
      }
    }
  )
)

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (name_admin, email, password, done) => {
      const testAdmin = new Admin(name_admin, email, password)

      // Saving admin in database
      const admin = await testAdmin.findByEmail()
      if (!admin.error) {
        if (verifyPassword(password, admin.password)) {
          return done(null, admin, { message: 'Login successfull' })
        } else {
          return done(null, false, { message: 'Wrong password' })
        }
      } else {
        return done(null, false, { message: 'Admin not found' })
      }
    }
  )
)

passport.use(
  new JWTStrategy(
    {
      secretOrKey: 'top_secret',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token'),
    },
    async (token, done) => {
      try {
        return done(null, token.user)
      } catch (e) {
        done(error)
      }
    }
  )
)
