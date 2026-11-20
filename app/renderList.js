// Renders the trophy checklist: one row per trophy with its official name,
// description and grade, a tick box, and its kind / secret / missable tags.
import { isEarned, isSpoilerHidden, toggleEarned } from './state.js';
import { trophyMatchesFilters } from './filters.js';

export function renderTrophyList(listElement, countElement, trophies, filters, state, onSelect) {
  listElement.replaceChildren();
  const shown = trophies.filter((t) => trophyMatchesFilters(t, filters, state));
  for (const trophy of shown) {
    const item = document.createElement('li');
    if (isEarned(state, trophy)) item.classList.add('earned');
    if (state.selectedName === trophy.name) item.classList.add('selected');
    const hidden = isSpoilerHidden(state, trophy);
    if (hidden) item.classList.add('spoiler-hidden');

    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = isEarned(state, trophy);
    box.setAttribute('aria-label', `Mark ${trophy.name} as earned`);
    box.addEventListener('change', () => {
      toggleEarned(state, trophy.name);
      onSelect(trophy.name, true);
    });
    item.append(box);

    const body = document.createElement('div');
    const name = document.createElement('div');
    name.className = 'trophy-name';
    name.textContent = hidden ? 'Hidden trophy' : trophy.name;
    const description = document.createElement('div');
    description.className = 'trophy-desc';
    description.textContent = hidden ? 'Earn this trophy to reveal its name and description.' : trophy.description;
    body.append(name, description);
    if (!hidden) {
      if (trophy.secret) body.append(makeTag('secret'));
      if (trophy.missable) body.append(makeTag('possibly missable', 'missable'));
      body.append(makeTag(trophy.kind));
    }
    item.append(body);

    const badge = document.createElement('span');
    badge.className = `grade-badge grade-${trophy.grade}`;
    badge.textContent = trophy.grade;
    item.append(badge);

    item.addEventListener('click', (event) => {
      if (event.target === box) return;
      onSelect(trophy.name, false);
    });
    listElement.append(item);
  }
  countElement.textContent = `Showing ${shown.length} of ${trophies.length} trophies`;
}

export function makeTag(text, extraClass) {
  const tag = document.createElement('span');
  tag.className = extraClass ? `tag ${extraClass}` : 'tag';
  tag.textContent = text;
  return tag;
}
