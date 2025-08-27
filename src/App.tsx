
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import ConfirmationPage from './pages/ConfirmationPage'

export default function App(){
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

function NotFound(){
  return (
    <div className="container">
      <h2>404 — Not Found</h2>
      <Link to="/">Go home</Link>
    </div>
  )
}
