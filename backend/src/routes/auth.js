import { Router } from 'express'
import { pool } from '../database/database'

const router = Router()

router.post('/login', async (req, res) => {
  ;`
  select * admin
    where email
  `
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
