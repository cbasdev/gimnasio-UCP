import { Router } from 'express'
import {
  createResource,
  listResources,
  updateResource,
  deleteResource,
} from '../contoller/resource'
import { resourceExist } from '../middlewares/resource'
const router = Router()

// De la misma manera para cada metodo, se debe acceder a su respectiva ruta
// Es decir, para crear un recurso, se debe enviar un post a /resource
router.post('/resource', resourceExist, createResource)
router.get('/resources', listResources)
router.put('/resource', updateResource)
router.delete('/resource/:id_resource', deleteResource)

export default router
