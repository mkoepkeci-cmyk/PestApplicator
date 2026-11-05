import React, { useMemo, useState } from 'react'
import Header from '../components/Header.jsx'
import { shuffle } from '../router.js'
import { recordGame } from '../storage.js'

// California Section 6000 "conflicts of labeling" (manual p. 18), as on-the-job situations.
const CASES = [
  { s: 'The label says mix 2 oz per gallon. You mix 1 oz per gallon.', legal: true, why: 'A DECREASE in concentration is allowed (unless the label says you can\'t).' },
  { s: 'The label says mix 2 oz per gallon. You mix 4 oz because the bugs are really bad.', legal: false, why: 'An INCREASE is only OK if it matches University of California published recommendations.' },
  { s: 'You raise the mix strength because current UC published recommendations say to.', legal: true, why: 'That\'s the one allowed increase.' },
  { s: 'The label says treat monthly. You treat every 2 months.', legal: true, why: 'Applying LESS often than the label says is allowed.' },
  { s: 'The label says treat monthly. You treat every week to be safe.', legal: false, why: 'MORE often than the label allows is a violation.' },
  { s: 'The product is labeled for kitchens (the site). You use it in a kitchen on a pest the label doesn\'t name, and the label doesn\'t forbid it.', legal: true, why: 'An unlisted pest is OK if the SITE is on the label and it isn\'t prohibited.' },
  { s: 'You use a product inside a restaurant, but restaurants aren\'t a site on the label.', legal: false, why: 'The SITE must be on the label.' },
  { s: 'You apply with a backpack sprayer. The label doesn\'t mention sprayers but doesn\'t forbid them, and you follow all other directions.', legal: true, why: 'Any method NOT prohibited is allowed.' },
  { s: 'You tank-mix the insecticide with a fertilizer. The label doesn\'t prohibit mixing.', legal: true, why: 'Mixing is allowed unless the label prohibits it.' },
  { s: 'You mix two products together, but one label says "Do not mix with other pesticides."', legal: false, why: 'If the label prohibits mixing, you can\'t.' },
  { s: 'You use a lower rate, but this label clearly says "Do not apply below the labeled rate."', legal: false, why: 'Some labels prohibit lower rates or concentrations. Then you must follow them.' },
  { s: 'You skip the re-entry interval because the customer is in a hurry.', legal: false, why: 'Ignoring re-entry intervals is illegal.' },
  { s: 'You put leftover mix into an empty soda bottle with no label.', legal: false, why: 'Pesticides must be in the original container or a labeled service container.' },
  { s: 'You use less product per square foot than the label rate (no prohibition on the label).', legal: true, why: 'A decrease in dosage rate per unit treated is allowed.' },
]

export default function LabelLaw() {
  const [round, setRound] = useState(0)
  const deck = useMemo(() => shuffle(CASES).slice(0, 10), [round])
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState(null)
  const [score, setScore] = useState(0)

  if (i >= deck.length) {
    return (
      <>
        <Header title="⚖️ Label Law" />
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="bigscore">{score}/{deck.length}</div>
          <button className="btn block" onClick={() => { setRound(round + 1); setI(0); setScore(0); setPicked(null) }}>New cases</button>
        </div>
        <div className="plain"><b>🗣️ Remember:</b> You can do LESS (weaker, less often, smaller amount), use it on an unlisted bug at a listed site, use any method that's not banned, or mix it with something, unless the label says no. You can only do MORE if UC says so.</div>
      </>
    )
  }
  const c = deck[i]
  const choose = (v) => {
    if (picked !== null) return
    setPicked(v)
    if (v === c.legal) setScore(score + 1)
  }
  const next = () => {
    if (i + 1 >= deck.length) recordGame('law', score)
    setI(i + 1)
    setPicked(null)
  }
  return (
    <>
      <Header title="⚖️ Label Law" sub={`Case ${i + 1} of ${deck.length} · Score ${score} · CA Section 6000`} />
      <div className="card"><span className="pill">📋 On the job</span><div className="qtext">{c.s}</div></div>
      <div className="row">
        {[[true, '✅ Legal'], [false, '🚫 Not legal']].map(([v, label]) => (
          <button key={label} className={'choice' + (picked !== null && v === c.legal ? ' right' : picked === v ? ' wrong' : '')} style={{ flex: 1, textAlign: 'center', fontWeight: 800 }} onClick={() => choose(v)}>{label}</button>
        ))}
      </div>
      {picked !== null && (
        <>
          <div className={'explain ' + (picked === c.legal ? 'right' : 'wrong')}><b>{c.legal ? 'Legal.' : 'Not legal.'}</b> {c.why}</div>
          <button className="btn block" onClick={next}>Next case →</button>
        </>
      )}
    </>
  )
}
