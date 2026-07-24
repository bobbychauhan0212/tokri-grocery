import { createContext, useContext, useState, useCallback } from 'react'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [orders, setOrders] = useState([
    { id: 'TK1042', date: '2026-07-18', items: 3, status: 'Delivered' },
    { id: 'TK1051', date: '2026-07-22', items: 1, status: 'In transit' },
  ])

  const login = useCallback((email) => setUser({ email }), [])
  const logout = useCallback(() => setUser(null), [])

  const addToCart = useCallback((product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + qty } : i)
      }
      return [...prev, { ...product, qty }]
    })
  }, [])

  const updateQty = useCallback((id, qty) => {
    setCart((prev) => qty <= 0
      ? prev.filter((i) => i.id !== id)
      : prev.map((i) => i.id === id ? { ...i, qty } : i))
  }, [])

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const toggleWishlist = useCallback((product) => {
    setWishlist((prev) => prev.some((i) => i.id === product.id)
      ? prev.filter((i) => i.id !== product.id)
      : [...prev, product])
  }, [])

  const placeOrder = useCallback(() => {
    setOrders((prev) => [
      { id: `TK${1050 + prev.length + 1}`, date: new Date().toISOString().slice(0, 10), items: cart.length, status: 'Processing' },
      ...prev,
    ])
    setCart([])
  }, [cart])

  const value = {
    user, login, logout,
    cart, addToCart, updateQty, removeFromCart,
    wishlist, toggleWishlist,
    orders, placeOrder,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
