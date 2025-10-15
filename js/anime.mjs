import { getAnimeById, getMangaById } from "./api.mjs";
import { qs, setStatus } from "./utils.mjs";
import { detailTemplate } from "./templates.mjs";
import { addToWatchlist, isInWatchlist } from "./watchlist.mjs";

const detailContainer = qs("#anime-detail");
const titleEl = qs("#anime-title");
const statusEl = qs("#detail-status");
const params = new URLSearchParams(window.location.search);

const id = params.get("id");
const type = params.get("type") || "anime";

if (!id) {
  setStatus(statusEl, "No ID provided >:(");
} else {
  loadDetails(id, type);
}

async function loadDetails(id, type) {
  setStatus(statusEl, "Loading details...");
  try {
    if (type === "anime") {
      const anime = await getAnimeById(id);
      if (!anime) { setStatus(statusEl, "Anime not found D:"); return; }

      titleEl.textContent = `${anime.title_english || anime.title} (Anime)`;
      detailContainer.innerHTML = detailTemplate(anime);

      const btn = qs("[data-watchlist-btn]");
      const already = isInWatchlist(anime.mal_id);
      btn.textContent = already ? "✔ In Watchlist" : "Add to Watchlist";
      btn.disabled = already;

      btn.addEventListener("click", () => {
        addToWatchlist({
          ...anime,
          type: "anime"
        });
        btn.textContent = "✔ In Watchlist";
        btn.disabled = true;
      });

    } else {
      const manga = await getMangaById(id);
      if (!manga) { setStatus(statusEl, "Manga not found D:"); return; }

      const a = manga.attributes;
      titleEl.textContent = `${a.canonicalTitle} (Manga)`;

      const img = a.posterImage?.original || "/images/fallback.png";
      detailContainer.innerHTML = `
        <section class="anime-detail-card">
          <img src="${img}" alt="${a.canonicalTitle}" />
          <div>
            <h2>${a.canonicalTitle}</h2>
            <p><strong>Chapters:</strong> ${a.chapterCount ?? "—"}</p>
            <p>${a.synopsis ?? ""}</p>
            <button data-watchlist-btn>Add to Watchlist</button>
          </div>
        </section>
      `;

      const btn = qs("[data-watchlist-btn]");
      const uniqueId = `manga-${manga.id}`;
      const already = isInWatchlist(uniqueId);
      btn.textContent = already ? "✔ In Watchlist" : "Add to Watchlist";
      btn.disabled = already;

      btn.addEventListener("click", () => {
        addToWatchlist({
          mal_id: uniqueId,
          title: a.canonicalTitle,
          image: a.posterImage?.small || img,
          score: "—",
          episodes: a.chapterCount,
          type: "manga",
        });
        btn.textContent = "✔ In Watchlist";
        btn.disabled = true;
      });
    }

    setStatus(statusEl, "");
  } catch (err) {
    console.error(err);
    setStatus(statusEl, `D: Failed to load details: ${err.message}`);
  }
}
