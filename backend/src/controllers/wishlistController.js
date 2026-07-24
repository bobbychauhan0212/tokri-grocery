import Wishlist from '../models/Wishlist.js'
import Product from '../models/Product.js'

async function getOrCreateWishlist(userId) {
  let wishlist = await Wishlist.findOne({ user: userId })
  if (!wishlist) wishlist = await Wishlist.create({ user: userId, products: [] })
  return wishlist
}

export async function getWishlist(req, res, next) {
  try {
    const wishlist = await getOrCreateWishlist(req.userId)
    await wishlist.populate('products')
    res.json({ wishlist })
  } catch (err) {
    next(err)
  }
}

export async function toggleWishlist(req, res, next) {
  try {
    const { productId } = req.body
    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: 'Product not found' })

    const wishlist = await getOrCreateWishlist(req.userId)
    const idx = wishlist.products.findIndex((p) => p.toString() === productId)
    if (idx >= 0) {
      wishlist.products.splice(idx, 1)
    } else {
      wishlist.products.push(productId)
    }
    await wishlist.save()
    await wishlist.populate('products')
    res.json({ wishlist })
  } catch (err) {
    next(err)
  }
}
