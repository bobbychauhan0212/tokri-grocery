import { useStore } from '../context/StoreContext'

const statusColor = {
  Delivered: { bg: '#e4f2ee', text: '#12594f' },
  'In transit': { bg: '#fdf1de', text: '#8a5a0c' },
  Processing: { bg: '#f0eee6', text: '#5c6b65' },
}

export default function Orders() {
  const { orders } = useStore()

  return (
    <div className="container" style={{ padding: '40px 24px 60px' }}>
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>Your orders</h1>
      {orders.length === 0 ? (
        <p style={{ color: 'var(--ink-soft)' }}>No orders yet.</p>
      ) : (
        <div className="card" style={{ padding: '4px 20px' }}>
          {orders.map((o) => {
            const c = statusColor[o.status] || statusColor.Processing
            return (
              <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
                <div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>Order #{o.id}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--ink-soft)' }}>{o.items} items &middot; {o.date}</p>
                </div>
                <span style={{ background: c.bg, color: c.text, fontSize: 12, padding: '5px 12px', borderRadius: 8, fontWeight: 500 }}>{o.status}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
