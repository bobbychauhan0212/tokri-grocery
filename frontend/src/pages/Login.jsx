import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

export default function Login() {
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
        <h2 style={{ fontSize: 22, marginBottom: 6 }}>Log in to your basket</h2>
        <p style={{ color: 'var(--ink-soft)', fontSize: 14, margin: '0 0 24px' }}>Welcome back to Tokri.</p>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: 16 }}>Log in</button>
        <p style={{ fontSize: 13, color: 'var(--ink-soft)', textAlign: 'center', margin: 0 }}>
          New to Tokri? <Link to="/register" style={{ color: 'var(--teal-700)', fontWeight: 600 }}>Create an account</Link>
        </p>
      </form>
    </div>
  )
}
