// src/utils/getPhase.js
export function daysBetween(date1, date2) {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24))
}

export function getPhase(lastStartDate, cycleLength = 28) {
  const daysPassed = daysBetween(lastStartDate, new Date())
  const pct = daysPassed / cycleLength
  if (pct < 0.15) return "menstrual"
  if (pct < 0.5) return "follicular"
  if (pct < 0.65) return "ovulatory"
  return "luteal"
}
