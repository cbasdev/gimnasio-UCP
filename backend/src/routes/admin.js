import {Router} from 'express'
import {createAdmin} from '../contoller/admin'
import {adminExist} from '../middlewares/admin'
import {isAuth} from '../middlewares/auth'
const router = Router()


router.post('/admin',adminExist , createAdmin)
router.get('/home',isAuth,(req,res) =>{
    return res.status(200).send({message : 'home'})
})


export default router