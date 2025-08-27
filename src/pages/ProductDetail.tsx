
import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { useGetProductByIdQuery } from '../services/api'
import { Loading, ErrorMsg } from '../components/Feedback'
import QuantitySelector from '../components/QuantitySelector'
import { useAppDispatch } from '../routes/hooks'
import { addToCart } from '../features/cart/cartSlice'

export default function ProductDetail(){
  const { id } = useParams()
  const { data: p, isLoading, error } = useGetProductByIdQuery(id!)
  const [qty, setQty] = useState(1)
  const dispatch = useAppDispatch()

  if (isLoading) return <div className="container"><Loading /></div>
  if (error || !p) return <div className="container"><ErrorMsg message="Product not found." /></div>

  return (
    <div className="container">
      <Link to="/">← Back</Link>
      <div className="row" style={{ marginTop: '1rem' }}>
        <div className="card">
          <img src={p.image} alt={p.title} />
        </div>
        <div className="card">
          <h2>{p.title}</h2>
          {p.rating && <div className="muted">Rating: {p.rating.rate} ({p.rating.count})</div>}
          <p className="price">${p.price.toFixed(2)}</p>
          <p className="muted">{p.description}</p>
          <div style={{ display:'flex', gap:'.5rem' }}>
            <QuantitySelector value={qty} onChange={setQty} min={1} max={5} />
            <button className="primary" onClick={()=>dispatch(addToCart({ product: p, qty }))}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}
