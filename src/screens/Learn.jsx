import React from 'react'
import Header, { Tile } from '../components/Header.jsx'
import { TOPICS } from '../data/topics.js'
import { go } from '../router.js'
import { WordChips } from './TopicPage.jsx'

export default function Learn() {
  return (
    <>
      <Header title="Learn" sub="Pick a topic. Every section has an 'in plain words' explanation." back={false} />
      {TOPICS.map((t) => (
        <Tile key={t.id} icon={t.emoji} color={t.color} title={t.title} desc={t.intro.split('. ')[0] + '.'} onClick={() => go('learn/' + t.id)} />
      ))}
      <button className="btn block ghost" style={{ margin: '8px 0 14px' }} onClick={() => go('cards/all')}>
        🃏 Shuffle ALL flashcards
      </button>
      <h2>All the hard words</h2>
      <WordChips />
    </>
  )
}
