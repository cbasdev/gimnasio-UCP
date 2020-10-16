import { Router } from 'express'
import { pool } from '../database/database'
import jwt from 'jsonwebtoken'
import { encryptPassword } from '../utils/authentication'
import { environment } from '../../env/environment'
import passport from 'passport'

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

// router.post('/register', async (req, res) => {
//   const { name_admin, email, password } = req.body
//   const passwordEncrypted = await encryptPassword(password)
//   const newAdmin = new Admin(name_admin, email, passwordEncrypted)

//   // Saving admin in database
//   const admin = await newAdmin.saveAdmin()

//   if (!admin.error) {
//     const token = jwt.sign({ admin }, environment.session.secret_word, {
//       expiresIn: 60 * 60 * 24,
//     })
//     res.json({ auth: true, token })
//   } else {
//     res.json({ auth: false, message: 'error creating user' })
//   }
// })

router.post('/login', async (req, res) => {
  const email = req.body.email
  const user = await pool.query(
    `
    select * from admin
    where email = '${email}'
    `
  )
  res.json({
    tesst: user.rows,
  })
})

//test
router.get('/get', async (req, res) => {
  const user = await pool.query(
    `
    select 
      * 
      from user_gym 
      where dni = '1093228134'
      fetch first row only
    `
  )
  res.json({
    user: user.rows,
    message: 'success',
  })
})

export default router
