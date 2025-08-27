
import { useLocation, Link } from 'react-router-dom'

export default function ConfirmationPage(){
  const location = useLocation() as { state?: any }
  const name = location.state?.order?.name ?? 'Customer'
  return (
    <div className="container">
      <h2>Order placed ✅</h2>
      <p>Thank you, {name}! Your order has been placed successfully.</p>
      <Link to="/"><button className="primary">Continue Shopping</button></Link>
    </div>
  )
}
