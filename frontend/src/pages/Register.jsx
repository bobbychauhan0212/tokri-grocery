import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useStore()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    login(email || 'you@example.com')
    navigate('/')
  }

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '60px 24px' }}>
      <form onSubmit={handleSubmit} className="card" style={{ width: '100%', maxWidth: 380, padding: 32 }}>
        <h2 style={{ fontSize: 22, marginBottom: 6 }}>Create your account</h2>
        <p style={{ color: 'var(--ink-soft)', fontSize: 14, margin: '0 0 24px' }}>Join Tokri for fresh groceries, fast.</p>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="name">Full name</label>
          <input id="name" type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: 16 }}>Create account</button>
        <p style={{ fontSize: 13, color: 'var(--ink-soft)', textAlign: 'center', margin: 0 }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--teal-700)', fontWeight: 600 }}>Log in</Link>
        </p>
      </form>
    </div>
  )
}
