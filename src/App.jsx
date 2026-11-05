import React from 'react'
import { useRoute, go } from './router.js'
import Home from './screens/Home.jsx'
import Learn from './screens/Learn.jsx'
import TopicPage from './screens/TopicPage.jsx'
import Flashcards from './screens/Flashcards.jsx'
import QuizHome from './screens/QuizHome.jsx'
import Quiz from './screens/Quiz.jsx'
import Play from './screens/Play.jsx'
import Progress from './screens/Progress.jsx'
import KitchenLab from './interactive/KitchenLab.jsx'
import SprayerBuilder from './interactive/SprayerBuilder.jsx'
import LabelExplorer from './interactive/LabelExplorer.jsx'
import PPEDressUp from './interactive/PPEDressUp.jsx'
import FamilySort from './interactive/FamilySort.jsx'
import LD50Golf from './interactive/LD50Golf.jsx'
import StepSorter from './interactive/StepSorter.jsx'
import PumpPicker from './interactive/PumpPicker.jsx'
import BugLab from './interactive/BugLab.jsx'
import LabelLaw from './interactive/LabelLaw.jsx'

const TABS = [
  { id: '', label: 'Home', icon: '🏠' },
  { id: 'learn', label: 'Learn', icon: '📚' },
  { id: 'play', label: 'Hands-on', icon: '🎮' },
  { id: 'quiz', label: 'Quiz', icon: '✅' },
  { id: 'progress', label: 'Progress', icon: '📈' },
]

const GAMES = {
  lab: KitchenLab,
  sprayer: SprayerBuilder,
  label: LabelExplorer,
  ppe: PPEDressUp,
  sort: FamilySort,
  golf: LD50Golf,
  steps: StepSorter,
  pumps: PumpPicker,
  buglab: BugLab,
  law: LabelLaw,
}

function screenFor(route) {
  const [a, b] = route
  if (!a) return <Home />
  if (a === 'learn' && b) return <TopicPage topicId={b} />
  if (a === 'learn') return <Learn />
  if (a === 'cards') return <Flashcards topicId={b || 'all'} />
  if (a === 'quiz' && b) return <Quiz mode={b} key={route.join('/')} />
  if (a === 'quiz') return <QuizHome />
  if (a === 'play' && b && GAMES[b]) {
    const G = GAMES[b]
    return <G />
  }
  if (a === 'play') return <Play />
  if (a === 'progress') return <Progress />
  return <Home />
}

export default function App() {
  const route = useRoute()
  const tab = route[0] === 'cards' ? 'learn' : route[0] || ''
  return (
    <div className="app">
      <main className="main">{screenFor(route)}</main>
      <nav className="tabbar" aria-label="Main">
        {TABS.map((t) => (
          <button key={t.id} className={'tab' + (tab === t.id ? ' on' : '')} onClick={() => go(t.id)}>
            <span className="tab-ico" aria-hidden>{t.icon}</span>
            <span className="tab-lbl">{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
