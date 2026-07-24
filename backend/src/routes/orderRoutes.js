import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { listOrders, placeOrder } from '../controllers/orderController.js'

const router = Router()

router.use(requireAuth)
router.get('/', listOrders)
router.post('/', placeOrder)

export default router
