import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import ProductCard from '../components/ProductCard'

export default function Wishlist() {
  const { wishlist } = useStore()

  return (
    <div className="container" style={{ padding: '40px 24px 60px' }}>
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>Your wishlist</h1>
      {wishlist.length === 0 ? (
        <div>
          <p style={{ color: 'var(--ink-soft)', marginBottom: 16 }}>Nothing saved yet.</p>
          <Link to="/" className="btn btn-primary">Browse groceries</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
          {wishlist.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
