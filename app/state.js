// Tracker state: which trophies are earned and whether spoilers are hidden.
// Earned ticks and the spoiler choice live in localStorage, so they survive a reload.
export const EARNED_KEY = 'gta6-trophy-guide-earned-v1';
export const SPOILER_KEY = 'gta6-trophy-guide-spoiler-v1';

export function createTrackerState() {
  const state = {
    earned: new Set(readStoredNames(EARNED_KEY)),
    spoilerHidden: readStoredFlag(SPOILER_KEY, true),
    selectedName: null,
  };
  return state;
}

export function readStoredNames(key) {
  try {
    return JSON.parse(localStorage.getItem(key) ?? '[]');
  } catch {
    return [];
  }
}

export function readStoredFlag(key, fallback) {
  const raw = localStorage.getItem(key);
  if (raw === null) return fallback;
  return raw === 'true';
}

export function saveEarned(state) {
  localStorage.setItem(EARNED_KEY, JSON.stringify([...state.earned]));
}

export function saveSpoiler(state) {
  localStorage.setItem(SPOILER_KEY, String(state.spoilerHidden));
}

export function toggleEarned(state, name) {
  if (state.earned.has(name)) state.earned.delete(name);
  else state.earned.add(name);
  saveEarned(state);
}

export function isEarned(state, trophy) {
  return state.earned.has(trophy.name);
}

// A trophy is spoiler-hidden when the setting is on, it is secret or story, and it is not earned yet.
export function isSpoilerHidden(state, trophy) {
  if (!state.spoilerHidden) return false;
  if (isEarned(state, trophy)) return false;
  return trophy.secret === true || trophy.kind === 'story';
}
