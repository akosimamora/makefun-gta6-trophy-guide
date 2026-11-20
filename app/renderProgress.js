// Renders the progress bar and the per-grade counts at the top of the page.
import { isEarned } from './state.js';

export function renderProgress(trophies, state) {
  const earnedCount = trophies.filter((t) => isEarned(state, t)).length;
  document.getElementById('progress-text').textContent = `${earnedCount} of ${trophies.length} earned`;
  document.getElementById('progress-bar').style.width = `${(earnedCount / trophies.length) * 100}%`;
  const byGrade = {};
  for (const trophy of trophies) {
    byGrade[trophy.grade] = byGrade[trophy.grade] ?? { total: 0, earned: 0 };
    byGrade[trophy.grade].total += 1;
    if (isEarned(state, trophy)) byGrade[trophy.grade].earned += 1;
  }
  document.getElementById('grade-counts').textContent = ['platinum', 'gold', 'silver', 'bronze']
    .map((grade) => `${byGrade[grade].earned}/${byGrade[grade].total} ${grade}`)
    .join(' · ');
}
