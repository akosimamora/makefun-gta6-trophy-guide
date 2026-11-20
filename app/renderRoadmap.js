// The roadmap to the platinum, built only from the official descriptions:
// story first, then stranger strands, then activities, then cleanup, then money,
// with 100% completion last and the platinum after everything else.
export const ROADMAP_STAGES = [
  { title: 'Stage 1 — Play the story', text: 'Chapters 1 to 4, the named story missions and the final mission. These trophies cannot be missed: finishing the story earns them.', ids: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
  { title: 'Stage 2 — Stranger strands', text: 'Finish 8 stranger mission strands across Leonida, including the final mission for Andy, Kenton, Billy, Randy and Tyrone.', ids: [22, 23, 24, 25, 26, 27] },
  { title: 'Stage 3 — Activities and skills', text: 'Sample every activity type, then work the skill trophies: 250 stunts, the 42 Shooting Range gold medals, drone races at all 14 locations, 20 race wins, fishing, the arcade, meditation and the hunt for Bret.', ids: [15, 16, 17, 18, 19, 20, 21, 28, 29, 32, 36, 37, 38, 51] },
  { title: 'Stage 4 — Open-world cleanup', text: 'Collectibles and exploration: 3 card sets, WAiNK at 100 locations, 100 vehicles discovered, all of Leonida explored, and the quiet moment trophies.', ids: [30, 31, 35, 42, 44, 45, 46, 47, 49, 50] },
  { title: 'Stage 5 — Money, robberies and property', text: 'Robberies with and without your partner, a bank vault run, and the economy: launder $250,000 in Marked Bills, spend $100,000, buy every garage and register 10 vehicles.', ids: [33, 34, 39, 40, 41, 43, 52, 53, 54, 55] },
  { title: 'Stage 6 — 100% completion, then platinum', text: 'Attain 100% Completion, which counts everything above together — and the platinum, Vice Got a Price!, unlocks with it.', ids: [14, 1] },
];

export function renderRoadmap(listElement, trophies, state, onSelect) {
  const byId = new Map(trophies.map((t) => [t.id, t]));
  listElement.replaceChildren();
  for (const stage of ROADMAP_STAGES) {
    const item = document.createElement('li');
    const title = document.createElement('strong');
    title.textContent = stage.title;
    const text = document.createElement('span');
    text.textContent = ` — ${stage.text} `;
    item.append(title, text);
    for (const id of stage.ids) {
      const trophy = byId.get(id);
      if (!trophy) continue;
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip';
      if (state.earned.has(trophy.name)) chip.classList.add('earned');
      chip.textContent = trophy.name;
      chip.addEventListener('click', () => onSelect(trophy.name, false));
      item.append(chip);
    }
    listElement.append(item);
  }
}
