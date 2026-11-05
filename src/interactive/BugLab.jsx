import React, { useMemo, useState } from 'react'
import Header from '../components/Header.jsx'
import { shuffle } from '../router.js'
import { recordGame } from '../storage.js'

// ---------- drawing helpers ----------
const BODY = '#c9a27a'
const LINE = '#5b3f22'
const HL = '#f39c12'
const mirror = (pts) => pts.map(([x, y]) => [300 - x, y])
const poly = (pts) => pts.map((p) => p.join(',')).join(' ')

function Leg({ pts, on, n }) {
  const tip = pts[pts.length - 1]
  return (
    <g>
      <polyline points={poly(pts)} fill="none" stroke={on ? HL : LINE} strokeWidth={on ? 5 : 3.5} strokeLinecap="round" strokeLinejoin="round" />
      {on && n != null && (
        <g>
          <circle cx={tip[0]} cy={tip[1]} r="10" fill={HL} />
          <text x={tip[0]} y={tip[1] + 4} fontSize="11" fontWeight="800" textAnchor="middle" fill="#1b1b1b">{n}</text>
        </g>
      )}
    </g>
  )
}

const Label = ({ x, y, children }) => (
  <text x={x} y={y} fontSize="12" fontWeight="800" textAnchor="middle" fill="#1b1b1b" stroke="#fff" strokeWidth="3" paintOrder="stroke">{children}</text>
)

// Insect seen from above. wingPairs: 2 (most insects) or 1 (flies & mosquitoes)
function Insect({ hl, wingPairs = 2, slim = false }) {
  const bodyFill = (k) => (hl === 'body' ? ['#f6c26b', '#f39c12', '#e67e22'][k] : BODY)
  const legsL = [
    [[127, 108], [98, 92], [84, 66]],
    [[126, 122], [90, 124], [66, 142]],
    [[127, 136], [98, 160], [84, 196]],
  ]
  const legs = [...legsL.map((p, i) => ({ p, n: i * 2 + 1 })), ...legsL.map((p, i) => ({ p: mirror(p), n: i * 2 + 2 }))]
  const wingFill = hl === 'wings' ? 'rgba(243,156,18,.45)' : 'rgba(170,205,240,.55)'
  const wingStroke = hl === 'wings' ? HL : '#7aa3c8'
  return (
    <svg viewBox="0 0 300 300" className="diagram">
      <rect width="300" height="300" rx="14" fill="#f3efe4" />
      {/* wings behind body */}
      <g>
        <ellipse cx="98" cy="170" rx="24" ry={slim ? 50 : 62} transform="rotate(22 98 170)" fill={wingFill} stroke={wingStroke} strokeWidth="2" />
        <ellipse cx="202" cy="170" rx="24" ry={slim ? 50 : 62} transform="rotate(-22 202 170)" fill={wingFill} stroke={wingStroke} strokeWidth="2" />
        {wingPairs === 2 ? (
          <>
            <ellipse cx="110" cy="190" rx="18" ry="44" transform="rotate(35 110 190)" fill={wingFill} stroke={wingStroke} strokeWidth="2" />
            <ellipse cx="190" cy="190" rx="18" ry="44" transform="rotate(-35 190 190)" fill={wingFill} stroke={wingStroke} strokeWidth="2" />
          </>
        ) : (
          <>
            {/* halteres: tiny knobs where the 2nd pair would be */}
            <line x1="128" y1="140" x2="116" y2="150" stroke={LINE} strokeWidth="2" />
            <circle cx="114" cy="152" r="4" fill={LINE} />
            <line x1="172" y1="140" x2="184" y2="150" stroke={LINE} strokeWidth="2" />
            <circle cx="186" cy="152" r="4" fill={LINE} />
          </>
        )}
        {hl === 'wings' && <Label x="150" y="292">{wingPairs === 2 ? '2 PAIRS of wings (4 wings)' : '1 PAIR of wings (2 wings) + tiny knobs'}</Label>}
      </g>
      {legs.map((l) => <Leg key={l.n} pts={l.p} on={hl === 'legs'} n={l.n} />)}
      {/* antennae */}
      {[[[142, 52], [122, 28], [104, 14]], mirror([[142, 52], [122, 28], [104, 14]])].map((p, i) => (
        <polyline key={i} points={poly(p)} fill="none" stroke={hl === 'antennae' ? HL : LINE} strokeWidth={hl === 'antennae' ? 5 : 3} strokeLinecap="round" />
      ))}
      {/* body: head, thorax, abdomen */}
      <ellipse cx="150" cy="210" rx={slim ? 18 : 30} ry="58" fill={bodyFill(2)} stroke={LINE} strokeWidth="2.5" />
      <ellipse cx="150" cy="122" rx="24" ry="28" fill={bodyFill(1)} stroke={LINE} strokeWidth="2.5" />
      <circle cx="150" cy="70" r="22" fill={bodyFill(0)} stroke={LINE} strokeWidth="2.5" />
      {/* eyes */}
      <ellipse cx="133" cy="68" rx="7" ry="10" fill={hl === 'eyes' ? HL : '#3b2a1a'} />
      <ellipse cx="167" cy="68" rx="7" ry="10" fill={hl === 'eyes' ? HL : '#3b2a1a'} />
      {[[150, 55], [143, 62], [157, 62]].map(([x, y]) => (
        <circle key={x + '' + y} cx={x} cy={y} r="2.6" fill={hl === 'eyes' ? '#c0392b' : '#3b2a1a'} />
      ))}
      {hl === 'body' && (
        <>
          <Label x="210" y="74">HEAD</Label>
          <Label x="218" y="126">THORAX</Label>
          <Label x="222" y="214">ABDOMEN</Label>
        </>
      )}
      {hl === 'eyes' && <Label x="150" y="292">2 compound eyes (big) + 3 simple eyes (tiny red dots)</Label>}
      {hl === 'antennae' && <Label x="150" y="292">1 PAIR of antennae</Label>}
      {hl === 'legs' && <Label x="150" y="292">6 legs = 3 PAIRS, all on the THORAX</Label>}
    </svg>
  )
}

function Spider({ hl }) {
  const legsL = [
    [[124, 96], [80, 62], [52, 70]],
    [[122, 106], [72, 92], [40, 110]],
    [[122, 118], [72, 132], [44, 162]],
    [[124, 128], [86, 168], [70, 210]],
  ]
  const legs = [...legsL.map((p, i) => ({ p, n: i * 2 + 1 })), ...legsL.map((p, i) => ({ p: mirror(p), n: i * 2 + 2 }))]
  const fill = (k) => (hl === 'body' ? ['#f6c26b', '#e67e22'][k] : '#8a6e58')
  return (
    <svg viewBox="0 0 300 300" className="diagram">
      <rect width="300" height="300" rx="14" fill="#f3efe4" />
      {legs.map((l) => <Leg key={l.n} pts={l.p} on={hl === 'legs'} n={l.n} />)}
      <ellipse cx="150" cy="200" rx="44" ry="54" fill={fill(1)} stroke={LINE} strokeWidth="2.5" />
      <ellipse cx="150" cy="112" rx="32" ry="30" fill={fill(0)} stroke={LINE} strokeWidth="2.5" />
      {[[140, 90], [160, 90], [133, 96], [167, 96], [144, 99], [156, 99], [137, 103], [163, 103]].map(([x, y]) => (
        <circle key={x + '' + y} cx={x} cy={y} r="3" fill={hl === 'eyes' ? '#c0392b' : '#1b1b1b'} />
      ))}
      {hl === 'body' && (<><Label x="222" y="116">CEPHALOTHORAX</Label><Label x="150" y="272">ABDOMEN</Label></>)}
      {hl === 'legs' && <Label x="150" y="292">8 legs = 4 PAIRS</Label>}
      {hl === 'eyes' && <Label x="150" y="292">SIMPLE eyes only (no compound eyes)</Label>}
      {hl === 'antennae' && <Label x="150" y="292">NO antennae!</Label>}
      {hl === 'wings' && <Label x="150" y="292">NO wings!</Label>}
    </svg>
  )
}

function Tick({ hl, baby }) {
  const all = [
    [[118, 128], [82, 104], [66, 80]],
    [[114, 142], [76, 138], [56, 150]],
    [[116, 158], [80, 176], [64, 202]],
    [[122, 172], [96, 206], [88, 236]],
  ]
  const legsL = baby ? all.slice(0, 3) : all
  const legs = [...legsL.map((p, i) => ({ p, n: i * 2 + 1 })), ...legsL.map((p, i) => ({ p: mirror(p), n: i * 2 + 2 }))]
  const s = baby ? 0.85 : 1
  return (
    <svg viewBox="0 0 300 300" className="diagram">
      <rect width="300" height="300" rx="14" fill="#f3efe4" />
      {legs.map((l) => <Leg key={l.n} pts={l.p} on={hl === 'legs'} n={l.n} />)}
      <rect x="138" y="80" width="24" height="24" rx="6" fill={hl === 'body' ? '#f6c26b' : '#6b3f2a'} stroke={LINE} strokeWidth="2" />
      <ellipse cx="150" cy="170" rx={46 * s} ry={64 * s} fill={hl === 'body' ? '#e67e22' : '#7b4a33'} stroke={LINE} strokeWidth="2.5" />
      {hl === 'legs' && <Label x="150" y="292">{baby ? 'BABY tick: 6 legs = 3 PAIRS' : 'ADULT tick: 8 legs = 4 PAIRS'}</Label>}
      {hl === 'body' && <Label x="150" y="292">2 body parts (mouthparts + body)</Label>}
      {(hl === 'antennae' || hl === 'wings') && <Label x="150" y="292">NO antennae, NO wings</Label>}
      {hl === 'eyes' && <Label x="150" y="292">Arachnids: simple eyes only</Label>}
    </svg>
  )
}

function Segmented({ hl, milli }) {
  const segs = 8
  const xs = Array.from({ length: segs }, (_, i) => 62 + i * 26)
  return (
    <svg viewBox="0 0 300 200" className="diagram">
      <rect width="300" height="200" rx="14" fill="#f3efe4" />
      {xs.map((x, i) =>
        milli ? (
          <g key={x}>
            {[-6, 6].map((dx) => (
              <g key={dx}>
                <line x1={x + dx} y1="88" x2={x + dx - 2} y2="62" stroke={hl === 'legs' ? HL : LINE} strokeWidth={hl === 'legs' ? 3.5 : 2.5} strokeLinecap="round" />
                <line x1={x + dx} y1="112" x2={x + dx - 2} y2="138" stroke={hl === 'legs' ? HL : LINE} strokeWidth={hl === 'legs' ? 3.5 : 2.5} strokeLinecap="round" />
              </g>
            ))}
            {hl === 'legs' && i === 2 && <Label x={x} y="160">2 pairs here</Label>}
          </g>
        ) : (
          <g key={x}>
            <polyline points={`${x},88 ${x - 10},60 ${x - 24},50`} fill="none" stroke={hl === 'legs' ? HL : LINE} strokeWidth={hl === 'legs' ? 3.5 : 2.5} strokeLinecap="round" />
            <polyline points={`${x},112 ${x - 10},140 ${x - 24},150`} fill="none" stroke={hl === 'legs' ? HL : LINE} strokeWidth={hl === 'legs' ? 3.5 : 2.5} strokeLinecap="round" />
            {hl === 'legs' && i === 2 && <Label x={x + 6} y="172">1 pair here</Label>}
          </g>
        )
      )}
      {xs.map((x, i) => (
        <ellipse key={'s' + x} cx={x} cy="100" rx="14" ry="13" fill={hl === 'body' && i === 2 ? '#f39c12' : milli ? '#5e4a3a' : '#b5651d'} stroke={LINE} strokeWidth="2" />
      ))}
      <circle cx="40" cy="100" r="13" fill={milli ? '#5e4a3a' : '#b5651d'} stroke={LINE} strokeWidth="2" />
      <polyline points="32,92 18,72 10,60" fill="none" stroke={hl === 'antennae' ? HL : LINE} strokeWidth="2.5" />
      <polyline points="32,108 18,128 10,140" fill="none" stroke={hl === 'antennae' ? HL : LINE} strokeWidth="2.5" />
      {hl === 'body' && <Label x="150" y="30">Worm-like body made of many SEGMENTS (one is lit up)</Label>}
      {hl === 'wings' && <Label x="150" y="30">NO wings: centipedes can’t fly</Label>}
      {hl === 'legs' && <Label x="150" y="30">{milli ? 'MILLIpede: 2 pairs per segment' : 'CENTIpede: 1 pair per segment'}</Label>}
    </svg>
  )
}

function Pillbug({ hl, rolled }) {
  if (rolled) {
    return (
      <svg viewBox="0 0 300 220" className="diagram">
        <rect width="300" height="220" rx="14" fill="#f3efe4" />
        <circle cx="150" cy="110" r="62" fill="#6d6f73" stroke="#3a3b3d" strokeWidth="3" />
        {[-40, -20, 0, 20, 40].map((d) => <path key={d} d={`M ${150 + d} 50 Q ${150 + d * 1.4} 110 ${150 + d} 170`} stroke="#3a3b3d" strokeWidth="2" fill="none" />)}
        <Label x="150" y="206">PILLbug rolled into a "pill." Sowbugs CAN’T do this.</Label>
      </svg>
    )
  }
  const plates = Array.from({ length: 7 }, (_, i) => 92 + i * 16)
  return (
    <svg viewBox="0 0 300 260" className="diagram">
      <rect width="300" height="260" rx="14" fill="#f3efe4" />
      {plates.map((y, i) => (
        <g key={y}>
          <Leg pts={[[112, y + 6], [86, y + 10], [74, y + 20]]} on={hl === 'legs'} n={null} />
          <Leg pts={[[188, y + 6], [214, y + 10], [226, y + 20]]} on={hl === 'legs'} n={null} />
          {hl === 'legs' && <text x="60" y={y + 26} fontSize="11" fontWeight="800" fill="#1b1b1b">{i + 1}</text>}
        </g>
      ))}
      <ellipse cx="150" cy="150" rx="46" ry="88" fill="#7d8085" stroke="#3a3b3d" strokeWidth="2.5" />
      {plates.map((y) => <line key={'p' + y} x1="108" y1={y} x2="192" y2={y} stroke={hl === 'body' ? HL : '#3a3b3d'} strokeWidth={hl === 'body' ? 4 : 2} />)}
      <polyline points="138,66 124,44 112,34" fill="none" stroke={hl === 'antennae' ? HL : LINE} strokeWidth="3" />
      <polyline points="162,66 176,44 188,34" fill="none" stroke={hl === 'antennae' ? HL : LINE} strokeWidth="3" />
      {hl === 'legs' && <Label x="150" y="252">7 PAIRS of legs (14 legs)</Label>}
      {hl === 'body' && <Label x="150" y="252">7 overlapping PLATES · breathes with GILLS</Label>}
      {hl === 'antennae' && <Label x="150" y="252">1 pair of antennae (per your manual)</Label>}
      {hl === 'wings' && <Label x="150" y="252">NO wings</Label>}
    </svg>
  )
}

// Termite vs ant swarmer, side by side
function TermiteAnt({ hl }) {
  const wing = (x, y, rx, ry, rot) => (
    <ellipse cx={x} cy={y} rx={rx} ry={ry} transform={`rotate(${rot} ${x} ${y})`} fill={hl === 'wings' ? 'rgba(243,156,18,.4)' : 'rgba(170,205,240,.55)'} stroke={hl === 'wings' ? HL : '#7aa3c8'} strokeWidth="1.5" />
  )
  const ant = hl === 'antennae' ? HL : LINE
  return (
    <svg viewBox="0 0 300 230" className="diagram">
      <rect width="300" height="230" rx="14" fill="#f3efe4" />
      {/* TERMITE (left) */}
      <text x="75" y="20" fontSize="13" fontWeight="800" textAnchor="middle" fill="#1b1b1b">TERMITE</text>
      {wing(48, 140, 12, 58, 12)}{wing(102, 140, 12, 58, -12)}{wing(52, 146, 12, 58, 22)}{wing(98, 146, 12, 58, -22)}
      {[0, 1, 2, 3, 4, 5].map((i) => <circle key={'l' + i} cx={66 - i * 3} cy={52 - i * 4.5} r="3" fill={ant} />)}
      {[0, 1, 2, 3, 4, 5].map((i) => <circle key={'r' + i} cx={84 + i * 3} cy={52 - i * 4.5} r="3" fill={ant} />)}
      <circle cx="75" cy="62" r="13" fill="#d9b48a" stroke={LINE} strokeWidth="2" />
      <rect x="61" y="74" width="28" height="100" rx="13" fill={hl === 'waist' ? '#f6c26b' : '#e7cfae'} stroke={hl === 'waist' ? HL : LINE} strokeWidth="2.5" />
      {/* ANT (right) */}
      <text x="225" y="20" fontSize="13" fontWeight="800" textAnchor="middle" fill="#1b1b1b">ANT</text>
      {wing(198, 118, 11, 50, 14)}{wing(252, 118, 11, 50, -14)}{wing(206, 132, 8, 30, 28)}{wing(244, 132, 8, 30, -28)}
      <polyline points="218,52 212,34 196,26" fill="none" stroke={ant} strokeWidth="3" strokeLinejoin="round" />
      <polyline points="232,52 238,34 254,26" fill="none" stroke={ant} strokeWidth="3" strokeLinejoin="round" />
      <circle cx="225" cy="62" r="13" fill="#7a4b2a" stroke={LINE} strokeWidth="2" />
      <ellipse cx="225" cy="94" rx="12" ry="18" fill="#7a4b2a" stroke={LINE} strokeWidth="2" />
      <circle cx="225" cy="118" r="5" fill={hl === 'waist' ? HL : '#7a4b2a'} stroke={hl === 'waist' ? HL : LINE} strokeWidth="2" />
      <ellipse cx="225" cy="148" rx="17" ry="25" fill="#7a4b2a" stroke={LINE} strokeWidth="2" />
      {hl === 'antennae' && (<><Label x="75" y="214">Straight "beads"</Label><Label x="225" y="214">Bent "elbows"</Label></>)}
      {hl === 'waist' && (<><Label x="75" y="214">Thick waist</Label><Label x="225" y="214">Pinched waist</Label></>)}
      {hl === 'wings' && (<><Label x="75" y="214">4 EQUAL wings</Label><Label x="225" y="214">Front wings BIGGER</Label></>)}
      {!hl && <Label x="150" y="214">Tap a feature below to compare</Label>}
    </svg>
  )
}

// ---------- data ----------
const CRITTERS = [
  { id: 'insect', name: 'Insect (ant, roach, bee)', group: 'Insect', draw: (hl) => <Insect hl={hl} />, stats: { body: 3, legs: 3, antennae: 1, wings: 2, eyes: '2 compound + 1–3 simple', breathe: 'Spiracles' }, note: '3-3-1: three body parts, three pairs of legs, one pair of antennae. Many winged insects have 2 pairs of wings.' },
  { id: 'fly', name: 'Fly / Mosquito', group: 'Insect', draw: (hl) => <Insect hl={hl} wingPairs={1} slim />, stats: { body: 3, legs: 3, antennae: 1, wings: 1, eyes: '2 compound + simple', breathe: 'Spiracles' }, note: 'Still an insect (3-3-1), but flies and mosquitoes have only ONE pair of wings. The tiny knobs are where the 2nd pair would be.' },
  { id: 'spider', name: 'Spider', group: 'Arachnid', draw: (hl) => <Spider hl={hl} />, stats: { body: 2, legs: 4, antennae: 0, wings: 0, eyes: 'Simple only', breathe: 'Spiracles' }, note: 'Arachnid: 2 body parts (cephalothorax + abdomen), 4 pairs of legs, NO antennae, NO wings, simple eyes only.' },
  { id: 'tick', name: 'Tick: adult', group: 'Arachnid', draw: (hl) => <Tick hl={hl} />, stats: { body: 2, legs: 4, antennae: 0, wings: 0, eyes: 'Simple only', breathe: 'Spiracles' }, note: 'Adult ticks and mites: 4 pairs of legs like all arachnids.' },
  { id: 'babytick', name: 'Tick: baby', group: 'Arachnid', draw: (hl) => <Tick hl={hl} baby />, stats: { body: 2, legs: 3, antennae: 0, wings: 0, eyes: 'Simple only', breathe: 'Spiracles' }, note: 'TRICK QUESTION ALERT: immature ticks and mites have only 3 pairs of legs. They get the 4th pair later.' },
  { id: 'centi', name: 'Centipede', group: 'Centipede', draw: (hl) => <Segmented hl={hl} />, stats: { body: 'Many segments', legs: '1 per segment', antennae: 1, wings: 0, eyes: '-', breathe: 'Spiracles' }, note: 'CENTIpede: ONE pair of legs per segment. No wings.' },
  { id: 'milli', name: 'Millipede', group: 'Millipede', draw: (hl) => <Segmented hl={hl} milli />, stats: { body: 'Many segments', legs: '2 per segment', antennae: 1, wings: 0, eyes: '-', breathe: 'Spiracles' }, note: 'MILLIpede: TWO pairs of legs per segment. Memory trick: "milli" has double L, double legs.' },
  { id: 'pill', name: 'Pillbug / Sowbug', group: 'Crustacean', draw: (hl, rolled) => <Pillbug hl={hl} rolled={rolled} />, stats: { body: '7 plates', legs: 7, antennae: 1, wings: 0, eyes: '-', breathe: 'GILLS' }, note: 'Crustacean: 7 overlapping plates, 7 pairs of legs, breathe with gills. Pillbugs roll up; sowbugs can’t.' },
  { id: 'termant', name: 'Termite vs. Ant', group: 'Compare', draw: (hl) => <TermiteAnt hl={hl} />, stats: null, note: 'Termites (order Isoptera = "equal wings"): straight bead-like antennae, thick waist, 4 equal wings. Ants: elbowed antennae, pinched waist, front wings bigger.' },
]

const FEATURES = [
  ['body', '🧩 Body parts'],
  ['legs', '🦵 Legs'],
  ['antennae', '📡 Antennae'],
  ['eyes', '👀 Eyes'],
  ['wings', '🪽 Wings'],
]

const MOUTHS = [
  { name: 'Chewing', tool: '🦷', like: 'Teeth / pliers', who: 'Beetles, cockroaches, termites', note: 'Most basic type: eats solid food.' },
  { name: 'Rasping-sucking', tool: '🧀', like: 'A cheese grater + straw', who: 'THRIPS ONLY', note: 'Scrapes the plant until sap flows, then sucks it up.' },
  { name: 'Piercing-sucking', tool: '💉', like: 'A needle', who: 'Mosquitoes, biting flies, fleas, lice', note: 'Pokes through skin or plant and sucks blood or sap.' },
  { name: 'Sponging', tool: '🧽', like: 'A sponge / mop', who: 'House flies, blow flies, fruit flies', note: 'Mops up liquids sitting out.' },
  { name: 'Siphoning', tool: '🥤', like: 'A long curly straw', who: 'Moths and butterflies', note: 'Sips nectar or water.' },
  { name: 'Chewing-lapping', tool: '👅', like: 'Teeth + tongue', who: 'Some bees and wasps', note: 'Chews solids AND laps up nectar.' },
]

const CYCLES = [
  { name: 'Gradual', stages: [['🥚', 'Egg', 0.8], ['🪳', 'Nymph (small adult)', 0.7], ['🪳', 'Adult', 1.1]], who: 'Cockroaches, TERMITES, grasshoppers, BED BUGS, earwigs', note: 'Babies look like small adults and change a little with each molt.' },
  { name: 'Incomplete', stages: [['🥚', 'Egg', 0.8], ['🌊', 'Naiad (lives in WATER)', 1], ['🪽', 'Flying adult', 1]], who: 'Dragonflies, damselflies, mayflies', note: 'Babies live in water and look very different; adults fly.' },
  { name: 'Complete', stages: [['🥚', 'Egg', 0.8], ['🐛', 'Larva', 1], ['🫘', 'Pupa', 0.9], ['🦋', 'Adult', 1.1]], who: 'Ants, bees, beetles, butterflies, FLEAS, flies, moths, wasps', note: '4 stages. The baby looks NOTHING like the adult.' },
  { name: 'Without', stages: [['🥚', 'Egg', 0.8], ['🐟', 'Young', 0.7], ['🐟', 'Adult', 1.1]], who: 'Silverfish, firebrats, booklice', note: 'Babies are just smaller copies. They only get bigger.' },
]

// "Count it!" questions built from the critter stats
function countQuestions() {
  const qs = []
  const nums = (right, pool) => shuffle([...new Set([right, ...shuffle(pool).filter((x) => x !== right)])].slice(0, 4))
  for (const c of CRITTERS) {
    if (!c.stats) continue
    const s = c.stats
    if (typeof s.legs === 'number') qs.push({ c, q: `How many PAIRS of legs does a ${c.name.toLowerCase()} have?`, right: s.legs, choices: nums(s.legs, [2, 3, 4, 7, 1]), hl: 'legs' })
    if (typeof s.body === 'number') qs.push({ c, q: `How many BODY PARTS does a ${c.name.toLowerCase()} have?`, right: s.body, choices: nums(s.body, [1, 2, 3, 4]), hl: 'body' })
    if (typeof s.wings === 'number') qs.push({ c, q: `How many PAIRS of wings does a ${c.name.toLowerCase()} have?`, right: s.wings, choices: nums(s.wings, [0, 1, 2, 3]), hl: 'wings' })
    if (typeof s.antennae === 'number') qs.push({ c, q: `How many PAIRS of antennae does a ${c.name.toLowerCase()} have?`, right: s.antennae, choices: nums(s.antennae, [0, 1, 2]), hl: 'antennae' })
  }
  qs.push({ c: CRITTERS[5], q: 'A CENTIpede has how many pairs of legs per body segment?', right: 1, choices: [1, 2, 3, 4], hl: 'legs' })
  qs.push({ c: CRITTERS[6], q: 'A MILLIpede has how many pairs of legs per body segment?', right: 2, choices: [1, 2, 3, 4], hl: 'legs' })
  return qs
}

// ---------- screens ----------
function Bodies() {
  const [sel, setSel] = useState(CRITTERS[0])
  const [hl, setHl] = useState('body')
  const [rolled, setRolled] = useState(false)
  const features = sel.id === 'termant' ? [['antennae', '📡 Antennae'], ['waist', '⏳ Waist'], ['wings', '🪽 Wings']] : FEATURES
  return (
    <>
      <div className="chips">
        {CRITTERS.map((c) => (
          <button key={c.id} className={'chip' + (sel === c ? ' on' : '')} onClick={() => { setSel(c); setHl(c.id === 'termant' ? 'antennae' : 'body'); setRolled(false) }}>{c.name}</button>
        ))}
      </div>
      <div className="card" style={{ padding: 8 }}>
        <span className="pill" style={{ margin: 6 }}>{sel.group}</span>
        {sel.draw(hl, rolled)}
      </div>
      <div className="chips">
        {features.map(([id, label]) => (
          <button key={id} className={'chip' + (hl === id ? ' on' : '')} onClick={() => setHl(hl === id ? null : id)}>{label}</button>
        ))}
        {sel.id === 'pill' && <button className={'chip' + (rolled ? ' on' : '')} onClick={() => setRolled(!rolled)}>🎱 Roll up</button>}
      </div>
      {sel.stats && (
        <div className="card small">
          <div className="row" style={{ justifyContent: 'space-between' }}><span>🧩 Body parts</span><b>{sel.stats.body}</b></div>
          <div className="row" style={{ justifyContent: 'space-between' }}><span>🦵 Pairs of legs</span><b>{sel.stats.legs}</b></div>
          <div className="row" style={{ justifyContent: 'space-between' }}><span>📡 Pairs of antennae</span><b>{sel.stats.antennae}</b></div>
          <div className="row" style={{ justifyContent: 'space-between' }}><span>👀 Eyes</span><b>{sel.stats.eyes}</b></div>
          <div className="row" style={{ justifyContent: 'space-between' }}><span>🪽 Pairs of wings</span><b>{sel.stats.wings}</b></div>
          <div className="row" style={{ justifyContent: 'space-between' }}><span>🫁 Breathes with</span><b>{sel.stats.breathe}</b></div>
        </div>
      )}
      <div className="plain"><b>🗣️ Remember:</b> {sel.note}</div>
    </>
  )
}

function CountIt() {
  const [round, setRound] = useState(0)
  const qs = useMemo(() => shuffle(countQuestions()).slice(0, 10), [round])
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState(null)
  const [score, setScore] = useState(0)
  if (i >= qs.length) {
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <div className="bigscore">{score}/{qs.length}</div>
        <button className="btn block" onClick={() => { setRound(round + 1); setI(0); setScore(0); setPicked(null) }}>Count again</button>
      </div>
    )
  }
  const q = qs[i]
  const choose = (n) => {
    if (picked !== null) return
    setPicked(n)
    if (n === q.right) setScore(score + 1)
  }
  const next = () => {
    if (i + 1 >= qs.length) recordGame('buglab', score)
    setI(i + 1)
    setPicked(null)
  }
  return (
    <>
      <div className="small muted">Question {i + 1} of {qs.length} · Score {score}</div>
      <div className="qtext">{q.q}</div>
      <div className="card" style={{ padding: 8 }}>{q.c.draw(picked !== null ? q.hl : null, false)}</div>
      <div className="grid2" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {q.choices.map((n) => (
          <button key={n} className={'choice' + (picked !== null && n === q.right ? ' right' : picked === n ? ' wrong' : '')} style={{ textAlign: 'center', fontSize: 22, fontWeight: 800, margin: 0 }} onClick={() => choose(n)}>{n}</button>
        ))}
      </div>
      {picked !== null && (
        <>
          <div className={'explain ' + (picked === q.right ? 'right' : 'wrong')} style={{ marginTop: 10 }}>{q.c.note}</div>
          <button className="btn block" onClick={next}>Next →</button>
        </>
      )}
    </>
  )
}

function Mouths() {
  return MOUTHS.map((m) => (
    <div key={m.name} className="card row" style={{ flexWrap: 'nowrap', alignItems: 'center' }}>
      <span style={{ fontSize: 44 }}>{m.tool}</span>
      <div>
        <b>{m.name}</b> <span className="muted small">like {m.like}</span>
        <div className="small" style={{ fontWeight: 700 }}>{m.who}</div>
        <div className="small muted">{m.note}</div>
      </div>
    </div>
  ))
}

function Cycles() {
  return CYCLES.map((c) => (
    <div key={c.name} className="card">
      <b>{c.name} metamorphosis</b>
      <div className="row" style={{ alignItems: 'flex-end', justifyContent: 'space-around', flexWrap: 'nowrap', margin: '10px 0' }}>
        {c.stages.map(([e, label, size], i) => (
          <React.Fragment key={label}>
            {i > 0 && <span className="muted" style={{ fontSize: 20 }}>→</span>}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 40 * size }}>{e}</div>
              <div className="small" style={{ fontSize: 11, maxWidth: 70 }}>{label}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="small" style={{ fontWeight: 700 }}>{c.who}</div>
      <div className="small muted">{c.note}</div>
    </div>
  ))
}

export default function BugLab() {
  const [tab, setTab] = useState('bodies')
  const TABS = [['bodies', '🔬 Body plans'], ['count', '🔢 Count it!'], ['mouths', '🍽️ Mouths'], ['cycles', '🦋 Life cycles']]
  return (
    <>
      <Header title="🐜 Bug Lab" sub="Count the parts and see the differences" />
      <div className="chips">
        {TABS.map(([id, label]) => <button key={id} className={'chip' + (tab === id ? ' on' : '')} onClick={() => setTab(id)}>{label}</button>)}
      </div>
      {tab === 'bodies' && <Bodies />}
      {tab === 'count' && <CountIt />}
      {tab === 'mouths' && <Mouths />}
      {tab === 'cycles' && <Cycles />}
    </>
  )
}
