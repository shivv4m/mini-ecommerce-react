
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../routes/hooks'
import QuantitySelector from '../components/QuantitySelector'
import { removeFromCart, updateQty } from '../features/cart/cartSlice'

export default function CartPage(){
  const items = useAppSelector(s => s.cart.items)
  const dispatch = useAppDispatch()
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <div className="alert">Cart is empty. <Link to="/">Browse products</Link></div>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr><th>Item</th><th>Unit Price</th><th>Qty</th><th>Subtotal</th><th></th></tr>
            </thead>
            <tbody>
              {items.map(i => (
                <tr key={i.id}>
                  <td style={{ display:'flex', alignItems:'center', gap:'.75rem' }}>
                    <img src={i.image} alt={i.title} />
                    <div>{i.title}</div>
                  </td>
                  <td>${i.price.toFixed(2)}</td>
                  <td>
                    <QuantitySelector value={i.qty} onChange={(n)=>dispatch(updateQty({ id: i.id, qty: n }))} />
                  </td>
                  <td>${(i.price * i.qty).toFixed(2)}</td>
                  <td><button className="ghost" onClick={()=>dispatch(removeFromCart(i.id))}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:'1rem' }}>
            <div className="muted">Grand Total</div>
            <div className="price">${total.toFixed(2)}</div>
          </div>
          <div style={{ display:'flex', justifyContent:'flex-end', marginTop:'1rem' }}>
            <Link to="/checkout"><button className="primary">Proceed to Checkout</button></Link>
          </div>
        </>
      )}
    </div>
  )
}
