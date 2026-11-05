import React, { useMemo, useState } from 'react'
import Header from '../components/Header.jsx'
import { chemicalMembers } from '../data/topics.js'
import { shuffle } from '../router.js'
import { recordGame } from '../storage.js'

// One bin per family, with the clue that gives it away
const BINS = [
  { fam: 'Chlorinated Hydrocarbons', icon: '🥫', clue: 'The old "forever" ones: Chlordane, DDT, Lindane, Methoxychlor' },
  { fam: 'Organophosphates', icon: '📞', clue: '-phos / -fos / -thion, Diazinon, DDVP' },
  { fam: 'Carbamates', icon: '🚗', clue: 'Sevin & Baygon ("Bay-Seven")' },
  { fam: 'Inorganic Poisons', icon: '🪨', clue: 'Rocks & minerals: boron, silica, DE, old metals' },
  { fam: 'Botanicals', icon: '🌿', clue: 'Plants & spice-rack oils' },
  { fam: 'Pyrethroids', icon: '🔥', clue: '-thrin' },
  { fam: 'Non-Repellents', icon: '🥷', clue: 'Termidor, Phantom, Premise, Altriset' },
  { fam: 'Anti-coagulants', icon: '🩸', clue: 'Rat baits: Warfarin, Bromadiolone, Brodifacoum, Diphacinone' },
]
const ROUNDS = 15

export default function FamilySort() {
  const [game, setGame] = useState(0)
  const deck = useMemo(() => shuffle(chemicalMembers()).slice(0, ROUNDS), [game])
  const [i, setI] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [best, setBest] = useState(0)
  const [picked, setPicked] = useState(null)
  const [showClues, setShowClues] = useState(false)

  if (i >= deck.length) {
    return (
      <>
        <Header title="🧪 Family Sort" />
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="bigscore">{score}/{deck.length}</div>
          <p className="muted">Longest streak: {best} 🔥</p>
          <button className="btn block" onClick={() => { setGame(game + 1); setI(0); setScore(0); setStreak(0); setBest(0); setPicked(null) }}>Play again</button>
        </div>
        <div className="card small">
          <b>Cheat sheet</b>
          {BINS.map((b) => <div key={b.fam}>{b.icon} <b>{b.fam}</b>: {b.clue}</div>)}
        </div>
      </>
    )
  }

  const card = deck[i]
  const answered = picked !== null
  const choose = (fam) => {
    if (answered) return
    setPicked(fam)
    if (fam === card.fam) {
      setScore(score + 1)
      const s = streak + 1
      setStreak(s)
      setBest(Math.max(best, s))
    } else {
      setStreak(0)
    }
  }
  const next = () => {
    if (i + 1 >= deck.length) recordGame('sort', score)
    setPicked(null)
    setI(i + 1)
  }
  const bin = BINS.find((b) => b.fam === card.fam)

  return (
    <>
      <Header title="🧪 Family Sort" sub={`${i + 1} of ${deck.length} · Score ${score} · Streak ${streak} 🔥`} />
      <div className="card" style={{ textAlign: 'center', padding: '28px 16px' }}>
        <div className="small muted">Which family?</div>
        <div style={{ fontSize: 28, fontWeight: 800 }}>{card.m}</div>
      </div>
      <div className="grid2">
        {BINS.map((b) => {
          let style = {}
          if (answered && b.fam === card.fam) style = { outline: '3px solid var(--good)', background: 'var(--good-soft)' }
          else if (answered && b.fam === picked) style = { outline: '3px solid var(--bad)', background: 'var(--bad-soft)' }
          return (
            <button key={b.fam} className="tile" style={{ ...style, minHeight: 84, padding: 10 }} onClick={() => choose(b.fam)}>
              <span style={{ fontSize: 24 }}>{b.icon}</span>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{b.fam}</span>
              {showClues && <span className="small muted" style={{ fontSize: 12 }}>{b.clue}</span>}
            </button>
          )
        })}
      </div>
      {answered ? (
        <div style={{ marginTop: 12 }}>
          <div className={'explain ' + (picked === card.fam ? 'right' : 'wrong')}>
            <b>{picked === card.fam ? '✓ Yes!' : '✗ Nope.'}</b> {card.m} is in <b>{bin.icon} {card.fam}</b>. Clue: {bin.clue}
          </div>
          <button className="btn block" onClick={next}>Next →</button>
        </div>
      ) : (
        <button className="btn block ghost" style={{ marginTop: 12 }} onClick={() => setShowClues(!showClues)}>
          {showClues ? 'Hide clues' : '💡 Show name-ending clues'}
        </button>
      )}
    </>
  )
}
