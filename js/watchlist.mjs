const STORAGE_KEY = "sugoi_watchlist";

//Get current list from localStorage
export function getWatchlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Save list to local
function saveWatchlist(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// Add anime to watchlist (if not already there ofc)
export function addToWatchlist(anime) {
  const list = getWatchlist();
  if (!list.find(a => a.mal_id === anime.mal_id)) {
    list.push({
      mal_id: anime.mal_id,
      title: anime.title_english || anime.title,
      image: anime.images?.jpg?.image_url || anime.images?.webp?.image_url,
      score: anime.score,
      episodes: anime.episodes,
    });
    saveWatchlist(list);
  }
}

export function isInWatchlist(id) {
  return getWatchlist().some(a => a.mal_id == id);
}

//Remove anime by id 
export function removeFromWatchlist(id) {
  const list = getWatchlist().filter(a => a.mal_id != id);
  saveWatchlist(list);
}
