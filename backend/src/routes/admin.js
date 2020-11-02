import { Router } from 'express'
import { createAdmin } from '../contoller/admin'
import { adminExist } from '../middlewares/admin'
import { isAuth } from '../middlewares/auth'
const router = Router()

// Si se desea crear admin se visita la ruta /admin
router.post('/admin', adminExist, createAdmin)

// Si se desea comprobar si el admin esta autenticado /home
router.get('/home', isAuth, (req, res) => {
  return res.status(200).send({ message: 'home' })
})

export default router
