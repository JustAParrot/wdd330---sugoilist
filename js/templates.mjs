import { getAnimeImage } from "./utils.mjs";

/** ANIME card (Jikan) */
export function animeCardTemplate(anime) {
  const title = anime.title_english || anime.title || "Untitled";
  const img = getAnimeImage(anime);
  const episodes = anime.episodes ?? "—";
  const score = anime.score ?? "—";
  const id = anime.mal_id;

  return `
    <li class="anime-card">
      <a class="anime-link" href="./anime.html?id=${id}&type=anime" aria-label="Open ${title} details">
        <img src="${img}" alt="${title}" loading="lazy" />
        <h3>${title}</h3>
      </a>
      <p>Episodes: ${episodes} • Score: ${score}</p>
      <button
        data-add-type="anime"
        data-id="${id}"
        data-title="${escapeHtml(title)}"
        data-image="${img}"
        data-score="${score}"
        data-episodes="${episodes}"
      >Add to Watchlist</button>
    </li>
  `;
}

/** MANGA card (Kitsu) */
export function mangaCardTemplate(manga) {
  const a = manga.attributes;
  const title = a.canonicalTitle;
  const img = a.posterImage?.small || "/images/fallback.png";
  const chapters = a.chapterCount ?? "—";

  return `
    <li class="anime-card">
      <a class="anime-link" href="./anime.html?id=${manga.id}&type=manga" aria-label="Open ${title} details">
        <img src="${img}" alt="${title}" loading="lazy" />
        <h3>${title}</h3>
      </a>
      <p>Chapters: ${chapters}</p>
      <button
        data-add-type="manga"
        data-id="${manga.id}"
        data-title="${escapeHtml(title)}"
        data-image="${img}"
        data-episodes="${chapters}"
      >Add to Watchlist</button>
    </li>
  `;
}

/* tiny helper to avoid breaking HTML with quotes */
function escapeHtml(str = "") {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
