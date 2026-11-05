import React, { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header.jsx'
import { topicById } from '../data/topics.js'
import { recordGame } from '../storage.js'

// How each formulation behaves in the jar.
// mode: settle = solids sink when agitation stops; dissolve = disappears & tints;
//       emulsion = turns milky; dry = not mixed in water
// sink = seconds to settle once stirring stops (bigger = stays mixed longer)
const BEHAVIOR = {
  EC: { mode: 'emulsion', color: '#f2c94c', n: 24, size: 9, tint: 'rgba(250,248,238,.96)', dissolves: 'No: makes a milky emulsion', agitate: 'SOME' },
  WP: { mode: 'settle', color: '#7a4a2a', n: 46, size: 7, sink: 1.2, cloud: 'rgba(140,100,70,.28)', dissolves: 'NO: it floats, then sinks', agitate: 'FREQUENT (keep it running)' },
  SP: { mode: 'dissolve', color: '#c2185b', n: 40, size: 6, tint: 'rgba(205,40,100,.5)', dissolves: 'YES: true solution', agitate: 'Not frequent' },
  SC: { mode: 'settle', color: '#8d6e63', n: 90, size: 4, sink: 14, cloud: 'rgba(150,115,90,.4)', dissolves: 'No, but stays mixed a long time', agitate: 'Little or none' },
  F: { mode: 'settle', color: '#a1887f', n: 80, size: 4, sink: 10, cloud: 'rgba(160,130,110,.38)', dissolves: 'No, but stays suspended a long time', agitate: 'Little' },
  ME: { mode: 'settle', capsule: true, color: '#43a047', n: 30, size: 11, sink: 4, cloud: 'rgba(120,180,120,.2)', dissolves: 'No: capsules float in liquid', agitate: 'Yes (like an SC)' },
  D: { mode: 'dry', art: '🍩💨', dissolves: 'Not mixed: ready to use', agitate: 'None' },
  G: { mode: 'dry', art: '🍚⬇️', dissolves: 'Not mixed: ready to use', agitate: 'None' },
  B: { mode: 'dry', art: '🍪🐜', dissolves: 'Not mixed: ready to use', agitate: 'None' },
  FUM: { mode: 'dry', art: '🏠🌫️', dissolves: 'It\'s a GAS', agitate: 'None' },
  SYN: { mode: 'dry', art: '🧂➕🌼', dissolves: 'Added to the mix', agitate: 'n/a' },
  IGR: { mode: 'dry', art: '🐛🚫🦋', dissolves: 'Various forms', agitate: 'n/a' },
}

const rand = (a, b) => a + Math.random() * (b - a)

export default function KitchenLab() {
  const items = useMemo(() => topicById('formulations').sections.flatMap((s) => s.items), [])
  const [sel, setSel] = useState(items[0])
  const [poured, setPoured] = useState(false)
  const [stir, setStir] = useState(true)
  const [pourN, setPourN] = useState(0)
  const [seen, setSeen] = useState(() => new Set())
  const b = BEHAVIOR[sel.abbr]

  const parts = useMemo(
    () => Array.from({ length: b.n || 0 }, () => ({ x: rand(4, 92), y: rand(22, 88), floor: rand(88, 96), d: rand(0, 1.2), s: rand(0.7, 1.3) })),
    [sel, pourN]
  )

  // Pour: start particles at the surface, then let them move to their state
  useEffect(() => {
    setPoured(false)
    const t = setTimeout(() => setPoured(true), 60)
    return () => clearTimeout(t)
  }, [sel, pourN])

  useEffect(() => {
    setSeen((s) => {
      const n = new Set(s).add(sel.abbr)
      recordGame('lab', n.size)
      return n
    })
  }, [sel])

  let liquid = 'rgba(120,180,230,.35)'
  if (poured && (b.mode === 'dissolve' || b.mode === 'emulsion')) liquid = b.tint
  if (poured && b.mode === 'settle' && stir) liquid = b.cloud

  const particleStyle = (p) => {
    const base = {
      left: p.x + '%',
      width: b.size * p.s,
      height: b.size * p.s,
      background: b.capsule ? 'rgba(255,255,255,.6)' : b.color,
      border: b.capsule ? `3px solid ${b.color}` : 0,
    }
    if (!poured) return { ...base, top: '20%', transition: 'none' }
    if (b.mode === 'dissolve') return { ...base, top: p.y + '%', opacity: 0, transition: `opacity 1.4s ${p.d}s, top 1s` }
    if (b.mode === 'emulsion') return { ...base, top: p.y + '%', opacity: 0, transition: `opacity 1s ${p.d * 0.5}s, top .6s` }
    if (stir) return { ...base, top: p.y + '%', transition: 'top .7s', animation: `swirl ${1.2 + p.s}s ease-in-out ${p.d}s infinite` }
    return { ...base, top: p.floor + '%', transition: `top ${b.sink * p.s}s ease-in` }
  }

  return (
    <>
      <Header title="🥛 Kitchen Lab" sub={`Explored ${seen.size} of ${items.length}`} />
      <div className="chips">
        {items.map((it) => (
          <button key={it.abbr} className={'chip' + (sel === it ? ' on' : '')} onClick={() => { setSel(it); setStir(true) }}>
            {it.abbr}
          </button>
        ))}
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 2 }}>{sel.name}</h3>
        <div className="muted small">Kitchen twin: <b>{sel.food}</b></div>

        {b.mode === 'dry' ? (
          <div className="dry-stage" aria-hidden>{b.art}</div>
        ) : (
          <div className="lab-stage">
            <div className="jar" aria-label="Mixing jar">
              <div className="liquid" style={{ background: liquid }} />
              {b.mode === 'settle' && <div className={'paddle' + (stir ? ' spin' : '')} />}
              {parts.map((p, i) => <span key={i} className="particle" style={particleStyle(p)} />)}
            </div>
          </div>
        )}

        {b.mode !== 'dry' && (
          <div className="row" style={{ marginTop: 10 }}>
            <button className="btn ghost" onClick={() => { setPourN(pourN + 1); setStir(true) }}>🫗 Pour again</button>
            {b.mode === 'settle' && (
              <button className="btn" style={!stir ? { background: 'var(--bad)', color: '#fff' } : undefined} onClick={() => setStir(!stir)}>
                {stir ? '⏸ Stop agitator' : '▶️ Start agitator'}
              </button>
            )}
          </div>
        )}
        {b.mode === 'settle' && !stir && (
          <p className="small" style={{ color: 'var(--bad)', fontWeight: 700, marginBottom: 0 }}>
            {b.sink > 8
              ? '👀 See how slowly it settles? That\'s why it needs little or no stirring.'
              : '👀 Watch it sink! Settled pesticide = uneven dose and clogged nozzles.'}
          </p>
        )}
      </div>

      <div className="card">
        <div className="row small" style={{ justifyContent: 'space-between' }}>
          <div><div className="muted">Dissolves?</div><b>{b.dissolves}</b></div>
          <div style={{ textAlign: 'right' }}><div className="muted">Agitation</div><b>{b.agitate}</b></div>
        </div>
        <div className="hook">{sel.hook}</div>
        <ul className="facts small">{sel.facts.map((f) => <li key={f}>{f}</li>)}</ul>
      </div>
    </>
  )
}
