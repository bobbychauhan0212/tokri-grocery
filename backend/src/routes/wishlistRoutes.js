import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { getWishlist, toggleWishlist } from '../controllers/wishlistController.js'

const router = Router()

router.use(requireAuth)
router.get('/', getWishlist)
router.post('/toggle', toggleWishlist)

export default router
