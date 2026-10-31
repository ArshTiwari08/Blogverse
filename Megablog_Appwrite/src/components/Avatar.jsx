// Round avatar with the author's first letter; colour comes from the name so each writer looks distinct.
function Avatar({ name = 'B', size = 40 }) {
  let h = 0
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) % 360
  return (
    <span
      className="grid place-items-center shrink-0 rounded-full font-bold text-white shadow-md"
      style={{ width: size, height: size, fontSize: size * 0.42, background: `linear-gradient(135deg, hsl(${h} 80% 62%), hsl(${(h + 45) % 360} 75% 48%))` }}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  )
}
export default Avatar
