import React, { useMemo, useState } from 'react'
import Header, { Toast } from '../components/Header.jsx'
import { shuffle } from '../router.js'
import { recordGame } from '../storage.js'

// n = ID number shown on the diagram; badge = where that number sits; how = plain-words "how it works"
const PARTS = {
  tank: { n: 1, badge: [30, 74], how: 'It\'s the bucket. You mix the pesticide and water in here. Big tanks have a clear tube on the side (a sight gauge) so you can see how full it is.', name: 'Tank', emoji: '🛢️', what: 'Holds the spray mix. Usually polyethylene plastic, 10 to 100+ gallons. 50 gallons or more needs a SIGHT GAUGE so you can see the level. Drive with it nearly empty.' },
  agitator: { n: 3, badge: [118, 98], how: 'A spinning paddle at the bottom of the tank, like a blender blade. It keeps powders from sinking to the bottom.', name: 'Agitator', emoji: '🥄', what: 'The stirrer. Mechanical blades in the tank bottom are best for wettable powders (leave it running while you spray). By-pass is enough for emulsions and SCs. Hydraulic uses jets.' },
  fill: { n: 2, badge: [60, 44], how: 'The lid where you pour water in. It locks so nobody can open it. The air gap means the hose never touches the mix, so poison can’t get sucked back into the water pipes.', name: 'Fill-hole cover & strainer', emoji: '🔒', what: 'The fill hole cover must LOCK. Fill through an AIR GAP so pesticide can never siphon back into the water supply.' },
  strainer: { n: 4, badge: [100, 186], how: 'A screen, like a pasta strainer. Liquid goes through, but dirt gets stuck, so it can’t hurt the pump or plug the nozzle.', name: 'Strainer / filter', emoji: '🫖', what: 'Catches dirt so it can\'t wear out the pump or clog the nozzle. Clean it regularly, not once a year.' },
  engine: { n: 5, badge: [152, 190], how: 'The motor. It spins the pump, like your legs pedaling a bike.', name: 'Engine / motor', emoji: '🔋', what: 'Powers the pump. Old rigs: 3–7 hp gas engines. Most now use 12-volt electric pumps.' },
  pump: { n: 6, badge: [256, 196], how: 'The heart. It sucks liquid out of the tank and pushes it out hard into the hose.', name: 'Pump', emoji: '⚙️', what: 'The heart. Diaphragm = most common in pest control. Roller = cheap, no WPs. Piston = toughest, needs a surge tank. Centrifugal = rarely used.' },
  surge: { n: 7, badge: [266, 160], how: 'A little pocket of AIR. Piston pumps push in bumps (push, push, push). The air squishes like a pillow so the spray comes out smooth instead of pulsing.', name: 'Surge tank', emoji: '🫁', what: 'A small AIR chamber between the pump and control valve. It cushions piston-pump pulses. Without it, the hose pulsates.' },
  regulator: { n: 8, badge: [326, 150], how: 'Like a faucet knob, but for pressure. Turn it to push harder or softer. Liquid it doesn’t need gets sent back to the tank.', name: 'Pressure regulator', emoji: '🎚️', what: 'CONTROLS the pressure (keep it at 25–30 psi). Extra liquid goes back to the tank through the by-pass line.' },
  bypass: { n: 9, badge: [214, 40], how: 'A return pipe. The extra liquid from the regulator flows back into the tank, and that flow stirs the tank a little.', name: 'By-pass line', emoji: '↩️', what: 'On the pressure side of the pump. Sends extra liquid back to the tank, which also stirs it (by-pass agitation).' },
  gauge: { n: 10, badge: [344, 112], how: 'A dial, like a car’s speedometer. It only SHOWS how hard the liquid is pushing (psi). It doesn’t change anything.', name: 'Pressure gauge', emoji: '⏲️', what: 'SHOWS the pressure, like a speedometer. The regulator controls it; the gauge only shows it. Replace it if it\'s bad.' },
  meter: { n: 11, badge: [286, 74], how: 'Counts the liquid going by, like the water meter at a house. Shows gallons per minute and the total used.', name: 'Flow meter', emoji: '📏', what: 'SHOWS the flow rate (gallons per minute) and how much you\'ve used. It doesn\'t adjust anything.' },
  hose: { n: 12, badge: [262, 30], how: 'Carries the liquid to you. Skinny 3/8-inch hose: 100 feet max. Fatter ½-inch hose: 250 feet max. The longer the hose, the more push (pressure) you lose.', name: 'Hose & reel', emoji: '🐍', what: '3/8" hose: max 100 feet. ½" hose: max 250 feet. Roll it up, no kinks, and inspect it so it can\'t burst.' },
  nozzle: { n: 13, badge: [336, 40], how: 'The tip where spray comes out. The J gun twists to change from a wide fan to a straight stream. Termite jobs use long rods that go into the soil.', name: 'Spray gun & nozzle', emoji: '🔫', what: '"J" gun for landscapes (fan, stream or coarse spray). Sub-slab injectors and trenching rods for subterranean termites.' },
}

// Order liquid travels through the rig
const FLOW = ['tank', 'strainer', 'pump', 'regulator', 'gauge', 'hose', 'nozzle']

// Tappable SVG diagram
function Diagram({ sel, onTap, flowing, showIds }) {
  // Tap on phones; hover also selects on computers
  const H = ({ id, children }) => (
    <g className={'hot' + (sel === id ? ' sel' : '')} onClick={() => onTap(id)} onMouseEnter={() => onTap(id)} role="button" aria-label={PARTS[id].name}>
      <title>{`${PARTS[id].n}. ${PARTS[id].name}`}</title>
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
      {/* numbered ID badges, tappable too */}
      {showIds && Object.entries(PARTS).map(([id, p]) => (
        <g key={'b' + id} className="hot" onClick={() => onTap(id)} onMouseEnter={() => onTap(id)} style={{ cursor: 'pointer' }}>
          <circle cx={p.badge[0]} cy={p.badge[1]} r="9" fill={sel === id ? '#f5b301' : '#1f2a22'} stroke="#fff" strokeWidth="1.5" />
          <text x={p.badge[0]} y={p.badge[1] + 3.5} fontSize="10" fontWeight="800" textAnchor="middle" fill={sel === id ? '#1b1b1b' : '#fff'} style={{ pointerEvents: 'none' }}>{p.n}</text>
        </g>
      ))}
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
        <Diagram sel={mode === 'explore' ? sel : null} onTap={mode === 'explore' ? tap : () => {}} flowing={mode === 'build' ? done : true} showIds={mode === 'explore'} />
      </div>

      {mode === 'explore' && (
        <>
          <div className="card part-info">
            <div className="row" style={{ alignItems: 'center', flexWrap: 'nowrap', gap: 10 }}>
              <span className="idbadge">{PARTS[sel].n}</span>
              <h3 style={{ margin: 0 }}>{PARTS[sel].emoji} {PARTS[sel].name}</h3>
            </div>
            <div className="plain" style={{ marginTop: 10 }}><b>⚙️ How it works:</b> {PARTS[sel].how}</div>
            <div className="small"><b>📖 Exam facts:</b> {PARTS[sel].what}</div>
          </div>
          <div className="card" style={{ padding: 10 }}>
            <div className="small" style={{ fontWeight: 700, margin: '0 4px 6px' }}>All parts: tap one (or hover on a computer)</div>
            <div className="partlist">
              {Object.entries(PARTS).map(([id, p]) => (
                <button key={id} className={'partbtn' + (sel === id ? ' on' : '')} onClick={() => tap(id)} onMouseEnter={() => tap(id)}>
                  <span className="idbadge sm">{p.n}</span>{p.name}{tapped.has(id) && sel !== id ? ' ✓' : ''}
                </button>
              ))}
            </div>
          </div>
          <p className="small muted">Liquid path: Tank → Strainer → Pump → Regulator → Gauge → Hose → Nozzle</p>
        </>
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
