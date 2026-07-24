import 'dotenv/config'
import { connectDB } from './config/db.js'
import Product from './models/Product.js'
import { products as seedProducts } from './frontend-products-reference.js'

async function run() {
  await connectDB()

  const docs = seedProducts.map(({ id, ...rest }) => rest)

  await Product.deleteMany({})
  await Product.insertMany(docs)

  console.log(`Seeded ${docs.length} products.`)
  process.exit(0)
}

run().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
