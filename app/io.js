// Export and import of tracker progress: a JSON file of the earned trophy names,
// so progress can move between browsers or be kept as a backup.
import { saveEarned } from './state.js';

export function exportProgress(state) {
  const anchor = document.createElement('a');
  anchor.href = URL.createObjectURL(
    new Blob([JSON.stringify({ game: 'Grand Theft Auto VI', earned: [...state.earned] }, null, 2)], { type: 'application/json' }),
  );
  anchor.download = 'gta6-trophy-progress.json';
  anchor.click();
  URL.revokeObjectURL(anchor.href);
}

export async function importProgressFile(file, state, trophies) {
  const text = await file.text();
  const parsed = JSON.parse(text);
  const names = Array.isArray(parsed) ? parsed : parsed.earned;
  if (!Array.isArray(names)) throw new Error('Progress file holds no earned list.');
  const known = new Set(trophies.map((t) => t.name));
  state.earned = new Set(names.filter((name) => known.has(name)));
  saveEarned(state);
}
