import React, { useId } from 'react'

const Input = React.forwardRef(function Input({ label, type = 'text', className = '', ...props }, ref) {
  const id = useId()
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="inline-block mb-1.5 text-sm font-medium text-slate-200">{label}</label>}
      <input
        id={id}
        type={type}
        ref={ref}
        className={`w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 outline-none focus:border-coral-400 focus:bg-white/15 transition ${className}`}
        {...props}
      />
    </div>
  )
})
export default Input
