// Loads the trophy list the guide is built on: app/data/trophies.json, a local file.
export async function loadTrophies() {
  const response = await fetch('data/trophies.json');
  const document = await response.json();
  return document.trophies;
}
