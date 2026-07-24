import { useState } from 'react'

export default function ProductImage({ product, radius = 10, iconSize = 40 }) {
  const [failed, setFailed] = useState(false)

  return (
    <div style={{
      width: '100%', height: '100%', borderRadius: radius, background: product.color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', position: 'relative',
    }}>
      {!failed && (
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )}
      {failed && <span style={{ fontSize: iconSize }}>{product.icon}</span>}
    </div>
  )
}
