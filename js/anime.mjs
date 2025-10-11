import { getAnimeById } from "./api.mjs";
import { qs, setStatus } from "./utils.mjs";
import { detailTemplate } from "./templates.mjs";
import { addToWatchlist, isInWatchlist } from "./watchlist.mjs";

const detailContainer = qs("#anime-detail");
const titleEl = qs("#anime-title");
const statusEl = qs("#detail-status");
const params = new URLSearchParams(window.location.search);
const animeId = params.get("id");

if (!animeId) {
  setStatus(statusEl, "No anime ID provided.");
} else {
  loadDetails(animeId);
}

async function loadDetails(id) {
  setStatus(statusEl, "Loading details...");
  try {
    const anime = await getAnimeById(id);
    if (!anime) {
      setStatus(statusEl, "Anime not found.");
      return;
    }
    titleEl.textContent = anime.title_english || anime.title || "Untitled";
    detailContainer.innerHTML = detailTemplate(anime);

    // Watchlist button
    const btn = qs("[data-watchlist-btn]");
    const already = isInWatchlist(anime.mal_id);
    btn.textContent = already ? "✔ In Watchlist" : "Add to Watchlist";
    btn.disabled = already;

    btn.addEventListener("click", () => {
      addToWatchlist(anime);
      btn.textContent = "✔ In Watchlist";
      btn.disabled = true;
    });

    setStatus(statusEl, "");
  } catch (err) {
    console.error(err);
    setStatus(statusEl, "Failed to load details.");
  }
}
