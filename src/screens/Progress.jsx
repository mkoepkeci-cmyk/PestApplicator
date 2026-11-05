import React, { useState } from 'react'
import Header from '../components/Header.jsx'
import { load, resetAll } from '../storage.js'
import { QUIZ_TOPICS } from '../data/questions.js'
import { ACTIVITIES } from './Play.jsx'
import { go } from '../router.js'

export default function Progress() {
  const [d, setD] = useState(load)
  const [confirm, setConfirm] = useState(false)
  const missed = Object.keys(d.missed).length
  const exam = d.topics.exam

  return (
    <>
      <Header title="Progress" sub="Saved on this device only" back={false} />

      <div className="card row" style={{ justifyContent: 'space-around' }}>
        <div className="stat"><b>{exam ? exam.best + '%' : '–'}</b><span className="small muted">best practice exam</span></div>
        <div className="stat"><b>{missed}</b><span className="small muted">questions to fix</span></div>
        <div className="stat"><b>{Object.keys(d.cardsSeen).length}</b><span className="small muted">cards studied</span></div>
      </div>
      {missed > 0 && <button className="btn block" onClick={() => go('quiz/misses')}>🎯 Drill my {missed} misses</button>}

      <h2>Quiz scores by topic</h2>
      <div className="card">
        {QUIZ_TOPICS.map((t) => {
          const s = d.topics[t.id]
          const pct = s?.best || 0
          return (
            <div key={t.id} style={{ marginBottom: 12 }}>
              <div className="row small" style={{ justifyContent: 'space-between' }}>
                <span>{t.emoji} {t.title}</span>
                <b>{s ? pct + '%' : '–'}</b>
              </div>
              <div className="progressbar" style={{ margin: '4px 0 0' }}>
                <div style={{ width: pct + '%', background: pct >= 70 ? 'var(--good)' : pct ? 'var(--warn)' : 'transparent' }} />
              </div>
            </div>
          )
        })}
      </div>

      <h2>Hands-on best scores</h2>
      <div className="card small">
        {ACTIVITIES.map((a) => (
          <div key={a.id} className="row" style={{ justifyContent: 'space-between', padding: '4px 0' }}>
            <span>{a.icon} {a.title}</span>
            <b>{d.games[a.id] ? d.games[a.id].best : '–'}</b>
          </div>
        ))}
      </div>

      <h2>Start fresh</h2>
      {!confirm ? (
        <button className="btn block ghost" onClick={() => setConfirm(true)}>🔄 Reset all progress</button>
      ) : (
        <div className="card">
          <p style={{ marginTop: 0 }}>Erase all scores, misses and history on this device?</p>
          <div className="row">
            <button className="btn ghost" onClick={() => setConfirm(false)}>Cancel</button>
            <button className="btn" style={{ background: 'var(--bad)', color: '#fff' }}
              onClick={() => { resetAll(); setD(load()); setConfirm(false) }}>
              Yes, reset
            </button>
          </div>
        </div>
      )}
    </>
  )
}
