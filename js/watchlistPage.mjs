import { getWatchlist, removeFromWatchlist } from "./watchlist.mjs";
import { qs } from "./utils.mjs";

const listEl = qs("#watchlist-container");
const statusEl = qs("#watchlist-status");

function renderWatchlist() {
  const list = getWatchlist();
  listEl.innerHTML = "";

  if (!list.length) {
    statusEl.textContent = "Your watchlist is empty! D:";
    return;
  }

  statusEl.textContent = `You have ${list.length} anime/manga in your watchlist.`;

  list.forEach(item => {
    const isManga = item.type === "manga";
    const href = `./anime.html?id=${isManga ? String(item.mal_id).replace("manga-", "") : item.mal_id}&type=${isManga ? "manga" : "anime"}`;

    const li = document.createElement("li");
    li.innerHTML = `
      <a href="${href}">
        <img src="${item.image}" alt="${item.title}" />
        <h3>${item.title}</h3>
      </a>
      <p>${isManga ? "Chapters" : "Episodes"}: ${item.episodes ?? "—"} • Score: ${item.score ?? "—"}</p>
      <p style="opacity:.8;">Type: ${isManga ? "Manga" : "Anime"}</p>
      <button data-remove="${item.mal_id}">Remove</button>
    `;
    listEl.appendChild(li);
  });

  listEl.querySelectorAll("[data-remove]").forEach(btn => {
    btn.addEventListener("click", () => {
      removeFromWatchlist(btn.getAttribute("data-remove"));
      renderWatchlist();
    });
  });
}

renderWatchlist();
