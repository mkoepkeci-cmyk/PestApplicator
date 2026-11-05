import React from 'react'
import Header, { Tile } from '../components/Header.jsx'
import { go } from '../router.js'
import { load } from '../storage.js'

export const ACTIVITIES = [
  { id: 'lab', icon: '🥛', color: '#1f8fbf', title: 'Kitchen Lab', desc: 'Pour each formulation into water. Watch it dissolve, settle or turn milky.' },
  { id: 'sprayer', icon: '🔧', color: '#5b6b7a', title: 'Sprayer Builder', desc: 'Tap every part of a power sprayer, then build it in flow order.' },
  { id: 'pumps', icon: '⚙️', color: '#5b6b7a', title: 'Pump Picker', desc: 'Pick the right pump and agitator for the job.' },
  { id: 'buglab', icon: '🐜', color: '#8a6d1f', title: 'Bug Lab', desc: 'Light up legs, wings, eyes and body parts. Insect vs spider vs tick and more.' },
  { id: 'label', icon: '🏷️', color: '#d68a1f', title: 'Label Explorer', desc: 'Tap a real-looking label apart, then find sections fast.' },
  { id: 'law', icon: '⚖️', color: '#d68a1f', title: 'Label Law', desc: 'Legal or not? Real job situations under CA Section 6000.' },
  { id: 'ppe', icon: '🦺', color: '#2f8f4e', title: 'PPE Dress-Up', desc: 'Suit up the applicator and block every route of entry.' },
  { id: 'sort', icon: '🧪', color: '#7b4fd6', title: 'Family Sort', desc: 'Sort chemical names into their families. Beat your streak.' },
  { id: 'golf', icon: '⛳', color: '#c0392b', title: 'LD50 Golf', desc: 'Lowest number wins. Toxicity and signal words.' },
  { id: 'steps', icon: '🔢', color: '#c2477e', title: 'Step Sorter', desc: 'Put triple rinse, spill cleanup, IPM and school posting in order.' },
]

export default function Play() {
  const g = load().games
  return (
    <>
      <Header title="Hands-on" sub="See how it works, not just what it's called" back={false} />
      {ACTIVITIES.map((a) => (
        <Tile key={a.id} icon={a.icon} color={a.color} title={a.title}
          desc={a.desc + (g[a.id] ? ` · Best: ${g[a.id].best}` : '')}
          onClick={() => go('play/' + a.id)} />
      ))}
    </>
  )
}
