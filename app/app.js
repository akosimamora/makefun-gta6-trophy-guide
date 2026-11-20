// GTA VI trophy guide and tracker: loads the 55 trophies, renders the checklist,
// the roadmap to the platinum and the trophy detail panel, and wires the filters,
// the spoiler setting and progress export and import.
import { loadTrophies } from './data.js';
import { createTrackerState, saveEarned, saveSpoiler } from './state.js';
import { createFilters } from './filters.js';
import { renderTrophyList } from './renderList.js';
import { showTrophyDetail } from './renderDetail.js';
import { renderRoadmap } from './renderRoadmap.js';
import { renderProgress } from './renderProgress.js';
import { exportProgress, importProgressFile } from './io.js';

const trophies = await loadTrophies();
const state = createTrackerState();
const filters = createFilters();
const listElement = document.getElementById('trophy-list');
const countElement = document.getElementById('list-count');
const detailElement = document.getElementById('detail-panel');
const roadmapElement = document.getElementById('roadmap-stages');
const spoilerToggle = document.getElementById('spoiler-toggle');
spoilerToggle.checked = state.spoilerHidden;

function findTrophy(name) {
  return trophies.find((t) => t.name === name) ?? null;
}

function renderAll() {
  renderProgress(trophies, state);
  renderRoadmap(roadmapElement, trophies, state, selectTrophy);
  renderTrophyList(listElement, countElement, trophies, filters, state, selectTrophy);
  showTrophyDetail(detailElement, findTrophy(state.selectedName), state);
}

function selectTrophy(name, keepDetail) {
  state.selectedName = name;
  renderAll();
  if (!keepDetail) detailElement.scrollIntoView({ block: 'nearest' });
}

document.getElementById('search').addEventListener('input', (event) => {
  filters.search = event.target.value;
  renderTrophyList(listElement, countElement, trophies, filters, state, selectTrophy);
});
document.getElementById('grade-filter').addEventListener('change', (event) => {
  filters.grade = event.target.value;
  renderTrophyList(listElement, countElement, trophies, filters, state, selectTrophy);
});
document.getElementById('kind-filter').addEventListener('change', (event) => {
  filters.kind = event.target.value;
  renderTrophyList(listElement, countElement, trophies, filters, state, selectTrophy);
});
document.getElementById('status-filter').addEventListener('change', (event) => {
  filters.status = event.target.value;
  renderTrophyList(listElement, countElement, trophies, filters, state, selectTrophy);
});
spoilerToggle.addEventListener('change', () => {
  state.spoilerHidden = spoilerToggle.checked;
  saveSpoiler(state);
  renderAll();
});
document.getElementById('export-btn').addEventListener('click', () => exportProgress(state));
document.getElementById('import-input').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    await importProgressFile(file, state, trophies);
    renderAll();
  } catch {
    alert('That file is not a trophy-progress export from this guide.');
  }
  event.target.value = '';
});
document.getElementById('reset-btn').addEventListener('click', () => {
  if (!confirm('Clear all earned ticks?')) return;
  state.earned.clear();
  saveEarned(state);
  renderAll();
});

renderAll();
