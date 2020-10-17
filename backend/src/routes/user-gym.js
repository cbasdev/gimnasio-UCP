import {Router} from 'express'
import {createUserGym,listUsers,updateUser,deleteUser} from '../contoller/user-gym'
import {userExist} from '../middlewares/user-gym'
const router = Router()

router.post('/user',userExist,createUserGym)
router.get('/users',listUsers)
router.put('/user',updateUser)
router.delete('/user',deleteUser)
export default router