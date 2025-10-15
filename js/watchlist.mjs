const STORAGE_KEY = "sugoi_watchlist";

export function getWatchlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveWatchlist(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function addToWatchlist(item) {
  const list = getWatchlist();
  if (!list.find(a => String(a.mal_id) === String(item.mal_id))) {
    list.push({
      mal_id: item.mal_id,
      title: item.title_english || item.title,
      image: item.images?.jpg?.image_url || item.images?.webp?.image_url || item.image,
      score: item.score ?? item.score ?? "—",
      episodes: item.episodes ?? item.episodes ?? "—",
      type: item.type || "anime",
    });
    saveWatchlist(list);
  }
}

export function isInWatchlist(id) {
  return getWatchlist().some(a => String(a.mal_id) === String(id));
}

export function removeFromWatchlist(id) {
  const list = getWatchlist().filter(a => String(a.mal_id) !== String(id));
  saveWatchlist(list);
}
