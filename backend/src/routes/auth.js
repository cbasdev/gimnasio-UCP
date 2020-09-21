import { Router } from 'express'

const router = Router()

router.get('/test', async (req, res) => {
  res.json({
    message: 'success',
  })
})

export default router
