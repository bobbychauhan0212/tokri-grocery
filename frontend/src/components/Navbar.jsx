import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

export default function Navbar() {
  const { user, logout, cart, wishlist } = useStore()
  const navigate = useNavigate()
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)

  return (
    <header style={{ borderBottom: '1px solid var(--line)', background: 'var(--paper)', position: 'sticky', top: 0, zIndex: 10 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            width: 34, height: 34, borderRadius: 9, background: 'var(--teal-700)',
            color: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 17,
          }}>T</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20 }}>Tokri</span>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <Link to="/wishlist" style={{ fontSize: 14, color: 'var(--ink-soft)', position: 'relative' }}>
            Wishlist{wishlist.length > 0 ? ` (${wishlist.length})` : ''}
          </Link>
          <Link to="/orders" style={{ fontSize: 14, color: 'var(--ink-soft)' }}>Orders</Link>
          <Link to="/cart" style={{ fontSize: 14, color: 'var(--ink-soft)' }}>
            Basket{cartCount > 0 ? ` (${cartCount})` : ''}
          </Link>
          {user ? (
            <button className="btn btn-outline" onClick={() => { logout(); navigate('/') }}>Log out</button>
          ) : (
            <Link to="/login" className="btn btn-primary">Log in</Link>
          )}
        </nav>
      </div>
    </header>
  )
}
