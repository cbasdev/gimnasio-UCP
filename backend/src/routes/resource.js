import {Router} from 'express'
import {createResource,listResources,updateResource,deleteResource} from '../contoller/resource'
import {resourceExist} from '../middlewares/resource'
const router = Router()

router.post('/resource',resourceExist,createResource)
router.get('/resources',listResources)
router.put('/resource',updateResource)
router.delete('/resource/:id_resource',deleteResource)

export default router
