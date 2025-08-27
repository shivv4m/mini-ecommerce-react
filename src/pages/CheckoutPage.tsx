
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch, useAppSelector } from '../routes/hooks'
import { Link, useNavigate } from 'react-router-dom'
import { clear } from '../features/cart/cartSlice'

const schema = z.object({
  name: z.string().min(2,'Name is required'),
  email: z.string().email('Valid email required'),
  address: z.string().min(5,'Address is required'),
})

type FormData = z.infer<typeof schema>

export default function CheckoutPage(){
  const items = useAppSelector(s => s.cart.items)
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })
  const nav = useNavigate()
  const dispatch = useAppDispatch()

  const onSubmit = (data: FormData) => {
    dispatch(clear())
    nav('/confirmation', { state: { order: { ...data, total, items }} })
  }

  if (items.length === 0){
    return <div className="container"><div className="alert">Your cart is empty. <Link to="/">Go shopping</Link></div></div>
  }

  return (
    <div className="container">
      <h2>Checkout</h2>
      <div className="row">
        <div className="card">
          <h3>Order summary</h3>
          <ul>
            {items.map(i => <li key={i.id}>{i.qty} × {i.title} — ${ (i.qty * i.price).toFixed(2) }</li>)}
          </ul>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:'1rem' }}>
            <div>Total</div>
            <div className="price">${total.toFixed(2)}</div>
          </div>
        </div>
        <div className="card">
          <h3>Your details</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display:'grid', gap:'.75rem' }}>
              <div>
                <label>Name</label><br/>
                <input {...register('name')} placeholder="John Doe" />
                {errors.name && <div className="error">{errors.name.message}</div>}
              </div>
              <div>
                <label>Email</label><br/>
                <input {...register('email')} placeholder="you@example.com" />
                {errors.email && <div className="error">{errors.email.message}</div>}
              </div>
              <div>
                <label>Address</label><br/>
                <input {...register('address')} placeholder="123 Main St, City" />
                {errors.address && <div className="error">{errors.address.message}</div>}
              </div>
              <button className="primary" type="submit">Place Order</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
