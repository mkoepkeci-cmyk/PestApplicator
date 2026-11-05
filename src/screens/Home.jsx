import React from 'react'
import { go } from '../router.js'
import { Tile } from '../components/Header.jsx'
import { load } from '../storage.js'
import { TOPICS } from '../data/topics.js'

export default function Home() {
  const d = load()
  const done = Object.keys(d.topics).filter((k) => TOPICS.some((t) => t.id === k)).length
  const scores = TOPICS.map((t) => d.topics[t.id]?.best).filter((x) => x != null)
  const avg = scores.length ? Math.round(scores.reduce((s, x) => s + x, 0) / scores.length) : 0
  const missed = Object.keys(d.missed).length
  return (
    <>
      <div className="hdr">
        <div>
          <h1>🐜 Pest Prep</h1>
          <p className="sub">California applicator exam study buddy</p>
        </div>
      </div>

      <div className="card" style={{ background: 'var(--brand)', color: 'var(--bg)' }}>
        <div style={{ fontWeight: 800, fontSize: 18 }}>Today's 10-minute plan</div>
        <div style={{ opacity: 0.9, fontSize: 14, margin: '4px 0 12px' }}>
          1 hands-on activity → 1 deck of flashcards → 1 quiz
        </div>
        <div className="row">
          <button className="btn ghost" onClick={() => go('quiz/mixed')}>⚡ Quick 10 quiz</button>
          {missed > 0 && <button className="btn ghost" onClick={() => go('quiz/misses')}>🎯 Fix {missed} misses</button>}
        </div>
      </div>

      {done > 0 && (
        <div className="card row" style={{ justifyContent: 'space-around' }}>
          <div className="stat"><b>{done}/{TOPICS.length}</b><span className="small muted">topics quizzed</span></div>
          <div className="stat"><b>{avg}%</b><span className="small muted">avg best score</span></div>
        </div>
      )}

      <h2>Jump in</h2>
      <Tile icon="🥛" color="#1f8fbf" title="Kitchen Lab" desc="Watch formulations mix (or not) in water" onClick={() => go('play/lab')} />
      <Tile icon="🔧" color="#5b6b7a" title="Sprayer Builder" desc="Tap the parts, then build a power sprayer" onClick={() => go('play/sprayer')} />
      <Tile icon="🧪" color="#7b4fd6" title="Family Sort" desc="Which family does each chemical belong to?" onClick={() => go('play/sort')} />
      <Tile icon="📚" color="#2f6b3a" title="All study topics" desc="Memory hooks for every exam section" onClick={() => go('learn')} />

      <h2>🎯 Test-day tips</h2>
      <div className="card small">
        <div>✅ The California exam has under 200 questions. You need <b>70%</b> to pass.</div>
        <div>✅ Answer the easy ones first. Don't get stuck on hard ones.</div>
        <div>✅ Read every word. Watch for tricky words like NOT, ALWAYS and NEVER.</div>
        <div>✅ Cross out answers you know are wrong, then pick from what's left.</div>
        <div>✅ Your first idea is often right. Don't add "what ifs" to the question.</div>
        <div>✅ Not sure? Mark it, move on, come back. Other questions may give you clues.</div>
        <div>✅ Tally your guesses on scratch paper. A few guesses = you're probably fine.</div>
      </div>

      <p className="small muted" style={{ marginTop: 20 }}>
        Study aid only. Always check facts against the official California study materials and the product label.
        Progress is saved on this device only. Reset it any time from the Progress tab.
      </p>
    </>
  )
}
