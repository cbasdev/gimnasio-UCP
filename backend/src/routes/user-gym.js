import {Router} from 'express'
import {createUserGym,listUsers,updateUser,deleteUser,getUser} from '../contoller/user-gym'
import {userExist} from '../middlewares/user-gym'
const router = Router()

router.post('/user',userExist,createUserGym)
router.get('/users',listUsers)
router.put('/user',updateUser)
router.delete('/user',deleteUser)
router.get('/user/:dni',getUser)
export default router