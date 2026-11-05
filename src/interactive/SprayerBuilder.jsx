import React, { useMemo, useState } from 'react'
import Header, { Toast } from '../components/Header.jsx'
import { shuffle } from '../router.js'
import { recordGame } from '../storage.js'

const PARTS = {
  tank: { name: 'Tank', emoji: '🛢️', what: 'Holds the spray mix. Usually polyethylene plastic, 10 to 100+ gallons. 50 gallons or more needs a SIGHT GAUGE so you can see the level. Drive with it nearly empty.' },
  agitator: { name: 'Agitator', emoji: '🥄', what: 'The stirrer. Mechanical blades in the tank bottom are best for wettable powders (leave it running while you spray). By-pass is enough for emulsions and SCs. Hydraulic uses jets.' },
  fill: { name: 'Fill-hole cover & strainer', emoji: '🔒', what: 'The fill hole cover must LOCK. Fill through an AIR GAP so pesticide can never siphon back into the water supply.' },
  strainer: { name: 'Strainer / filter', emoji: '🫖', what: 'Catches dirt so it can\'t wear out the pump or clog the nozzle. Clean it regularly, not once a year.' },
  engine: { name: 'Engine / motor', emoji: '🔋', what: 'Powers the pump. Old rigs: 3–7 hp gas engines. Most now use 12-volt electric pumps.' },
  pump: { name: 'Pump', emoji: '⚙️', what: 'The heart. Diaphragm = most common in pest control. Roller = cheap, no WPs. Piston = toughest, needs a surge tank. Centrifugal = rarely used.' },
  surge: { name: 'Surge tank', emoji: '🫁', what: 'A small AIR chamber between the pump and control valve. It cushions piston-pump pulses. Without it, the hose pulsates.' },
  regulator: { name: 'Pressure regulator', emoji: '🎚️', what: 'CONTROLS the pressure (keep it at 25–30 psi). Extra liquid goes back to the tank through the by-pass line.' },
  bypass: { name: 'By-pass line', emoji: '↩️', what: 'On the pressure side of the pump. Sends extra liquid back to the tank, which also stirs it (by-pass agitation).' },
  gauge: { name: 'Pressure gauge', emoji: '⏲️', what: 'SHOWS the pressure, like a speedometer. The regulator controls it; the gauge only shows it. Replace it if it\'s bad.' },
  meter: { name: 'Flow meter', emoji: '📏', what: 'SHOWS the flow rate (gallons per minute) and how much you\'ve used. It doesn\'t adjust anything.' },
  hose: { name: 'Hose & reel', emoji: '🐍', what: '3/8" hose: max 100 feet. ½" hose: max 250 feet. Roll it up, no kinks, and inspect it so it can\'t burst.' },
  nozzle: { name: 'Spray gun & nozzle', emoji: '🔫', what: '"J" gun for landscapes (fan, stream or coarse spray). Sub-slab injectors and trenching rods for subterranean termites.' },
}

// Order liquid travels through the rig
const FLOW = ['tank', 'strainer', 'pump', 'regulator', 'gauge', 'hose', 'nozzle']

// Tappable SVG diagram
function Diagram({ sel, onTap, flowing }) {
  const H = ({ id, children }) => (
    <g className={'hot' + (sel === id ? ' sel' : '')} onClick={() => onTap(id)} role="button" aria-label={PARTS[id].name}>
      {children}
    </g>
  )
  const label = { fontSize: 11, fontWeight: 700, fill: '#1b1b1b', textAnchor: 'middle', pointerEvents: 'none' }
  const pipe = { stroke: '#4a7fb5', strokeWidth: 6, fill: 'none', strokeLinecap: 'round' }
  const flow = flowing ? { stroke: '#bfe3ff', strokeWidth: 3, fill: 'none', strokeDasharray: '6 6', className: 'flowdot' } : null
  const lines = [
    'M85 172 L85 205 L104 205',
    'M126 205 L208 215',
    'M252 210 L280 182',
    'M305 162 L318 132',
    'M318 100 L314 92',
    'M300 34 L326 22',
  ]
  return (
    <svg viewBox="0 0 360 260" className="diagram">
      <rect x="0" y="0" width="360" height="260" rx="14" fill="#eef3f6" />
      {/* pipes */}
      {lines.map((d) => <path key={d} d={d} style={pipe} />)}
      {flow && lines.map((d) => <path key={'f' + d} d={d} {...flow} />)}
      {/* bypass return */}
      <H id="bypass">
        <path d="M300 150 C 300 60, 200 30, 140 58" stroke="#e08b2c" strokeWidth="5" strokeDasharray="8 5" fill="none" />
        <text x="232" y="62" style={{ ...label, fill: '#b5651d' }}>bypass ↩</text>
      </H>
      <H id="tank">
        <rect x="20" y="58" width="130" height="114" rx="14" fill="#cfe3d2" stroke="#2f6b3a" strokeWidth="2" />
        <text x="46" y="160" style={label}>TANK</text>
      </H>
      <H id="agitator">
        <rect x="83" y="74" width="4" height="70" fill="#555" />
        <ellipse cx="85" cy="146" rx="26" ry="6" fill="#777" stroke="#444" strokeWidth="1" />
        <text x="122" y="130" style={{ ...label, fontSize: 9 }}>agitator</text>
      </H>
      <H id="fill">
        <rect x="64" y="46" width="42" height="12" rx="3" fill="#ffd27a" stroke="#a87a1d" strokeWidth="1.5" />
      </H>
      <H id="strainer">
        <circle cx="115" cy="205" r="13" fill="#ffd27a" stroke="#a87a1d" strokeWidth="2" />
        <text x="115" y="230" style={{ ...label, fontSize: 9 }}>strainer</text>
      </H>
      <H id="engine">
        <rect x="140" y="198" width="54" height="44" rx="6" fill="#c9c9c9" stroke="#555" strokeWidth="2" />
        <text x="167" y="224" style={label}>ENGINE</text>
      </H>
      <line x1="194" y1="220" x2="208" y2="218" stroke="#555" strokeWidth="4" />
      <H id="pump">
        <circle cx="230" cy="216" r="22" fill="#9cc3e6" stroke="#2b5d8a" strokeWidth="2" />
        <text x="230" y="220" style={label}>PUMP</text>
      </H>
      <H id="surge">
        <rect x="240" y="162" width="18" height="30" rx="8" fill="#d8c5ef" stroke="#6b45a8" strokeWidth="2" />
        <text x="232" y="158" style={{ ...label, fontSize: 9 }}>surge</text>
      </H>
      <H id="regulator">
        <rect x="278" y="150" width="40" height="26" rx="5" fill="#f3b9b0" stroke="#a33" strokeWidth="2" />
        <text x="298" y="167" style={{ ...label, fontSize: 10 }}>REG</text>
      </H>
      <H id="gauge">
        <circle cx="320" cy="116" r="16" fill="#fff" stroke="#333" strokeWidth="2" />
        <line x1="320" y1="116" x2="328" y2="108" stroke="#c0392b" strokeWidth="2" />
      </H>
      <H id="meter">
        <rect x="296" y="78" width="26" height="14" rx="3" fill="#bde5c8" stroke="#2f8f4e" strokeWidth="1.5" />
      </H>
      <H id="hose">
        <circle cx="290" cy="48" r="22" fill="#4b4b4b" stroke="#222" strokeWidth="2" />
        <circle cx="290" cy="48" r="13" fill="none" stroke="#6d6d6d" strokeWidth="3" />
        <circle cx="290" cy="48" r="5" fill="#999" />
      </H>
      <H id="nozzle">
        <path d="M322 14 L346 8 L348 20 L326 28 Z" fill="#b0b0b0" stroke="#333" strokeWidth="2" />
        <path d="M348 14 L358 6 M348 14 L359 14 M348 14 L358 22" stroke="#4a7fb5" strokeWidth="2" />
      </H>
    </svg>
  )
}

export default function SprayerBuilder() {
  const [mode, setMode] = useState('explore')
  const [sel, setSel] = useState('pump')
  const [tapped, setTapped] = useState(() => new Set(['pump']))
  const [placed, setPlaced] = useState([])
  const [mistakes, setMistakes] = useState(0)
  const [toast, setToast] = useState(null)
  const [round, setRound] = useState(0)
  const bank = useMemo(() => shuffle([...FLOW, 'engine', 'agitator']), [round])
  const done = placed.length === FLOW.length

  const tap = (id) => {
    setSel(id)
    setTapped(new Set(tapped).add(id))
  }

  const place = (id) => {
    if (done || placed.includes(id)) return
    if (id === FLOW[placed.length]) {
      const next = [...placed, id]
      setPlaced(next)
      if (next.length === FLOW.length) {
        const score = Math.max(0, 100 - mistakes * 10)
        recordGame('sprayer', score)
        setToast({ text: `🎉 Built! Score ${score}`, n: Date.now() })
      }
    } else {
      setMistakes(mistakes + 1)
      const hint = id === 'engine' ? 'The engine powers the pump, but liquid doesn\'t flow through it.'
        : id === 'agitator' ? 'The agitator stirs inside the tank. Liquid doesn\'t pass through it.'
        : id === 'meter' || id === 'surge' ? 'That one is a bonus part. Build the main path first.'
        : `Not yet. What does liquid hit right after the ${PARTS[placed[placed.length - 1] || 'tank'].name.toLowerCase()}?`
      setToast({ text: hint, n: Date.now() })
    }
  }

  const reset = () => { setPlaced([]); setMistakes(0); setRound(round + 1) }

  return (
    <>
      <Header title="🔧 Sprayer Builder" sub={mode === 'explore' ? `Tap any part · ${tapped.size}/${Object.keys(PARTS).length} explored` : 'Build the flow path from tank to nozzle'} />
      <div className="chips">
        <button className={'chip' + (mode === 'explore' ? ' on' : '')} onClick={() => setMode('explore')}>👆 Explore parts</button>
        <button className={'chip' + (mode === 'build' ? ' on' : '')} onClick={() => setMode('build')}>🧩 Build it</button>
      </div>

      <div className="card" style={{ padding: 8 }}>
        <Diagram sel={mode === 'explore' ? sel : null} onTap={mode === 'explore' ? tap : () => {}} flowing={mode === 'build' ? done : true} />
      </div>

      {mode === 'explore' && (
        <div className="card">
          <h3>{PARTS[sel].emoji} {PARTS[sel].name}</h3>
          <div className="small">{PARTS[sel].what}</div>
          <p className="small muted" style={{ marginBottom: 0 }}>Liquid path: Tank → Strainer → Pump → Regulator → Gauge → Hose → Nozzle</p>
        </div>
      )}

      {mode === 'build' && (
        <>
          <div className="card">
            {FLOW.map((_, i) => (
              <div key={i} className={'slot' + (placed[i] ? ' filled' : '')}>
                <span className="n">{i + 1}</span>
                {placed[i] ? <b>{PARTS[placed[i]].emoji} {PARTS[placed[i]].name}</b> : <span className="muted small">{i === placed.length ? 'Tap the next part ↓' : ''}</span>}
              </div>
            ))}
          </div>
          {!done ? (
            <div className="bank">
              {bank.filter((id) => !placed.includes(id)).map((id) => (
                <button key={id} className="chip" onClick={() => place(id)}>{PARTS[id].emoji} {PARTS[id].name}</button>
              ))}
            </div>
          ) : (
            <div className="card">
              <b>Liquid is flowing! 💧</b>
              <p className="small">Bonus parts: the <b>surge tank</b> sits right after a piston pump, the <b>bypass</b> sends extra flow from the regulator back to the tank, and a <b>flow meter</b> can go in the line to measure gallons applied.</p>
              <button className="btn block" onClick={reset}>Build again</button>
            </div>
          )}
          <p className="small muted">Mistakes: {mistakes}</p>
        </>
      )}
      <Toast msg={toast} />
    </>
  )
}
