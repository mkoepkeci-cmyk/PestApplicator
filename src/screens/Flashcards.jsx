import React, { useMemo, useState } from 'react'
import Header from '../components/Header.jsx'
import { flashcardsFor, topicById } from '../data/topics.js'
import { shuffle } from '../router.js'
import { markCardSeen } from '../storage.js'

export default function Flashcards({ topicId }) {
  const [seed, setSeed] = useState(0)
  const cards = useMemo(() => shuffle(flashcardsFor(topicId)), [topicId, seed])
  const [i, setI] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState(0)
  const t = topicId === 'all' ? null : topicById(topicId)

  if (i >= cards.length) {
    return (
      <>
        <Header title="Deck done! 🎉" />
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="bigscore">{known}/{cards.length}</div>
          <p className="muted">cards you said you knew</p>
          <button className="btn block" onClick={() => { setSeed(seed + 1); setI(0); setKnown(0); setFlipped(false) }}>
            Shuffle & go again
          </button>
        </div>
      </>
    )
  }

  const c = cards[i]
  const next = (knewIt) => {
    if (knewIt) setKnown(known + 1)
    markCardSeen(c.id)
    setFlipped(false)
    setTimeout(() => setI(i + 1), 150)
  }

  return (
    <>
      <Header title={t ? `${t.emoji} Flashcards` : '🃏 All flashcards'} sub={`Card ${i + 1} of ${cards.length} · tap the card to flip`} />
      <div className="progressbar"><div style={{ width: `${(i / cards.length) * 100}%` }} /></div>
      <div className={'flip' + (flipped ? ' on' : '')} onClick={() => setFlipped(!flipped)}>
        <div className="flip-inner">
          <div className="face front">
            <span className="pill" style={{ marginBottom: 14 }}>{c.section}{c.pages ? ` · 📖 p. ${c.pages}` : ''}</span>
            <div className="big">{c.name}</div>
            <p className="muted small" style={{ marginTop: 18 }}>What's the memory hook? Tap to check.</p>
          </div>
          <div className="face back">
            <div className="hook" style={{ marginTop: 0 }}>{c.hook}</div>
            <ul className="facts small">{c.facts.map((f) => <li key={f}>{f}</li>)}</ul>
          </div>
        </div>
      </div>
      <div className="row">
        <button className="btn ghost" onClick={() => next(false)}>😕 Still learning</button>
        <button className="btn" onClick={() => next(true)}>👍 Got it</button>
      </div>
    </>
  )
}
