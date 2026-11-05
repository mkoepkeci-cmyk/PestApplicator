import React, { useMemo, useState } from 'react'
import Header, { Toast } from '../components/Header.jsx'
import { shuffle } from '../router.js'
import { recordGame } from '../storage.js'

const SEQUENCES = [
  {
    id: 'rinse', title: '♻️ Triple rinse', tip: 'Rinse water goes INTO the spray tank, never down a drain.',
    steps: [
      'Empty what\'s left into the spray tank and drain 10 seconds',
      'Fill the container ¼ full with water and put the cap on',
      'Shake for 10 seconds',
      'Pour the rinse water (rinsate) into the spray tank',
      'Repeat two more times (3 rinses total)',
      'Recycle, or puncture it and take it to a sanitary landfill',
    ],
  },
  {
    id: 'spill', title: '🧯 Spill cleanup', tip: 'Soak it up, never wash it down. Over 1 gallon → County Ag Commissioner.',
    steps: [
      'Keep people and pets out (use caution tape)',
      'Spread absorbent (cat litter, sawdust) to stop it spreading',
      'Sweep it up with the broom and dust pan',
      'Put it in a heavy-duty trash bag',
      'Over 1 gallon? Notify the County Ag Commissioner',
    ],
  },
  {
    id: 'ipm', title: '🕵️ IPM steps', tip: 'Inspect → Fix the cause → Pesticide only if needed → Monitor.',
    steps: [
      'Inspect: identify the pest and where it gets in',
      'Ask why it\'s here and fix it (sanitation, moisture, cracks)',
      'Apply the least-toxic pesticide, least amount, only if needed',
      'Monitor and evaluate with follow-up inspections',
    ],
  },
  {
    id: 'school', title: '🏫 Healthy Schools Act', tip: 'Approved list at the start of the year; 72 hours\' notice for non-approved products.',
    steps: [
      'Start of school year: give parents and staff the approved product list',
      'Use IPM first; pesticides are a last resort',
      'Need a NON-approved product? Notify parents and post signs 72 hours ahead',
      'Apply only the safest product',
    ],
  },
  {
    id: 'flow', title: '💧 Sprayer flow path', tip: 'Tank → Strainer → Pump → Regulator → Gauge → Hose → Nozzle.',
    steps: ['Tank', 'Strainer', 'Pump', 'Pressure regulator', 'Pressure gauge', 'Hose', 'Nozzle'],
  },
]

export default function StepSorter() {
  const [seq, setSeq] = useState(SEQUENCES[0])
  const [round, setRound] = useState(0)
  const bank = useMemo(() => shuffle(seq.steps), [seq, round])
  const [placed, setPlaced] = useState([])
  const [mistakes, setMistakes] = useState(0)
  const [shake, setShake] = useState(null)
  const [toast, setToast] = useState(null)
  const done = placed.length === seq.steps.length

  const choose = (s) => {
    if (done) return
    if (s === seq.steps[placed.length]) {
      const next = [...placed, s]
      setPlaced(next)
      if (next.length === seq.steps.length) recordGame('steps', Math.max(0, 100 - mistakes * 10))
    } else {
      setMistakes(mistakes + 1)
      setShake(s)
      setToast({ text: 'Not that one yet. What has to happen first?', n: Date.now() })
      setTimeout(() => setShake(null), 350)
    }
  }
  const pickSeq = (s) => { setSeq(s); setPlaced([]); setMistakes(0); setRound(round + 1) }

  return (
    <>
      <Header title="🔢 Step Sorter" sub="Tap the steps in the right order" />
      <div className="chips">
        {SEQUENCES.map((s) => (
          <button key={s.id} className={'chip' + (seq === s ? ' on' : '')} onClick={() => pickSeq(s)}>{s.title}</button>
        ))}
      </div>
      <div className="card">
        {seq.steps.map((_, i) => (
          <div key={i} className={'slot' + (placed[i] ? ' filled' : '')}>
            <span className="n">{i + 1}</span>
            {placed[i] ? <span className="small" style={{ fontWeight: 600 }}>{placed[i]}</span> : <span className="muted small">{i === placed.length ? 'What comes next?' : ''}</span>}
          </div>
        ))}
      </div>
      {!done ? (
        <div className="bank">
          {bank.filter((s) => !placed.includes(s)).map((s) => (
            <button key={s} className={'chip' + (shake === s ? ' shake' : '')} style={shake === s ? { borderColor: 'var(--bad)' } : undefined} onClick={() => choose(s)}>
              {s}
            </button>
          ))}
        </div>
      ) : (
        <div className="card">
          <b>✅ Nailed it! {mistakes} mistake{mistakes === 1 ? '' : 's'}.</b>
          <div className="hook">{seq.tip}</div>
          <div className="row">
            <button className="btn ghost" onClick={() => pickSeq(seq)}>Again</button>
            <button className="btn" onClick={() => pickSeq(SEQUENCES[(SEQUENCES.indexOf(seq) + 1) % SEQUENCES.length])}>Next set →</button>
          </div>
        </div>
      )}
      <Toast msg={toast} />
    </>
  )
}
