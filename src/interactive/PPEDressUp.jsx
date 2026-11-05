import React, { useMemo, useState } from 'react'
import Header, { Toast } from '../components/Header.jsx'
import { shuffle } from '../router.js'
import { recordGame } from '../storage.js'

// zone = where it goes on the body; ok = correct choice for the scenario
const GEAR = [
  { id: 'hat', label: '🧢 Hard hat or washed cloth hat', zone: 'head', ok: true, tip: 'A cloth hat is OK if it\'s washed regularly. Hard hats protect against bumps.' },
  { id: 'goggles', label: '🥽 Goggles', zone: 'eyes', ok: true, tip: 'Goggles protect from all angles and fit over eyeglasses. Safety glasses need frontal, brow and temple protection.' },
  { id: 'resp', label: '😷 NIOSH respirator (fit-tested)', zone: 'lungs', ok: true, tip: 'NIOSH-approved, fit-tested (positive & negative pressure), leak-tested with banana oil or saccharin.' },
  { id: 'rubber', label: '🧤 Unlined rubber gloves', zone: 'hands', ok: true, tip: 'Gloves must be RUBBER and UNLINED. Wash them after use.' },
  { id: 'coverall', label: '🥼 Long sleeves, long pants & socks', zone: 'body', ok: true, tip: 'California code requires long sleeves. Dermal (skin) is the #1 way applicators get exposed.' },
  { id: 'boots', label: '🥾 Water-resistant boots', zone: 'feet', ok: true, tip: 'Boots must be water resistant.' },
  { id: 'lined', label: '🧤 LINED rubber gloves', zone: 'hands', ok: false, tip: 'Lined gloves soak up pesticide inside the lining. Must be UNLINED.' },
  { id: 'cotton', label: '🧶 Cotton gloves', zone: 'hands', ok: false, tip: 'Cotton soaks up pesticide and holds it against your skin!' },
  { id: 'sunglasses', label: '🕶️ Sunglasses', zone: 'eyes', ok: false, tip: 'Sunglasses and reading glasses don\'t count. You need frontal, brow and temple protection.' },
  { id: 'dustmask', label: '🩹 Paper dust mask', zone: 'lungs', ok: false, tip: 'Use a NIOSH-approved respirator when the label requires it.' },
  { id: 'tshirt', label: '👕 T-shirt & shorts', zone: 'body', ok: false, tip: 'California requires long sleeves and long pants with socks.' },
  { id: 'sandals', label: '🩴 Sandals or sneakers', zone: 'feet', ok: false, tip: 'No sandals or sneakers! Boots must be water resistant.' },
]

const ZONES = {
  head: { x: 80, y: 28, route: 'Head / scalp' },
  eyes: { x: 80, y: 52, route: 'Eyes' },
  lungs: { x: 80, y: 72, route: 'Inhalation' },
  body: { x: 80, y: 130, route: 'Dermal (body)' },
  hands: { x: 30, y: 168, route: 'Dermal (hands)' },
  feet: { x: 80, y: 268, route: 'Dermal (feet)' },
}

const FOLLOWUPS = [
  { q: 'Where should you store your respirator?', a: ['Sealed plastic bag, separate from pesticides', 'In the locked pesticide storage box'], right: 0, why: 'Keep it in a sealed bag in a SEPARATE compartment, away from insecticides.' },
  { q: 'You spill pesticide on your uniform. What do you change into?', a: ['The spare uniform you always carry', 'Nothing, keep working'], right: 0, why: 'Always carry a spare uniform or coveralls in case of a spill.' },
  { q: 'Is a respirator required for EVERY application?', a: ['No, only when needed or the label requires it', 'Yes, every single time'], right: 0, why: 'Wear one when needed and/or required by the label.' },
]

function Figure({ worn }) {
  const skin = '#e8c3a0'
  return (
    <svg viewBox="0 0 160 300" className="diagram" aria-label="Applicator">
      <circle cx="80" cy="42" r="26" fill={skin} />
      <rect x="50" y="74" width="60" height="110" rx="18" fill={worn.body ? '#e6eef7' : skin} stroke="#8aa" />
      <rect x="22" y="80" width="22" height="90" rx="11" fill={worn.body ? '#e6eef7' : skin} stroke="#8aa" />
      <rect x="116" y="80" width="22" height="90" rx="11" fill={worn.body ? '#e6eef7' : skin} stroke="#8aa" />
      <rect x="54" y="180" width="22" height="92" rx="10" fill={worn.body ? '#e6eef7' : skin} stroke="#8aa" />
      <rect x="84" y="180" width="22" height="92" rx="10" fill={worn.body ? '#e6eef7' : skin} stroke="#8aa" />
      {Object.entries(ZONES).map(([z, p]) =>
        worn[z] ? (
          <text key={z} x={z === 'hands' ? 33 : p.x} y={p.y + 10} fontSize="28" textAnchor="middle">{worn[z].label.split(' ')[0]}</text>
        ) : (
          <circle key={z} cx={z === 'hands' ? 33 : p.x} cy={p.y} r="9" fill="none" stroke="#c0392b" strokeWidth="2" strokeDasharray="3 3" />
        )
      )}
      {worn.hands && <text x="127" y="178" fontSize="28" textAnchor="middle">🧤</text>}
    </svg>
  )
}

export default function PPEDressUp() {
  const [round, setRound] = useState(0)
  const bank = useMemo(() => shuffle(GEAR), [round])
  const [worn, setWorn] = useState({})
  const [mistakes, setMistakes] = useState(0)
  const [lastTip, setLastTip] = useState(null)
  const [toast, setToast] = useState(null)
  const [fi, setFi] = useState(0)
  const [fAns, setFAns] = useState(null)
  const suited = Object.keys(worn).length === 6
  const allDone = suited && fi >= FOLLOWUPS.length

  const pick = (g) => {
    if (worn[g.zone]) return
    if (g.ok) {
      setWorn({ ...worn, [g.zone]: g })
      setLastTip({ good: true, text: g.tip })
    } else {
      setMistakes(mistakes + 1)
      setLastTip({ good: false, text: g.tip })
      setToast({ text: '✗ ' + g.tip, n: Date.now() })
    }
  }

  const answer = (i) => {
    if (fAns !== null) return
    setFAns(i)
    const m = i === FOLLOWUPS[fi].right ? mistakes : mistakes + 1
    if (i !== FOLLOWUPS[fi].right) setMistakes(m)
    if (fi === FOLLOWUPS.length - 1) recordGame('ppe', Math.max(0, 100 - m * 10))
  }

  const reset = () => { setWorn({}); setMistakes(0); setLastTip(null); setFi(0); setFAns(null); setRound(round + 1) }

  return (
    <>
      <Header title="🦺 PPE Dress-Up" sub="Job: mixing a WARNING-label product whose label requires a respirator" />
      <div className="ppe-wrap">
        <div className="card" style={{ padding: 8, marginBottom: 0 }}>
          <Figure worn={worn} />
          <div className="small muted" style={{ textAlign: 'center' }}>{Object.keys(worn).length}/6 routes blocked</div>
        </div>
        <div>
          {!suited ? (
            <div className="gear">
              {bank.map((g) => (
                <button key={g.id} className={'chip' + (worn[g.zone] ? ' used' : '')} onClick={() => pick(g)} disabled={!!worn[g.zone]}>
                  {g.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="card">
              <b>Fully suited! 🎉</b>
              <div className="small muted">Mistakes so far: {mistakes}</div>
            </div>
          )}
        </div>
      </div>

      {lastTip && !suited && (
        <div className={'explain ' + (lastTip.good ? 'right' : 'wrong')} style={{ marginTop: 12 }}>
          {lastTip.good ? '✓ ' : '✗ '}{lastTip.text}
        </div>
      )}

      <div className="card small" style={{ marginTop: 12 }}>
        <b>Routes of entry</b>
        {Object.entries(ZONES).map(([z, p]) => (
          <div key={z}>{worn[z] ? '✅' : '⬜'} {p.route}{worn[z] ? ` · ${worn[z].label.slice(worn[z].label.indexOf(' ') + 1)}` : ''}</div>
        ))}
      </div>

      {suited && !allDone && (
        <div className="card">
          <div className="small muted">Bonus {fi + 1} of {FOLLOWUPS.length}</div>
          <div className="qtext">{FOLLOWUPS[fi].q}</div>
          {FOLLOWUPS[fi].a.map((a, i) => (
            <button key={a} className={'choice' + (fAns !== null && i === FOLLOWUPS[fi].right ? ' right' : fAns === i ? ' wrong' : '')} onClick={() => answer(i)} disabled={fAns !== null}>{a}</button>
          ))}
          {fAns !== null && (
            <>
              <div className={'explain ' + (fAns === FOLLOWUPS[fi].right ? 'right' : 'wrong')}>{FOLLOWUPS[fi].why}</div>
              <button className="btn block" onClick={() => { setFi(fi + 1); setFAns(null) }}>Next →</button>
            </>
          )}
        </div>
      )}

      {allDone && (
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="bigscore">{Math.max(0, 100 - mistakes * 10)}</div>
          <p className="muted">score · {mistakes} mistake{mistakes === 1 ? '' : 's'}</p>
          <button className="btn block" onClick={reset}>Suit up again</button>
        </div>
      )}
      <Toast msg={toast} />
    </>
  )
}
