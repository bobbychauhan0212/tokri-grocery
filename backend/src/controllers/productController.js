import Product from '../models/Product.js'

export async function listProducts(req, res, next) {
  try {
    const { category, search } = req.query
    const filter = {}
    if (category && category !== 'all') filter.category = category
    if (search) filter.$text = { $search: search }

    const products = await Product.find(filter).sort({ createdAt: -1 })
    res.json({ products })
  } catch (err) {
    next(err)
  }
}

export async function getProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json({ product })
  } catch (err) {
    next(err)
  }
}
