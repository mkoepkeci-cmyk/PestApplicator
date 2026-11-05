import React, { useEffect, useState } from 'react'

export default function Header({ title, sub, back = true }) {
  return (
    <div className="hdr">
      {back && (
        <button className="back" aria-label="Back" onClick={() => window.history.back()}>
          ←
        </button>
      )}
      <div>
        <h1>{title}</h1>
        {sub && <p className="sub">{sub}</p>}
      </div>
    </div>
  )
}

export function Tile({ icon, color, title, desc, onClick }) {
  return (
    <button className="tile" onClick={onClick}>
      <span className="ico" style={{ background: (color || '#2f6b3a') + '22' }}>{icon}</span>
      <span>
        <div className="t">{title}</div>
        {desc && <div className="d">{desc}</div>}
      </span>
      <span className="chev">›</span>
    </button>
  )
}

// Brief message above the tab bar; pass a new {text, n} object to re-trigger.
export function Toast({ msg }) {
  const [shown, setShown] = useState(null)
  useEffect(() => {
    if (!msg) return
    setShown(msg)
    const t = setTimeout(() => setShown(null), 2600)
    return () => clearTimeout(t)
  }, [msg])
  if (!shown) return null
  return <div className="toast" key={shown.n}>{shown.text}</div>
}
