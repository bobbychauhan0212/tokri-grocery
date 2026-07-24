import Cart from '../models/Cart.js'
import Product from '../models/Product.js'

async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ user: userId })
  if (!cart) cart = await Cart.create({ user: userId, items: [] })
  return cart
}

export async function getCart(req, res, next) {
  try {
    const cart = await getOrCreateCart(req.userId)
    await cart.populate('items.product')
    res.json({ cart })
  } catch (err) {
    next(err)
  }
}

export async function addToCart(req, res, next) {
  try {
    const { productId, qty = 1 } = req.body
    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: 'Product not found' })

    const cart = await getOrCreateCart(req.userId)
    const existing = cart.items.find((i) => i.product.toString() === productId)
    if (existing) {
      existing.qty += qty
    } else {
      cart.items.push({ product: productId, qty })
    }
    await cart.save()
    await cart.populate('items.product')
    res.json({ cart })
  } catch (err) {
    next(err)
  }
}

export async function updateCartItem(req, res, next) {
  try {
    const { productId } = req.params
    const { qty } = req.body
    const cart = await getOrCreateCart(req.userId)

    if (qty <= 0) {
      cart.items = cart.items.filter((i) => i.product.toString() !== productId)
    } else {
      const existing = cart.items.find((i) => i.product.toString() === productId)
      if (!existing) return res.status(404).json({ message: 'Item not in cart' })
      existing.qty = qty
    }
    await cart.save()
    await cart.populate('items.product')
    res.json({ cart })
  } catch (err) {
    next(err)
  }
}

export async function removeFromCart(req, res, next) {
  try {
    const { productId } = req.params
    const cart = await getOrCreateCart(req.userId)
    cart.items = cart.items.filter((i) => i.product.toString() !== productId)
    await cart.save()
    await cart.populate('items.product')
    res.json({ cart })
  } catch (err) {
    next(err)
  }
}
