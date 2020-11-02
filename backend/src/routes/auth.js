import { Router } from 'express'
import passport from 'passport'
import { login } from '../contoller/auth'

// Models

const router = Router()

// Methodo para realizar registro
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

// Methodo para realizar inicio de sesión
router.post('/login', login)

export default router
