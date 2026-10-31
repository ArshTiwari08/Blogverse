import React, { useId } from 'react'

function Select({ options = [], label, className = '', ...props }, ref) {
  const id = useId()
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="inline-block mb-1.5 text-sm font-medium text-slate-200">{label}</label>}
      <select
        id={id}
        ref={ref}
        className={`w-full px-4 py-2.5 rounded-xl bg-ink-700 border border-white/15 text-white outline-none focus:border-coral-400 transition ${className}`}
        {...props}
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}
export default React.forwardRef(Select)
