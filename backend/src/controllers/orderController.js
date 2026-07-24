import Order from '../models/Order.js'
import Cart from '../models/Cart.js'

export async function listOrders(req, res, next) {
  try {
    const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 })
    res.json({ orders })
  } catch (err) {
    next(err)
  }
}

export async function placeOrder(req, res, next) {
  try {
    const cart = await Cart.findOne({ user: req.userId }).populate('items.product')
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Your basket is empty' })
    }

    const items = cart.items.map((i) => ({
      product: i.product._id,
      name: i.product.name,
      price: i.product.price,
      qty: i.qty,
    }))
    const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

    const order = await Order.create({ user: req.userId, items, total })

    cart.items = []
    await cart.save()

    res.status(201).json({ order })
  } catch (err) {
    next(err)
  }
}
