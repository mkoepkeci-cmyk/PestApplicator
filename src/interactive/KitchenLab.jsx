import React, { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header.jsx'
import { topicById } from '../data/topics.js'
import { recordGame } from '../storage.js'

// The six formulations you mix with water, side by side (manual p. 8–9).
// stir: 3 = frequent, 2 = some, 1 = little, 0 = not frequent
export const MIXES = [
  {
    abbr: 'WP', name: 'Wettable Powder', starts: 'powder', food: '🍫 Cocoa in cold milk',
    water: ['🏖️', 'Floats, then SINKS fast'], stir: [3, 'FREQUENT: keep it running'],
    residue: 'Visible deposits', watch: 'Gritty: wears out piston & roller pumps',
    trick: 'W = WHISK it nonstop. It gets Wet but never melts.',
    look: { kind: 'grit', color: '#6d3f1e', n: 34, size: 9, sink: 1.1 },
  },
  {
    abbr: 'SP', name: 'Soluble Powder', starts: 'powder', food: '🧃 Kool-Aid',
    water: ['✨', 'DISAPPEARS (true solution)'], stir: [0, 'Not frequent'],
    residue: 'Less visible than WP', watch: 'Looks just like a WP in the bag!',
    trick: 'S = SUGAR. Stir it once and it vanishes.',
    look: { kind: 'dissolve', color: '#c2185b', n: 30, size: 7, tint: 'rgba(205,40,100,.55)' },
  },
  {
    abbr: 'EC', name: 'Emulsifiable Concentrate', starts: 'liquid', food: '🥗 Salad dressing / mayo',
    water: ['🥛', 'Turns MILKY white'], stir: [2, 'SOME'],
    residue: 'Barely visible', watch: 'Oils/solvents can damage surfaces. Test first',
    trick: 'E = EMULSION = "Eek, it\'s milky!" like mayo.',
    look: { kind: 'milky', color: '#f2c94c', n: 18, size: 13, tint: 'rgba(250,248,238,.97)', layer: '#f2d675', layerMax: 14, sep: 7 },
  },
  {
    abbr: 'SC', name: 'Suspension Concentrate', starts: 'liquid', food: '🥤 Bottled chocolate milk',
    water: ['🌫️', 'Smooth even haze for a LONG time'], stir: [1, 'Little or none'],
    residue: 'Not stated in manual', watch: 'Liquid = far less dust to breathe than powders',
    trick: 'SC = "Stays Calm." It\'s already wet, so it stays mixed.',
    look: { kind: 'haze', tint: 'rgba(130,90,60,.5)', clearMax: 12, sep: 16 },
  },
  {
    abbr: 'F', name: 'Flowable Liquid', starts: 'liquid', food: '🥛 A smoothie that stays blended',
    water: ['🌫️', 'Stays mixed a LONG time'], stir: [1, 'Little'],
    residue: 'Not stated in manual', watch: 'Easy to handle; dilutes great',
    trick: 'F = a WP that learned to FLOW: powder sold already in a bottle.',
    look: { kind: 'haze', tint: 'rgba(160,120,85,.5)', clearMax: 15, sep: 14 },
  },
  {
    abbr: 'ME', name: 'Microencapsulated', starts: 'liquid', food: '🧋 Boba pearls',
    water: ['🧋', 'Tiny CAPSULES float around'], stir: [2, 'Some (like an SC)'],
    residue: 'Visible residue', watch: 'Can clog sprayers. Longer residual',
    trick: 'ME = MINI EGGS: poison hides inside tiny shells and leaks out slowly.',
    look: { kind: 'capsule', color: '#2e7d32', n: 22, size: 13, sink: 4.5 },
  },
]

const STIR_COLORS = ['#2f8f4e', '#7cb342', '#f0a020', '#c0392b']
const rand = (a, b) => a + Math.random() * (b - a)

// ---------- the jar ----------
export function Jar({ f, stir, pourKey = 0, small = false }) {
  const L = f.look
  const [poured, setPoured] = useState(false)
  useEffect(() => {
    setPoured(false)
    const t = setTimeout(() => setPoured(true), 80)
    return () => clearTimeout(t)
  }, [f, pourKey])

  const parts = useMemo(
    () => Array.from({ length: L.n || 0 }, () => ({ x: rand(5, 90), y: rand(25, 86), floor: rand(86, 95), d: rand(0, 1), s: rand(0.7, 1.3), r: rand(0, 90) })),
    [f, pourKey]
  )

  let liquid = 'rgba(120,180,230,.3)'
  if (poured && (L.kind === 'dissolve' || L.kind === 'milky')) liquid = L.tint
  if (poured && L.kind === 'haze') liquid = L.tint
  if (poured && L.kind === 'grit' && stir) liquid = 'rgba(140,100,70,.25)'
  if (poured && L.kind === 'capsule') liquid = 'rgba(150,200,150,.25)'

  const pStyle = (p) => {
    const sz = L.size * p.s * (small ? 0.75 : 1)
    const base = { left: p.x + '%', width: sz, height: sz }
    if (L.kind === 'grit') Object.assign(base, { background: L.color, borderRadius: '2px', transform: `rotate(${p.r}deg)` })
    else if (L.kind === 'capsule') Object.assign(base, { background: 'radial-gradient(circle, #b9f6ca 0 35%, rgba(255,255,255,.7) 36%)', border: `3px solid ${L.color}`, animationName: 'leak', animationDuration: '1.8s', animationIterationCount: 'infinite', animationDelay: p.d + 's' })
    else if (L.kind === 'dissolve') Object.assign(base, { background: L.color, borderRadius: '2px' })
    else Object.assign(base, { background: L.color })

    if (!poured) return { ...base, top: '6%', transition: 'none' }
    if (L.kind === 'dissolve') return { ...base, top: p.y + '%', opacity: 0, transition: `opacity 1.4s ${p.d}s, top .9s` }
    if (L.kind === 'milky') return { ...base, top: p.y + '%', opacity: 0, transition: `opacity 1s ${p.d * 0.6}s, top .6s` }
    if (stir) return { ...base, top: p.y + '%', transition: 'top .6s', animation: `swirl ${1.2 + p.s}s ease-in-out ${p.d}s infinite${L.kind === 'capsule' ? ', leak 1.8s infinite' : ''}` }
    return { ...base, top: p.floor + '%', transition: `top ${L.sink * p.s}s ease-in` }
  }

  // slow separation for liquids: a clear band appears at the top (SC, F) or an oil band (EC)
  const band = L.kind === 'haze' ? L.clearMax : L.kind === 'milky' ? L.layerMax : 0
  return (
    <div className={'jar' + (small ? ' small' : '')} aria-label={f.name + ' in water'}>
      <div className="liquid" style={{ background: liquid }} />
      {band > 0 && (
        <div
          className="band"
          style={{
            height: poured && !stir ? band + '%' : '0%',
            background: L.kind === 'milky' ? L.layer : 'rgba(200,230,255,.95)',
            transition: `height ${stir ? 0.6 : L.sep}s ease-out`,
          }}
        />
      )}
      <div className={'paddle' + (stir ? ' spin' : '')} />
      {parts.map((p, i) => <span key={i} className="particle" style={pStyle(p)} />)}
    </div>
  )
}

const StartsAs = ({ f }) => (
  <span className={'starts ' + f.starts}>{f.starts === 'powder' ? '🛍️ Comes as a DRY POWDER' : '🧴 Comes as a LIQUID'}</span>
)

function StirMeter({ level }) {
  return (
    <span className="stirmeter" aria-label={`agitation ${level} of 3`}>
      {[1, 2, 3].map((i) => <i key={i} style={{ background: i <= level ? STIR_COLORS[level] : 'var(--line)' }} />)}
    </span>
  )
}

// ---------- tab: Mix it ----------
function MixIt() {
  const dry = useMemo(() => topicById('formulations').sections.flatMap((s) => s.items).filter((it) => !MIXES.some((m) => m.abbr === it.abbr)), [])
  const all = [...MIXES.map((m) => ({ ...m, mix: true })), ...dry.map((d) => ({ abbr: d.abbr, name: d.name, food: d.food, hook: d.hook, mix: false }))]
  const [sel, setSel] = useState(all[0])
  const [stir, setStir] = useState(true)
  const [pourN, setPourN] = useState(0)
  const [seen, setSeen] = useState(() => new Set())
  const DRY_ART = { D: '🍩💨', G: '🍚⬇️', B: '🍪🐜', FUM: '🏠🌫️', SYN: '🧂➕🌼', IGR: '🐛🚫🦋' }
  const item = topicById('formulations').sections.flatMap((s) => s.items).find((it) => it.abbr === sel.abbr)

  useEffect(() => {
    setSeen((s) => {
      const n = new Set(s).add(sel.abbr)
      recordGame('lab', n.size)
      return n
    })
  }, [sel])

  return (
    <>
      <div className="chips">
        {all.map((it) => (
          <button key={it.abbr} className={'chip' + (sel.abbr === it.abbr ? ' on' : '')} onClick={() => { setSel(it); setStir(true) }}>{it.abbr}</button>
        ))}
      </div>
      <div className="card">
        <h3 style={{ marginBottom: 2 }}>{sel.name} ({sel.abbr})</h3>
        <div className="muted small">Kitchen twin: <b>{sel.food}</b></div>
        {sel.mix ? (
          <>
            <div style={{ margin: '8px 0' }}><StartsAs f={sel} /></div>
            <div className="lab-stage"><Jar f={sel} stir={stir} pourKey={pourN} /></div>
            <div className="row" style={{ marginTop: 10 }}>
              <button className="btn ghost" onClick={() => { setPourN(pourN + 1); setStir(true) }}>🫗 Pour again</button>
              <button className="btn" style={!stir ? { background: 'var(--bad)', color: '#fff' } : undefined} onClick={() => setStir(!stir)}>
                {stir ? '⏸ Stop stirring' : '▶️ Start stirring'}
              </button>
            </div>
            {!stir && <p className="small" style={{ fontWeight: 700, marginBottom: 0 }}>{STOP_MSG[sel.abbr]}</p>}
          </>
        ) : (
          <>
            <div style={{ margin: '8px 0' }}><span className="starts ready">📦 READY TO USE: no water</span></div>
            <div className="dry-stage" aria-hidden>{DRY_ART[sel.abbr]}</div>
          </>
        )}
      </div>
      {sel.mix && (
        <div className="card small">
          <div className="row" style={{ justifyContent: 'space-between' }}><span>In water</span><b>{sel.water[0]} {sel.water[1]}</b></div>
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}><span>Stirring needed</span><b><StirMeter level={sel.stir[0]} /> {sel.stir[1]}</b></div>
          <div className="row" style={{ justifyContent: 'space-between' }}><span>Residue</span><b>{sel.residue}</b></div>
          <div className="plain" style={{ marginTop: 8 }}><b>🧠 Trick:</b> {sel.trick}</div>
        </div>
      )}
      {item && (
        <div className="card">
          <div className="hook" style={{ marginTop: 0 }}>{item.hook}</div>
          <ul className="facts small">{item.facts.map((f) => <li key={f}>{f}</li>)}</ul>
        </div>
      )}
      <p className="small muted">Explored {seen.size} of {all.length}</p>
    </>
  )
}

const STOP_MSG = {
  WP: '💥 CRASH! It sank in about a second. That\'s why WPs need FREQUENT stirring.',
  SP: '😴 Nothing happens. It\'s dissolved, so there\'s nothing to sink.',
  EC: '🟡 A thin oily layer slowly creeps up. That\'s why ECs need SOME stirring.',
  SC: '🐢 Watch closely… barely any change for a long time. Little or no stirring.',
  F: '🐢 Stays mixed a long time, just like an SC. Little stirring.',
  ME: '🧋 The capsules drift down slowly. ME needs some stirring.',
}

// ---------- tab: Face-off ----------
function FaceOff() {
  const [a, setA] = useState(MIXES[0])
  const [b, setB] = useState(MIXES[4])
  const [stir, setStir] = useState(true)
  const [pourN, setPourN] = useState(0)
  const rows = [
    ['Comes as', (f) => (f.starts === 'powder' ? '🛍️ Dry powder' : '🧴 Liquid')],
    ['In water', (f) => `${f.water[0]} ${f.water[1]}`],
    ['Stirring', (f) => f.stir[1]],
    ['Residue', (f) => f.residue],
    ['Watch out', (f) => f.watch],
  ]
  const Pick = ({ val, set, other }) => (
    <div className="chips" style={{ paddingBottom: 4 }}>
      {MIXES.map((m) => (
        <button key={m.abbr} className={'chip' + (val === m ? ' on' : '')} disabled={other === m} onClick={() => { set(m); setStir(true); setPourN(pourN + 1) }}>{m.abbr}</button>
      ))}
    </div>
  )
  return (
    <>
      <div className="small muted">Pick two, then press <b>Stop stirring</b> and watch what each one does.</div>
      <div className="small" style={{ fontWeight: 700, marginTop: 6 }}>Left jar</div>
      <Pick val={a} set={setA} other={b} />
      <div className="small" style={{ fontWeight: 700 }}>Right jar</div>
      <Pick val={b} set={setB} other={a} />
      <div className="card">
        <div className="faceoff">
          {[a, b].map((f) => (
            <div key={f.abbr} style={{ textAlign: 'center' }}>
              <b style={{ fontSize: 22 }}>{f.abbr}</b>
              <div className="small muted" style={{ minHeight: 34 }}>{f.name}</div>
              <Jar f={f} stir={stir} pourKey={pourN} small />
            </div>
          ))}
        </div>
        <div className="row" style={{ marginTop: 10 }}>
          <button className="btn ghost" onClick={() => { setPourN(pourN + 1); setStir(true) }}>🫗 Pour both</button>
          <button className="btn" style={!stir ? { background: 'var(--bad)', color: '#fff' } : undefined} onClick={() => setStir(!stir)}>{stir ? '⏸ Stop stirring' : '▶️ Stir both'}</button>
        </div>
      </div>
      <div className="card small">
        {rows.map(([label, get]) => {
          const same = get(a) === get(b)
          return (
            <div key={label} className="cmp-row">
              <div className="cmp-label">{label} {same ? <span className="same">same</span> : <span className="diff">different</span>}</div>
              <div className="cmp-vals">
                <div className={same ? '' : 'hl'}>{get(a)}</div>
                <div className={same ? '' : 'hl'}>{get(b)}</div>
              </div>
            </div>
          )
        })}
        <div className="plain" style={{ marginTop: 8 }}>
          <b>🧠 {a.abbr}:</b> {a.trick}<br /><b>🧠 {b.abbr}:</b> {b.trick}
        </div>
      </div>
    </>
  )
}

// ---------- tab: Chart ----------
function Chart() {
  const [open, setOpen] = useState(null)
  return (
    <>
      <div className="small muted" style={{ marginBottom: 8 }}>Tap a row for the memory trick.</div>
      <div className="chart">
        <div className="chart-row chart-head">
          <div>Type</div><div>Comes as</div><div>In water</div><div>Stir?</div>
        </div>
        {MIXES.map((m) => (
          <React.Fragment key={m.abbr}>
            <button className={'chart-row' + (open === m.abbr ? ' open' : '')} onClick={() => setOpen(open === m.abbr ? null : m.abbr)}>
              <div><b style={{ fontSize: 17 }}>{m.abbr}</b><div className="tiny">{m.name}</div></div>
              <div><span style={{ fontSize: 22 }}>{m.starts === 'powder' ? '🛍️' : '🧴'}</span><div className="tiny">{m.starts === 'powder' ? 'Powder' : 'Liquid'}</div></div>
              <div><span style={{ fontSize: 22 }}>{m.water[0]}</span><div className="tiny">{m.water[1]}</div></div>
              <div><StirMeter level={m.stir[0]} /><div className="tiny">{m.stir[1].split(':')[0]}</div></div>
            </button>
            {open === m.abbr && (
              <div className="chart-detail small">
                <div>🧠 <b>{m.trick}</b></div>
                <div>🍳 Kitchen twin: {m.food}</div>
                <div>👀 Residue: {m.residue}</div>
                <div>⚠️ {m.watch}</div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="card small" style={{ marginTop: 12 }}>
        <b>The look-alike pairs</b>
        <div style={{ marginTop: 6 }}>🛍️ <b>WP vs SP</b>: both are powders in a bag. SP disappears (Sugar). WP sinks (Whisk it).</div>
        <div style={{ marginTop: 6 }}>🧴 <b>SC vs F</b>: both are liquids that stay mixed a long time with little stirring. F is a WP made into a liquid (it learned to Flow). SC is tiny particles in water or oil (Stays Calm).</div>
        <div style={{ marginTop: 6 }}>🛍️➡️🧴 <b>WP vs F</b>: same kind of powder, but F comes already in liquid, so it barely needs stirring. WP comes dry and sinks fast.</div>
        <div style={{ marginTop: 6 }}>🧴 <b>EC vs SC</b>: both liquids. EC turns MILKY (emulsion); SC is a smooth haze.</div>
      </div>
    </>
  )
}

// ---------- tab: 2-question sorter ----------
const TREE = {
  q: '1️⃣ Bag or bottle? What does it look like BEFORE you add water?',
  options: [
    {
      label: '🛍️ Dry powder',
      next: { q: '2️⃣ Stir it into water. Does it DISAPPEAR?', options: [
        { label: '✨ Yes, gone like sugar', answer: 'SP' },
        { label: '🏖️ No, it floats then sinks', answer: 'WP' },
      ] },
    },
    {
      label: '🧴 Liquid',
      next: { q: '2️⃣ Pour it into water. What do you see?', options: [
        { label: '🥛 Turns milky white', answer: 'EC' },
        { label: '🧋 Tiny capsules', answer: 'ME' },
        { label: '🌫️ Smooth haze that stays mixed', next: { q: '3️⃣ What\'s inside the bottle?', options: [
          { label: 'Tiny particles in water or oil', answer: 'SC' },
          { label: 'A water-dispersible POWDER made liquid', answer: 'F' },
        ] } },
      ] },
    },
  ],
}

function Sorter() {
  const [path, setPath] = useState([])
  let node = TREE
  for (const i of path) node = node.options[i].next || node.options[i]
  const result = node.answer && MIXES.find((m) => m.abbr === node.answer)
  return (
    <>
      <div className="plain"><b>🗣️ In plain words:</b> You can name any of the six with two (sometimes three) questions. Question 1 is always: <b>bag or bottle?</b></div>
      {path.length > 0 && (
        <div className="small muted" style={{ margin: '8px 0' }}>
          {path.map((i, k) => {
            let n = TREE
            for (const j of path.slice(0, k)) n = n.options[j].next
            return <span key={k}>{n.options[i].label} → </span>
          })}
        </div>
      )}
      {!result ? (
        <div className="card">
          <div className="qtext">{node.q}</div>
          {node.options.map((o, i) => (
            <button key={o.label} className="choice" onClick={() => setPath([...path, i])}>{o.label}</button>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="small muted">It's a…</div>
          <div style={{ fontSize: 30, fontWeight: 800 }}>{result.abbr}: {result.name}</div>
          <div style={{ margin: '8px 0' }}><StartsAs f={result} /></div>
          <div className="lab-stage"><Jar f={result} stir={true} /></div>
          <div className="plain"><b>🧠</b> {result.trick}</div>
        </div>
      )}
      {path.length > 0 && <button className="btn block ghost" onClick={() => setPath([])}>↺ Start over</button>}
    </>
  )
}

export default function KitchenLab() {
  const [tab, setTab] = useState('mix')
  const TABS = [['mix', '🧪 Mix it'], ['face', '⚖️ Face-off'], ['chart', '📊 Chart'], ['sort', '🧭 2 questions']]
  return (
    <>
      <Header title="🥛 Kitchen Lab" sub="How each formulation behaves in water" />
      <div className="chips">
        {TABS.map(([id, label]) => <button key={id} className={'chip' + (tab === id ? ' on' : '')} onClick={() => setTab(id)}>{label}</button>)}
      </div>
      {tab === 'mix' && <MixIt />}
      {tab === 'face' && <FaceOff />}
      {tab === 'chart' && <Chart />}
      {tab === 'sort' && <Sorter />}
    </>
  )
}
