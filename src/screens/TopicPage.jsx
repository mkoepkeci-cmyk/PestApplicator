import React, { useState } from 'react'
import Header from '../components/Header.jsx'
import { topicById } from '../data/topics.js'
import { SIMPLE } from '../data/simple.js'
import { GLOSSARY } from '../data/glossary.js'
import { go } from '../router.js'

// Which hands-on activities go with each topic
const RELATED = {
  chemicals: [['sort', '🧪 Family Sort']],
  formulations: [['lab', '🥛 Kitchen Lab']],
  toxicity: [['golf', '⛳ LD50 Golf']],
  labels: [['label', '🏷️ Label Explorer'], ['law', '⚖️ Label Law'], ['steps', '🔢 Step Sorter']],
  safety: [['ppe', '🦺 PPE Dress-Up'], ['steps', '🔢 Step Sorter']],
  equipment: [['sprayer', '🔧 Sprayer Builder'], ['pumps', '⚙️ Pump Picker']],
  ipm: [['steps', '🔢 Step Sorter']],
  bugs: [['buglab', '🐜 Bug Lab']],
}

export function WordChips({ topicId }) {
  const words = GLOSSARY.filter((g) => !topicId || g.topics.includes(topicId))
  const [open, setOpen] = useState(null)
  const sel = words.find((w) => w.term === open)
  return (
    <div className="card" style={{ padding: 12 }}>
      <div className="small" style={{ fontWeight: 700, marginBottom: 6 }}>📖 Words to know: tap one</div>
      <div className="row" style={{ gap: 6 }}>
        {words.map((w) => (
          <button key={w.term} className={'chip' + (open === w.term ? ' on' : '')} style={{ minHeight: 34, padding: '4px 10px' }} onClick={() => setOpen(open === w.term ? null : w.term)}>
            {w.term}
          </button>
        ))}
      </div>
      {sel && <div className="hook" style={{ marginBottom: 0 }}><b>{sel.term}:</b> {sel.kid}</div>}
    </div>
  )
}

export default function TopicPage({ topicId }) {
  const t = topicById(topicId)
  const [open, setOpen] = useState(0)
  if (!t) return <Header title="Not found" />
  return (
    <>
      <Header title={`${t.emoji} ${t.title}`} />
      <div className="hook" style={{ marginTop: 0 }}>{t.intro}</div>

      <div className="row" style={{ margin: '12px 0' }}>
        <button className="btn" onClick={() => go('cards/' + t.id)}>🃏 Flashcards</button>
        <button className="btn ghost" onClick={() => go('quiz/' + t.id)}>✅ Quiz</button>
      </div>
      <div className="chips">
        {(RELATED[t.id] || []).map(([id, label]) => (
          <button key={id} className="chip" onClick={() => go('play/' + id)}>{label} →</button>
        ))}
      </div>

      <WordChips topicId={t.id} />

      {t.sections.map((s, i) => (
        <div key={s.title} className={'acc' + (open === i ? ' open' : '')}>
          <button className="acc-h" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            <span>
              {s.title}
              {s.pages && <span className="pill" style={{ marginLeft: 8, fontWeight: 600 }}>📖 p. {s.pages}</span>}
            </span>
            <span className="arrow">›</span>
          </button>
          {open === i && (
            <div className="acc-b">
              {SIMPLE[s.title] && (
                <div className="plain">
                  <b>🗣️ In plain words:</b> {SIMPLE[s.title]}
                </div>
              )}
              {s.hook && <div className="hook">{s.hook}</div>}
              {s.items.map((it) => (
                <div className="item" key={it.name}>
                  <h3>{it.name}</h3>
                  <div className="small" style={{ fontWeight: 600 }}>{it.hook}</div>
                  <ul className="facts small">
                    {it.facts.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  )
}
