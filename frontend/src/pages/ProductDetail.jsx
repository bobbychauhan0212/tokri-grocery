import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import { useStore } from '../context/StoreContext'
import { useState } from 'react'
import ProductImage from '../components/ProductImage'

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)
  const { addToCart, toggleWishlist, wishlist } = useStore()
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <div className="container" style={{ padding: 60 }}>
        <p>Product not found. <Link to="/" style={{ color: 'var(--teal-700)' }}>Back to shop</Link></p>
      </div>
    )
  }

  const isWishlisted = wishlist.some((i) => i.id === product.id)

  return (
    <div className="container" style={{ padding: '40px 24px 60px' }}>
      <Link to="/" style={{ fontSize: 13, color: 'var(--ink-soft)' }}>&larr; Back to shop</Link>
      <div className="card" style={{ marginTop: 16, padding: 28, display: 'grid', gridTemplateColumns: '260px 1fr', gap: 32 }}>
        <div style={{ width: '100%', aspectRatio: '1' }}>
          <ProductImage product={product} radius={14} iconSize={90} />
        </div>
        <div>
          <p style={{ margin: '0 0 6px', fontSize: 13, color: 'var(--ink-soft)' }}>
            {product.category.replace('-', ' ')}
          </p>
          <h1 style={{ fontSize: 24, marginBottom: 10 }}>{product.name}</h1>
          <p style={{ fontSize: 22, fontWeight: 600, margin: '0 0 4px' }}>Rs. {product.price}</p>
          <p style={{ fontSize: 13, color: 'var(--ink-soft)', margin: '0 0 20px' }}>{product.unit}</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <button className="btn btn-outline" style={{ width: 36, height: 36, padding: 0 }} onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
            <span style={{ fontSize: 15, minWidth: 20, textAlign: 'center' }}>{qty}</span>
            <button className="btn btn-outline" style={{ width: 36, height: 36, padding: 0 }} onClick={() => setQty((q) => q + 1)}>+</button>
          </div>

          <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => addToCart(product, qty)}>Add to basket</button>
            <button
              className="btn btn-outline"
              style={{ width: 48, color: isWishlisted ? 'var(--danger)' : 'var(--teal-700)', borderColor: isWishlisted ? 'var(--danger)' : 'var(--teal-700)' }}
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle wishlist"
            >{isWishlisted ? '♥' : '♡'}</button>
          </div>

          <div style={{ borderTop: '1px solid var(--line)', paddingTop: 16 }}>
            <p style={{ fontSize: 13, fontWeight: 600, margin: '0 0 6px' }}>Description</p>
            <p style={{ fontSize: 13, color: 'var(--ink-soft)', margin: 0, lineHeight: 1.7 }}>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
