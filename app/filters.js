// The filters the checklist offers: text search, grade, kind and earned status.
import { isEarned } from './state.js';

export function createFilters() {
  return { search: '', grade: 'all', kind: 'all', status: 'all' };
}

export function trophyMatchesFilters(trophy, filters, state) {
  if (filters.grade !== 'all' && trophy.grade !== filters.grade) return false;
  if (filters.kind !== 'all' && trophy.kind !== filters.kind) return false;
  if (filters.status === 'earned' && !isEarned(state, trophy)) return false;
  if (filters.status === 'unearned' && isEarned(state, trophy)) return false;
  if (filters.status === 'missable' && trophy.missable !== true) return false;
  if (filters.search) {
    const haystack = `${trophy.name} ${trophy.description} ${trophy.guide} ${trophy.kind}`.toLowerCase();
    if (!haystack.includes(filters.search.toLowerCase())) return false;
  }
  return true;
}
