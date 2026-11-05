import React, { useMemo, useState } from 'react'
import Header, { Toast } from '../components/Header.jsx'
import { shuffle } from '../router.js'
import { recordGame } from '../storage.js'

// A made-up practice label. Each zone explains itself and is a target in Find-It mode.
const ZONES = [
  { id: 'rup', name: 'Restricted Use statement', find: 'Who is allowed to buy and use this product?',
    why: 'A box at the TOP of the front panel. RUPs are for certified applicators (or people under their direct supervision) only.',
    body: <div style={{ border: '2px solid #1b1b1b', padding: 4, textAlign: 'center', fontWeight: 700, fontSize: 11 }}>RESTRICTED USE PESTICIDE<br /><span style={{ fontWeight: 400 }}>Due to toxicity to fish and aquatic organisms. For retail sale to and use only by Certified Applicators or persons under their direct supervision.</span></div> },
  { id: 'brand', name: 'Brand / trade name', find: 'The marketing name of the product',
    why: 'The name the company sells it under. Different brands can have the same active ingredient.',
    body: <div style={{ fontSize: 22, fontWeight: 900, textAlign: 'center', letterSpacing: 1 }}>BUGBLOCK 12.5 EC<div style={{ fontSize: 10, fontWeight: 400 }}>Practice label · not a real product</div></div> },
  { id: 'ingredients', name: 'Ingredient statement', find: 'What chemical actually kills the pest, and how much?',
    why: 'Lists ACTIVE ingredients by name and % by weight, plus total % of other (inert) ingredients. "-thrin" tells you this is a pyrethroid!',
    body: <div><b>ACTIVE INGREDIENT:</b> Examplethrin ........ 12.5%<br /><b>OTHER INGREDIENTS:</b> .................. 87.5%<br /><b>TOTAL:</b> ................................ 100.0%</div> },
  { id: 'kids', name: 'Keep Out of Reach of Children', find: 'The statement required on EVERY label',
    why: 'Required on every pesticide label no matter the signal word.',
    body: <div style={{ textAlign: 'center', fontWeight: 900 }}>KEEP OUT OF REACH OF CHILDREN</div> },
  { id: 'signal', name: 'Signal word', find: 'How acutely toxic is this product?',
    why: 'WARNING = Category II, moderately toxic (oral LD50 50–500 mg/kg). Lethal dose about 1 teaspoon to 1 ounce.',
    body: <div style={{ textAlign: 'center', fontWeight: 900, fontSize: 20 }}>WARNING</div> },
  { id: 'firstaid', name: 'First aid', find: 'What to do if it splashes in someone\'s eyes',
    why: 'First aid by route of exposure. Have the label with you when you call poison control or go to the doctor.',
    body: <div><b>FIRST AID:</b> If in eyes: hold eye open and rinse slowly with water for 15–20 minutes. If on skin: take off contaminated clothing; rinse skin with water. Call a poison control center or doctor.</div> },
  { id: 'reg', name: 'EPA Reg. No. & Est. No.', find: 'The product\'s federal ID number',
    why: 'EPA Registration No. = this product\'s ID. EPA Establishment No. = the factory where it was made.',
    body: <div style={{ fontSize: 11 }}>EPA Reg. No. 00000-00 · EPA Est. No. 00000-XX-000 · Net Contents: 1 Quart</div> },
  { id: 'precaution', name: 'Precautionary statements', find: 'What PPE do you need to wear?',
    why: '"Hazards to Humans & Domestic Animals" tells you the risk and the minimum PPE required.',
    body: <div><b>PRECAUTIONARY STATEMENTS. HAZARDS TO HUMANS & DOMESTIC ANIMALS:</b> Harmful if swallowed or absorbed through skin. Causes moderate eye irritation. Wear long-sleeved shirt, long pants, chemical-resistant gloves, shoes plus socks, and protective eyewear.</div> },
  { id: 'enviro', name: 'Environmental hazards', find: 'Who besides people could be hurt? (fish, bees, wildlife)',
    why: 'Pyrethroids are extremely toxic to fish, so labels warn about drains, gutters and water.',
    body: <div><b>ENVIRONMENTAL HAZARDS:</b> This product is extremely toxic to fish and aquatic invertebrates. Do not apply directly to water or to areas where surface water is present. Do not allow to enter storm drains.</div> },
  { id: 'directions', name: 'Directions for use', find: 'Where, how much, and how to apply it. "The label is the law"',
    why: '"It is a violation of Federal law to use this product in a manner inconsistent with its labeling." The label IS the law.',
    body: <div><b>DIRECTIONS FOR USE:</b> It is a violation of Federal law to use this product in a manner inconsistent with its labeling. Mix 1 fl oz per gallon of water. Apply as a coarse spray to cracks, crevices and perimeter…</div> },
  { id: 'reentry', name: 'Re-entry statement', find: 'How long before people and pets can go back into the treated area?',
    why: 'Re-entry (REI) tells you when people and pets can safely return.',
    body: <div><b>RE-ENTRY:</b> Do not allow people or pets to contact treated surfaces until sprays have dried.</div> },
  { id: 'storage', name: 'Storage & disposal', find: 'How to get rid of the empty container',
    why: 'Store in the original container in a locked, cool, dry area. Triple rinse empty containers, put the rinsate in the spray tank, then puncture and dispose per local rules.',
    body: <div><b>STORAGE AND DISPOSAL:</b> Store in original container in a locked, cool, dry area. Do not reuse empty container. Triple rinse (or equivalent), add rinsate to spray tank, then offer for recycling or puncture and dispose of in a sanitary landfill.</div> },
]

export default function LabelExplorer() {
  const [mode, setMode] = useState('explore')
  const [sel, setSel] = useState(null)
  const [round, setRound] = useState(0)
  const targets = useMemo(() => shuffle(ZONES).slice(0, 8), [round])
  const [ti, setTi] = useState(0)
  const [score, setScore] = useState(0)
  const [missedThis, setMissedThis] = useState(false)
  const [flash, setFlash] = useState({})
  const [toast, setToast] = useState(null)
  const finished = ti >= targets.length

  const tap = (z) => {
    if (mode === 'explore') return setSel(z.id)
    if (finished) return
    const target = targets[ti]
    if (z.id === target.id) {
      const gained = missedThis ? 0 : 1
      const total = score + gained
      setScore(total)
      setFlash({ [z.id]: 'found' })
      setToast({ text: '✓ ' + target.name, n: Date.now() })
      setMissedThis(false)
      if (ti + 1 >= targets.length) recordGame('label', total)
      setTi(ti + 1)
    } else {
      setMissedThis(true)
      setFlash({ [z.id]: 'miss' })
      setToast({ text: `That's the ${z.name}`, n: Date.now() })
    }
  }

  return (
    <>
      <Header title="🏷️ Label Explorer" sub="The label is the law. Know where everything lives." />
      <div className="chips">
        <button className={'chip' + (mode === 'explore' ? ' on' : '')} onClick={() => { setMode('explore'); setFlash({}) }}>👆 Explore</button>
        <button className={'chip' + (mode === 'find' ? ' on' : '')} onClick={() => { setMode('find'); setTi(0); setScore(0); setFlash({}); setRound(round + 1) }}>🔎 Find it!</button>
      </div>

      {mode === 'find' && (
        <div className="card" style={{ position: 'sticky', top: 0, zIndex: 5 }}>
          {!finished ? (
            <>
              <div className="small muted">Find {ti + 1} of {targets.length} · Score {score}</div>
              <b>{targets[ti].find}</b>
            </>
          ) : (
            <>
              <b>Done! {score}/{targets.length} on the first try.</b>
              <button className="btn block" style={{ marginTop: 8 }} onClick={() => { setTi(0); setScore(0); setFlash({}); setRound(round + 1) }}>Play again</button>
            </>
          )}
        </div>
      )}

      {mode === 'explore' && (
        <p className="small muted">Tap any part of the label to learn what it means. Then try <b>Find it!</b></p>
      )}

      <div className="mlabel">
        {ZONES.map((z) => (
          <React.Fragment key={z.id}>
            <button className={'z' + (mode === 'explore' && sel === z.id ? ' sel' : '') + (flash[z.id] ? ' ' + flash[z.id] : '')} onClick={() => tap(z)}>
              {z.body}
            </button>
            {mode === 'explore' && sel === z.id && (
              <div style={{ background: '#1f2a22', color: '#fff', borderRadius: 8, padding: '8px 10px', margin: '2px 0 8px', fontFamily: 'system-ui, sans-serif', fontSize: 14 }}>
                <b>👆 {z.name}</b><br />{z.why}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <Toast msg={toast} />
    </>
  )
}
