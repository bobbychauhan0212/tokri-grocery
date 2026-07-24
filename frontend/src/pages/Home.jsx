import { useState, useMemo } from 'react'
import { categories, products } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [active, setActive] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = active === 'all' || p.category === active
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [active, query])

  return (
    <div className="container" style={{ padding: '32px 24px 60px' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, marginBottom: 6 }}>Fresh groceries, delivered to your door</h1>
        <p style={{ color: 'var(--ink-soft)', fontSize: 15, margin: 0 }}>Everyday essentials from the neighborhood store.</p>
      </div>

      <input
        type="text"
        placeholder="Search for tomatoes, milk, rice..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ maxWidth: 420, marginBottom: 20 }}
      />

      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8, marginBottom: 24 }}>
        <button
          onClick={() => setActive('all')}
          style={{
            whiteSpace: 'nowrap', padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 500,
            border: active === 'all' ? 'none' : '1px solid var(--line)',
            background: active === 'all' ? 'var(--teal-700)' : 'var(--paper)',
            color: active === 'all' ? 'var(--paper)' : 'var(--ink-soft)',
          }}
        >All</button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            style={{
              whiteSpace: 'nowrap', padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 500,
              border: active === c.id ? 'none' : '1px solid var(--line)',
              background: active === c.id ? 'var(--teal-700)' : 'var(--paper)',
              color: active === c.id ? 'var(--paper)' : 'var(--ink-soft)',
            }}
          >{c.name}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: 'var(--ink-soft)' }}>No products match your search.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
