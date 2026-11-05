import React from 'react'
import Header, { Tile } from '../components/Header.jsx'
import { QUIZ_TOPICS } from '../data/questions.js'
import { go } from '../router.js'
import { load } from '../storage.js'

export default function QuizHome() {
  const d = load()
  const missed = Object.keys(d.missed).length
  return (
    <>
      <Header title="Quiz" sub="Instant feedback with the reason why" back={false} />
      <Tile icon="⚡" title="Quick 10" desc="10 random questions from everything" onClick={() => go('quiz/mixed')} />
      <Tile icon="📝" title="Practice exam" desc="50 mixed questions, score at the end" onClick={() => go('quiz/exam')} />
      {missed > 0 && <Tile icon="🎯" color="#c0392b" title="Drill my misses" desc={`${missed} questions you've gotten wrong`} onClick={() => go('quiz/misses')} />}
      <h2>By topic</h2>
      {QUIZ_TOPICS.map((t) => {
        const s = d.topics[t.id]
        return (
          <Tile key={t.id} icon={t.emoji} color={t.color} title={t.title} desc={s ? `Best ${s.best}% · ${s.attempts} tries` : 'Not tried yet'} onClick={() => go('quiz/' + t.id)} />
        )
      })}
    </>
  )
}
