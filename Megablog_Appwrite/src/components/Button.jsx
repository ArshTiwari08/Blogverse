function Button({ children, type = 'button', variant = 'primary', className = '', ...props }) {
  const styles = {
    primary: 'bg-coral-500 hover:bg-coral-600 text-white',
    ghost: 'bg-white/10 hover:bg-white/20 text-white border border-white/15',
    danger: 'bg-red-600/90 hover:bg-red-600 text-white',
  }
  return (
    <button
      type={type}
      className={`px-5 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-400 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
export default Button
