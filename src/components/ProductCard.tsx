
import { Link } from 'react-router-dom'
import type { Product } from '../services/api'

export default function ProductCard({ product }: { product: Product }){
  return (
    <div className="card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} loading="lazy" />
        <h3>{product.title}</h3>
        <div className="price">${product.price.toFixed(2)}</div>
      </Link>
    </div>
  )
}
