import { getAnimeImage } from "./utils.mjs";

// Links to anime.html for a future detail view using ?id=<mal_id> (maybe gonna change it latter)
export function animeCardTemplate(anime) {
    const title = anime.title_english || anime.title || "Untitled";
    const img = getAnimeImage(anime);
    const episodes = anime.episodes ?? "—";
    const score = anime.score ?? "—";
    const id = anime.mal_id;

    return `
    <li class="anime-card">
      <a class="anime-link" href="./anime.html?id=${id}" aria-label="Open ${title} details">
        <img src="${img}" alt="${title}" loading="lazy" />
        <h3>${title}</h3>
      </a>
      <p>Episodes: ${episodes} • Score: ${score}</p>
      <button data-add="${id}" aria-label="Add ${title} to list" disabled>
        Add to Watchlist (next week)
      </button>
    </li>
  `;
}
