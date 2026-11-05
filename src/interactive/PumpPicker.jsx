import React, { useMemo, useState } from 'react'
import Header from '../components/Header.jsx'
import { shuffle } from '../router.js'
import { recordGame } from '../storage.js'

// Picture cards for the four pumps (shown before the game starts). Numbers from manual p. 30–31.
const PUMPS = [
  { name: 'Diaphragm', icon: '🫀', line: 'MOST COMMON in pest control · 10–100 psi · 3–10 gpm · mostly 12-volt · low maintenance' },
  { name: 'Roller', icon: '🛼', line: 'Cheap · 10–300 psi · 8–30 gpm · WPs wear the rollers · best for emulsions & soluble powders' },
  { name: 'Piston', icon: '🚂', line: 'Expensive, MOST durable · 20–600 psi · 2–25 gpm · handles WPs · pulses → needs a SURGE TANK' },
  { name: 'Centrifugal', icon: '🌀', line: 'Spinning impeller, no metal touching · drains pools · mainly ag, RARELY pest control' },
]

const JOBS = [
  { q: 'Which pump will you most likely find on a pest control truck: 12-volt, low pressure, low volume, low maintenance?', choices: ['Diaphragm pump', 'Piston pump', 'Centrifugal pump', 'Roller pump'], right: 0, why: 'Diaphragm: the most common pump in pest control.' },
  { q: 'You need high pressure (up to 600 psi), you mix wettable powders, and you want the most durable pump.', choices: ['Piston pump', 'Roller pump', 'Centrifugal pump', 'Diaphragm pump'], right: 0, why: 'Piston: expensive, most durable, handles WPs.' },
  { q: 'Cheap pump, spraying an emulsion or soluble powder at moderate pressure.', choices: ['Roller pump', 'Piston pump', 'Centrifugal pump', 'Diaphragm pump'], right: 0, why: 'Roller pumps are fine for NON-abrasive mixes.' },
  { q: 'Your boss wants to use a roller pump with a wettable powder. What happens?', choices: ['The rollers wear out fast', 'It works perfectly', 'The tank melts', 'Nothing comes out'], right: 0, why: 'WPs are gritty (abrasive).' },
  { q: 'A pump used for draining swimming pools, mostly in agriculture, rarely in pest control.', choices: ['Centrifugal pump', 'Diaphragm pump', 'Roller pump', 'Piston pump'], right: 0, why: 'Spinning impeller, no metal-to-metal contact.' },
  { q: 'Your piston pump makes the hose pulsate and shakes the gauge.', choices: ['Add a surge tank', 'Use a bigger nozzle', 'Switch to by-pass agitation', 'Drive faster'], right: 0, why: 'The surge tank\'s air cushion smooths the pulses.' },
  { q: 'Which agitation works best with wettable powders?', choices: ['Mechanical (blades in the tank bottom)', 'By-pass', 'None', 'Shake the truck'], right: 0, why: 'And leave it running during the application.' },
  { q: 'You\'re spraying an emulsion. What agitation is usually enough?', choices: ['By-pass', 'Mechanical only', 'Two mechanical agitators', 'None ever'], right: 0, why: 'By-pass works for emulsions and suspended concentrates.' },
  { q: 'Jet nozzles in the bottom of the tank, fed from the pressure side of the pump, are…', choices: ['Hydraulic (jet) agitation', 'Mechanical agitation', 'By-pass agitation', 'A surge tank'], right: 0, why: 'Like a hot tub.' },
  { q: 'What pressure should you keep most applications at?', choices: ['25–30 psi', '300 psi', '600 psi', '2 psi'], right: 0, why: 'High pressure damages hoses, pumps and seals.' },
  { q: 'You need to change the pressure. What do you adjust?', choices: ['The pressure regulator', 'The pressure gauge', 'The flow meter', 'The hose'], right: 0, why: 'Regulator = control. Gauge = show.' },
  { q: 'Your hose is 3/8 inch. What\'s the longest it should be?', choices: ['100 feet', '250 feet', '500 feet', '25 feet'], right: 0, why: '3/8" = 100 ft max. ½" = 250 ft max.' },
  { q: 'Your tank holds 60 gallons. What must it have?', choices: ['A sight gauge', 'A second pump', 'A brass lid', 'Nothing extra'], right: 0, why: '50 gallons or more needs a sight gauge.' },
]

export default function PumpPicker() {
  const [game, setGame] = useState(0)
  const [started, setStarted] = useState(false)
  const jobs = useMemo(
    () => shuffle(JOBS).slice(0, 8).map((j) => {
      const order = shuffle(j.choices.map((_, i) => i))
      return { ...j, choices: order.map((i) => j.choices[i]), right: order.indexOf(j.right) }
    }),
    [game]
  )
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState(null)
  const [score, setScore] = useState(0)

  if (!started) {
    return (
      <>
        <Header title="⚙️ Pump Picker" sub="Meet the pumps, then pick the right one for each job" />
        {PUMPS.map((p) => (
          <div key={p.name} className="card row" style={{ alignItems: 'center', flexWrap: 'nowrap' }}>
            <span style={{ fontSize: 40 }}>{p.icon}</span>
            <div><b>{p.name} pump</b><div className="small muted">{p.line}</div></div>
          </div>
        ))}
        <div className="plain"><b>🗣️ In plain words:</b> The pump pushes liquid out of the tank. Pick it by asking: How hard does it need to push (pressure)? Is the mix gritty like sand?</div>
        <button className="btn block" onClick={() => setStarted(true)}>Start the jobs →</button>
      </>
    )
  }

  if (i >= jobs.length) {
    return (
      <>
        <Header title="⚙️ Pump Picker" />
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="bigscore">{score}/{jobs.length}</div>
          <button className="btn block" onClick={() => { setGame(game + 1); setI(0); setScore(0); setPicked(null) }}>New jobs</button>
        </div>
      </>
    )
  }

  const j = jobs[i]
  const choose = (k) => {
    if (picked !== null) return
    setPicked(k)
    if (k === j.right) setScore(score + 1)
  }
  const next = () => {
    if (i + 1 >= jobs.length) recordGame('pumps', score)
    setI(i + 1)
    setPicked(null)
  }

  return (
    <>
      <Header title="⚙️ Pump Picker" sub={`Job ${i + 1} of ${jobs.length} · Score ${score}`} />
      <div className="card"><span className="pill">📋 Work order</span><div className="qtext">{j.q}</div></div>
      {j.choices.map((c, k) => (
        <button key={c} className={'choice' + (picked !== null && k === j.right ? ' right' : picked === k ? ' wrong' : '')} onClick={() => choose(k)} disabled={picked !== null}>{c}</button>
      ))}
      {picked !== null && (
        <>
          <div className={'explain ' + (picked === j.right ? 'right' : 'wrong')}>{j.why}</div>
          <button className="btn block" onClick={next}>Next job →</button>
        </>
      )}
    </>
  )
}
