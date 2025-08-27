
type Props = { value: number, onChange: (n:number)=>void, min?: number, max?: number }
export default function QuantitySelector({ value, onChange, min=1, max=10 }: Props){
  const opts = Array.from({ length: max - min + 1 }, (_, i) => i + min)
  return (
    <select value={value} onChange={(e)=>onChange(Number(e.target.value))}>
      {opts.map(n => <option key={n} value={n}>{n}</option>)}
    </select>
  )
}
