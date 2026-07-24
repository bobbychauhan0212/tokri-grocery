import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import ProductImage from '../components/ProductImage'

export default function Cart() {
  const { cart, updateQty, removeFromCart, placeOrder } = useStore()
  const navigate = useNavigate()
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)

  function handleCheckout() {
    placeOrder()
    navigate('/orders')
  }

  return (
    <div className="container" style={{ padding: '40px 24px 60px' }}>
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>Your basket</h1>

      {cart.length === 0 ? (
        <div>
          <p style={{ color: 'var(--ink-soft)', marginBottom: 16 }}>Your basket is empty.</p>
          <Link to="/" className="btn btn-primary">Start shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 28 }}>
          <div className="card" style={{ padding: '4px 20px' }}>
            {cart.map((item) => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
                <div style={{ width: 52, height: 52, flexShrink: 0 }}>
                  <ProductImage product={item} iconSize={22} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{item.name}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--ink-soft)' }}>{item.unit}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button className="btn btn-outline" style={{ width: 28, height: 28, padding: 0, fontSize: 13 }} onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                  <span style={{ fontSize: 13, minWidth: 16, textAlign: 'center' }}>{item.qty}</span>
                  <button className="btn btn-outline" style={{ width: 28, height: 28, padding: 0, fontSize: 13 }} onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                </div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, minWidth: 70, textAlign: 'right' }}>Rs. {item.price * item.qty}</p>
                <button className="btn-ghost" style={{ fontSize: 13, background: 'none', border: 'none', color: 'var(--danger)' }} onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 22, height: 'fit-content' }}>
            <h3 style={{ fontSize: 16, marginBottom: 16 }}>Order summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8, color: 'var(--ink-soft)' }}>
              <span>Subtotal</span><span>Rs. {total}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 16, color: 'var(--ink-soft)' }}>
              <span>Delivery</span><span>Free</span>
            </div>
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 600, marginBottom: 20 }}>
              <span>Total</span><span>Rs. {total}</span>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleCheckout}>Place order</button>
          </div>
        </div>
      )}
    </div>
  )
}
