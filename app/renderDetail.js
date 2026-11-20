// Renders the trophy detail panel: the selected trophy's official description,
// its guide in our own words, and the sources beside it.
import { isEarned, isSpoilerHidden } from './state.js';

export function showTrophyDetail(panelElement, trophy, state) {
  panelElement.replaceChildren();
  if (!trophy) {
    const empty = document.createElement('p');
    empty.className = 'detail-empty';
    empty.textContent = 'Click a trophy to open its guide and sources here.';
    panelElement.append(empty);
    return;
  }
  if (isSpoilerHidden(state, trophy)) {
    const heading = document.createElement('h2');
    heading.textContent = 'Hidden trophy';
    const note = document.createElement('p');
    note.textContent = 'This trophy is hidden until you earn it — turn off “Hide spoilers” above, or tick it earned, to reveal its name, description and guide.';
    panelElement.append(heading, note);
    return;
  }
  const heading = document.createElement('h2');
  heading.textContent = trophy.name;
  const badge = document.createElement('span');
  badge.className = `grade-badge grade-${trophy.grade}`;
  badge.textContent = trophy.grade;
  const description = document.createElement('p');
  description.className = 'trophy-desc';
  description.textContent = trophy.description;
  const meta = document.createElement('p');
  meta.textContent = `Kind: ${trophy.kind} · ${trophy.secret ? 'Secret trophy' : 'Shown on PlayStation'} · ${isEarned(state, trophy) ? 'Earned' : 'Not earned yet'}${trophy.missable ? ' · Possibly missable — keep a save before story choices' : ''}`;
  const guideHeading = document.createElement('h3');
  guideHeading.textContent = 'Guide';
  const guide = document.createElement('p');
  guide.textContent = trophy.guide;
  const sourcesHeading = document.createElement('h3');
  sourcesHeading.textContent = 'Sources';
  const sources = document.createElement('ul');
  for (const source of trophy.sources ?? []) {
    const item = document.createElement('li');
    item.textContent = source;
    sources.append(item);
  }
  panelElement.append(heading, badge, description, meta, guideHeading, guide, sourcesHeading, sources);
}
