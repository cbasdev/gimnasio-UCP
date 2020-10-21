import { Router } from 'express'
import { pool } from '../database/database'
import jwt from 'jsonwebtoken'
import { encryptPassword } from '../utils/authentication'
import passport from 'passport'
import {login} from '../contoller/auth'

// Models
import { Admin } from '../models/Admin'

const router = Router()

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user,
    })
  }
)

router.post('/login',login)




export default router
