import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import ProductImage from './ProductImage'

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore()
  const isWishlisted = wishlist.some((i) => i.id === product.id)

  return (
    <div className="card" style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Link to={`/product/${product.id}`}>
        <div style={{ width: '100%', aspectRatio: '1', marginBottom: 4 }}>
          <ProductImage product={product} iconSize={40} />
        </div>
      </Link>
      <div>
        <Link to={`/product/${product.id}`}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{product.name}</p>
        </Link>
        <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--ink-soft)' }}>{product.unit}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Rs. {product.price}</p>
        <button
          className="btn-ghost"
          onClick={() => toggleWishlist(product)}
          aria-label="Toggle wishlist"
          style={{ fontSize: 18, color: isWishlisted ? 'var(--danger)' : 'var(--ink-soft)', background: 'none', border: 'none', padding: 4 }}
        >
          {isWishlisted ? '♥' : '♡'}
        </button>
      </div>
      <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => addToCart(product, 1)}>
        Add to basket
      </button>
    </div>
  )
}
