import React, { useMemo, useState } from 'react'
import Header from '../components/Header.jsx'
import { shuffle } from '../router.js'
import { recordGame } from '../storage.js'

const pickFrom = (a) => a[Math.floor(Math.random() * a.length)]
const signalFor = (ld) => (ld <= 50 ? 'DANGER – POISON' : ld <= 500 ? 'WARNING' : 'CAUTION')
const SIGNALS = ['DANGER – POISON', 'WARNING', 'CAUTION']
const NAMES = ['Product A', 'Product B', 'Product C', 'Product D']

// Each hole returns { q, choices, right, why }
const HOLES = [
  () => {
    const vals = shuffle([pickFrom([3, 8, 20, 40]), pickFrom([75, 150, 300, 450]), pickFrom([800, 1500, 3000]), pickFrom([5500, 8000])])
    const min = Math.min(...vals)
    return {
      q: 'Which product is MOST toxic? (oral LD50)',
      choices: vals.map((v, i) => `${NAMES[i]}: ${v.toLocaleString()} mg/kg`),
      right: vals.indexOf(min),
      why: `Golf rules: lowest score wins. ${min} mg/kg means it takes the least amount to kill.`,
    }
  },
  () => {
    const ld = pickFrom([5, 25, 45, 60, 120, 350, 480, 700, 1800, 4000])
    return { q: `Oral LD50 = ${ld} mg/kg. Which signal word?`, choices: SIGNALS, right: SIGNALS.indexOf(signalFor(ld)), why: 'DANGER 0–50 · WARNING 50–500 · CAUTION 500+ mg/kg' }
  },
  () => {
    const opts = [
      ['a taste to a teaspoon', 0],
      ['a teaspoon to a tablespoon', 1],
      ['an ounce to more than a pint', 2],
    ]
    const [txt, r] = pickFrom(opts)
    return { q: `About ${txt} can kill a person. Which signal word?`, choices: SIGNALS, right: r, why: 'Taste–teaspoon = DANGER · teaspoon–tablespoon = WARNING · ounce–pint+ = CAUTION' }
  },
  () => {
    const s = pickFrom([
      ['A worker breathes in fumigant gas', 1],
      ['A child swallows bait', 0],
      ['Concentrate splashes on bare skin', 0],
      ['Fish exposed to runoff in a creek', 1],
    ])
    return { q: `${s[0]}. Which measure fits best?`, choices: ['LD50 (dose)', 'LC50 (concentration)'], right: s[1], why: 'LD50 = dose eaten or on skin (mg/kg). LC50 = concentration in air or water.' }
  },
  () => {
    const s = pickFrom([
      ['Headache and nausea right after a spill', 0],
      ['Cancer after years of daily low exposure', 1],
      ['Eye burn from one splash', 0],
      ['Nerve damage that develops over many seasons', 1],
    ])
    return { q: `${s[0]}: acute or chronic?`, choices: ['Acute', 'Chronic'], right: s[1], why: 'Acute = single "ouch," shows up fast. Chronic = constant, over time.' }
  },
  () => ({ q: 'Which signal word has the skull & crossbones?', choices: SIGNALS, right: 0, why: 'DANGER – POISON + skull & crossbones = Category I by mouth, skin or inhalation.' }),
  () => {
    const pairs = shuffle([[10, 'DANGER – POISON'], [200, 'WARNING'], [2500, 'CAUTION']])
    const p = pairs[0]
    return { q: `Higher or lower? A product with LD50 ${p[0]} mg/kg vs. one with 1,000 mg/kg. Which is MORE toxic?`, choices: [`The ${p[0]} mg/kg product`, 'The 1,000 mg/kg product'], right: p[0] < 1000 ? 0 : 1, why: 'Lower number = more toxic.' }
  },
]

const PAR = 9

export default function LD50Golf() {
  const [game, setGame] = useState(0)
  // every hole type once, plus two extra "most toxic" / "signal word" holes, in random order
  const holes = useMemo(() => shuffle([...HOLES, HOLES[0], HOLES[1]]).map((make) => make()), [game])
  const [h, setH] = useState(0)
  const [strokes, setStrokes] = useState(0)
  const [wrong, setWrong] = useState([])
  const [solved, setSolved] = useState(false)
  const [firstTry, setFirstTry] = useState(0)

  if (h >= holes.length) {
    const diff = strokes - PAR
    return (
      <>
        <Header title="⛳ LD50 Golf" />
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="bigscore">{strokes}</div>
          <p className="muted">strokes · par {PAR} · {diff === 0 ? 'Even par! 🏆' : diff > 0 ? `+${diff} over par` : `${diff}`}</p>
          <p className="small">Remember: in golf AND toxicity, <b>lower = stronger</b>.</p>
          <button className="btn block" onClick={() => { setGame(game + 1); setH(0); setStrokes(0); setWrong([]); setSolved(false); setFirstTry(0) }}>Play another round</button>
        </div>
      </>
    )
  }

  const hole = holes[h]
  const choose = (i) => {
    if (solved || wrong.includes(i)) return
    setStrokes(strokes + 1)
    if (i === hole.right) {
      setSolved(true)
      if (!wrong.length) setFirstTry(firstTry + 1)
    } else setWrong([...wrong, i])
  }
  const next = () => {
    if (h + 1 >= holes.length) recordGame('golf', firstTry)
    setH(h + 1)
    setWrong([])
    setSolved(false)
  }

  return (
    <>
      <Header title="⛳ LD50 Golf" sub={`Hole ${h + 1} of ${PAR} · ${strokes} strokes`} />
      <div className="card" style={{ background: 'linear-gradient(#cfe8c4, #a9d39a)', color: '#1b2a14' }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>🏌️ Every wrong pick costs a stroke</div>
        <div className="qtext" style={{ marginBottom: 0 }}>{hole.q}</div>
      </div>
      {hole.choices.map((c, i) => (
        <button key={c} className={'choice' + (solved && i === hole.right ? ' right' : wrong.includes(i) ? ' wrong' : '')} onClick={() => choose(i)}>
          {c}
        </button>
      ))}
      {solved && (
        <>
          <div className="explain right"><b>⛳ In the hole{wrong.length ? ` in ${wrong.length + 1}` : ': hole in one!'}</b> {hole.why}</div>
          <button className="btn block" onClick={next}>Next hole →</button>
        </>
      )}
      {!solved && wrong.length > 0 && <div className="explain wrong">Into the sand trap. Try again! Tip: {hole.why}</div>}
    </>
  )
}
