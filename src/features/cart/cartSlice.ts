
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '../../services/api'

export type CartItem = {
  id: number
  title: string
  price: number
  image: string
  qty: number
}

type CartState = {
  items: CartItem[]
}

const initialState: CartState = (() => {
  const raw = localStorage.getItem('cart')
  return raw ? JSON.parse(raw) as CartState : { items: [] }
})()

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product, qty: number }>) => {
      const { product, qty } = action.payload
      const existing = state.items.find(i => i.id === product.id)
      if (existing) existing.qty = Math.min(existing.qty + qty, 10)
      else state.items.push({ id: product.id, title: product.title, price: product.price, image: product.image, qty })
      localStorage.setItem('cart', JSON.stringify(state))
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(i => i.id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(state))
    },
    updateQty: (state, action: PayloadAction<{ id: number, qty: number }>) => {
      const item = state.items.find(i => i.id === action.payload.id)
      if (item) item.qty = Math.max(1, Math.min(action.payload.qty, 10))
      localStorage.setItem('cart', JSON.stringify(state))
    },
    clear: (state) => {
      state.items = []
      localStorage.setItem('cart', JSON.stringify(state))
    }
  }
})

export const { addToCart, removeFromCart, updateQty, clear } = slice.actions
export default slice.reducer
