// All progress lives in this browser's localStorage. No server, no database.
const KEY = 'pestprep-v1'

const empty = () => ({ topics: {}, missed: {}, games: {}, cardsSeen: {} })

export function load() {
  try {
    return { ...empty(), ...JSON.parse(localStorage.getItem(KEY) || '{}') }
  } catch {
    return empty()
  }
}

function save(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {
    // storage blocked (private mode): the app still works, it just won't remember
  }
}

export function recordQuiz(topicId, correct, total, results) {
  const d = load()
  const pct = Math.round((correct / total) * 100)
  const prev = d.topics[topicId] || { best: 0, attempts: 0 }
  d.topics[topicId] = { best: Math.max(prev.best, pct), attempts: prev.attempts + 1, last: pct }
  for (const r of results) {
    if (r.correct) {
      if (d.missed[r.id]) d.missed[r.id] -= 1
      if (d.missed[r.id] <= 0) delete d.missed[r.id]
    } else {
      d.missed[r.id] = (d.missed[r.id] || 0) + 1
    }
  }
  save(d)
  return d
}

export function recordGame(gameId, score) {
  const d = load()
  const prev = d.games[gameId]
  d.games[gameId] = { best: Math.max(prev?.best || 0, score), plays: (prev?.plays || 0) + 1 }
  save(d)
}

export function markCardSeen(id) {
  const d = load()
  d.cardsSeen[id] = true
  save(d)
}

export function resetAll() {
  try {
    localStorage.removeItem(KEY)
  } catch {}
}
