
import { useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { Loading, ErrorMsg } from '../components/Feedback'
import { useGetCategoriesQuery, useGetProductsQuery } from '../services/api'
import { useSearchParams } from 'react-router-dom'

export default function Home(){
  const { data: products, isLoading, error } = useGetProductsQuery()
  const { data: categories } = useGetCategoriesQuery()
  const [params, setParams] = useSearchParams()
  const [search, setSearch] = useState(params.get('q') ?? '')
  const [cat, setCat] = useState(params.get('cat') ?? 'all')

  const filtered = useMemo(() => {
    let list = products ?? []
    if (cat !== 'all') list = list.filter(p => p.category === cat)
    if (search.trim()) list = list.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    return list
  }, [products, search, cat])

  function applyFilters(){
    const next = new URLSearchParams()
    if (search.trim()) next.set('q', search)
    if (cat !== 'all') next.set('cat', cat)
    setParams(next, { replace: true })
  }

  if (isLoading) return <div className="container"><Loading /></div>
  if (error) return <div className="container"><ErrorMsg message="Failed to fetch products." /></div>

  return (
    <div>
      <header className="header">
        <div className="header-inner container">
          <div className="brand">MiniStore</div>
          <div className="controls">
            <input placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)} onBlur={applyFilters} />
            <select value={cat} onChange={e => { setCat(e.target.value); }} onBlur={applyFilters}>
              <option value="all">All Categories</option>
              {categories?.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <a className="badge" href="/cart">Cart</a>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="grid">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
      <footer>Data from fakestoreapi.com</footer>
    </div>
  )
}
