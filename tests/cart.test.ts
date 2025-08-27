
import cartReducer, { addToCart, clear } from '../src/features/cart/cartSlice'

const product = { id: 1, title: 'Test', price: 10, image: 'x', description: '', category: '' }

test('add to cart increments items', () => {
  const state = cartReducer({ items: [] }, addToCart({ product, qty: 2 }))
  expect(state.items).toHaveLength(1)
  expect(state.items[0].qty).toBe(2)
})

test('clear empties the cart', () => {
  const s1 = cartReducer({ items: [{ id: 1, title: 'Test', price: 10, image: 'x', qty: 1 }] }, clear())
  expect(s1.items).toHaveLength(0)
})
