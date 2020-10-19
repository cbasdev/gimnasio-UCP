import {Router} from 'express'
import {createUserGym,listUsers,updateUser,deleteUser,getUser,payMonth} from '../contoller/user-gym'
import {userExist} from '../middlewares/user-gym'
const router = Router()

router.post('/user',userExist,createUserGym)
router.get('/users',listUsers)
router.put('/user',updateUser)
router.delete('/user',deleteUser)
router.get('/user/:dni',getUser)
router.post('/pay/months/:dni',payMonth)
export default router