// Calculate the next predicted cycle date
export function nextCycleDate(lastStartDate, cycleLength = 28) {
  const d = new Date(lastStartDate);
  d.setDate(d.getDate() + Number(cycleLength));
  return d;
}

// Find number of days between two dates
export function daysBetween(a, b) {
  const ms =
    new Date(b).setHours(0, 0, 0, 0) -
    new Date(a).setHours(0, 0, 0, 0);

  return Math.round(ms / (1000 * 60 * 60 * 24));
}

// How far through the current cycle you are (0–100%)
export function cycleProgressPercent(lastStartDate, cycleLength = 28) {
  const today = new Date();
  const daysPassed = daysBetween(lastStartDate, today);
  const percent = (daysPassed / cycleLength) * 100;

  return Math.max(0, Math.min(100, Math.round(percent)));
}

// How many days left until next cycle
export function daysUntilNext(lastStartDate, cycleLength = 28) {
  const next = nextCycleDate(lastStartDate, cycleLength);
  return daysBetween(new Date(), next);
}
