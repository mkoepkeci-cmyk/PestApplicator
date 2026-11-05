import React, { useMemo, useState } from 'react'
import Header from '../components/Header.jsx'
import { allQuestions } from '../data/questions.js'
import { topicById } from '../data/topics.js'
import { shuffle, go } from '../router.js'
import { load, recordQuiz } from '../storage.js'

const MODES = {
  mixed: { title: '⚡ Quick 10', n: 10 },
  exam: { title: '📝 Practice exam', n: 50 },
  misses: { title: '🎯 Drill my misses', n: 20 },
}

function buildQuiz(mode) {
  const all = allQuestions()
  let pool
  if (mode === 'misses') {
    const missed = load().missed
    pool = all.filter((q) => missed[q.id])
  } else if (MODES[mode]) {
    pool = all
  } else {
    pool = all.filter((q) => q.topic === mode)
  }
  const n = MODES[mode]?.n ?? 15
  return shuffle(pool)
    .slice(0, n)
    .map((q) => {
      if (q.fixed) return q // True/False stays in order
      const order = shuffle(q.choices.map((_, i) => i))
      return { ...q, choices: order.map((i) => q.choices[i]), answer: order.indexOf(q.answer) }
    })
}

export default function Quiz({ mode }) {
  const [round, setRound] = useState(0)
  const qs = useMemo(() => buildQuiz(mode), [mode, round])
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState(null)
  const [results, setResults] = useState([])
  const [finished, setFinished] = useState(false)

  const title = MODES[mode]?.title || (topicById(mode) ? `${topicById(mode).emoji} ${topicById(mode).title}` : 'Quiz')

  if (!qs.length) {
    return (
      <>
        <Header title={title} />
        <div className="card">Nothing to drill. No missed questions right now! 🎉</div>
        <button className="btn block" onClick={() => go('quiz/mixed')}>Take a Quick 10 instead</button>
      </>
    )
  }

  const restart = () => {
    setRound(round + 1)
    setI(0)
    setPicked(null)
    setResults([])
    setFinished(false)
  }

  if (finished) {
    const correct = results.filter((r) => r.correct).length
    const pct = Math.round((correct / results.length) * 100)
    const wrong = results.filter((r) => !r.correct)
    return (
      <>
        <Header title="Results" sub={title} />
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="bigscore" style={{ color: pct >= 70 ? 'var(--good)' : 'var(--bad)' }}>{pct}%</div>
          <p className="muted" style={{ marginTop: 0 }}>
            {correct} of {results.length} correct · {pct >= 70 ? 'Passing range. Keep it up! 💪' : 'Below 70%. Review the misses below.'}
          </p>
          <div className="row">
            <button className="btn" onClick={restart}>Try again</button>
            <button className="btn ghost" onClick={() => go('quiz')}>All quizzes</button>
          </div>
        </div>
        {wrong.length > 0 && <h2>Review what you missed</h2>}
        {wrong.map((r) => (
          <div className="card" key={r.id}>
            <div style={{ fontWeight: 700 }}>{r.q}</div>
            <div className="small" style={{ color: 'var(--bad)', marginTop: 6 }}>✗ You said: {r.yours}</div>
            <div className="small" style={{ color: 'var(--good)' }}>✓ Answer: {r.right}</div>
            <div className="small muted" style={{ marginTop: 6 }}>{r.explain}</div>
          </div>
        ))}
      </>
    )
  }

  const q = qs[i]
  const answered = picked !== null
  const choose = (idx) => {
    if (answered) return
    setPicked(idx)
    setResults([...results, { id: q.id, q: q.q, correct: idx === q.answer, yours: q.choices[idx], right: q.choices[q.answer], explain: q.explain }])
  }
  const next = () => {
    if (i + 1 >= qs.length) {
      const correct = results.filter((r) => r.correct).length
      recordQuiz(mode, correct, results.length, results)
      setFinished(true)
    } else {
      setI(i + 1)
      setPicked(null)
    }
    window.scrollTo(0, 0)
  }
  const topic = topicById(q.topic)

  return (
    <>
      <Header title={title} sub={`Question ${i + 1} of ${qs.length}`} />
      <div className="progressbar"><div style={{ width: `${(i / qs.length) * 100}%` }} /></div>
      <span className="pill">{topic.emoji} {topic.title}</span>
      <div className="qtext">{q.q}</div>
      {q.choices.map((c, idx) => {
        let cls = 'choice'
        if (answered && idx === q.answer) cls += ' right'
        else if (answered && idx === picked) cls += ' wrong shake'
        return (
          <button key={idx} className={cls} onClick={() => choose(idx)} disabled={answered}>
            {c}
          </button>
        )
      })}
      {answered && (
        <>
          <div className={'explain ' + (picked === q.answer ? 'right' : 'wrong')}>
            <b>{picked === q.answer ? '✓ Correct!' : '✗ Not quite.'}</b> {q.explain}
          </div>
          <button className="btn block" onClick={next}>{i + 1 >= qs.length ? 'See results' : 'Next →'}</button>
        </>
      )}
    </>
  )
}
