import { searchAnime, searchManga } from "./api.mjs";
import { qs, renderListWithTemplate, setStatus } from "./utils.mjs";
import { animeCardTemplate, mangaCardTemplate } from "./templates.mjs";
import { addToWatchlist } from "./watchlist.mjs";

const form = qs("#search-form");
const input = qs("#q");
const resultsEl = qs("#results");
const statusEl = qs("#status");
const toggleBtns = document.querySelectorAll("#search-type-toggle button");

let currentType = "anime";

toggleBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    toggleBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentType = btn.dataset.type;
    input.value = "";
    resultsEl.innerHTML = "";
    setStatus(statusEl, `Switched to ${currentType} search.`);
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  setStatus(statusEl, "Loading…");
  resultsEl.innerHTML = "";

  try {
    if (currentType === "anime") {
      const data = await searchAnime(query, { limit: 24 });
      renderListWithTemplate(animeCardTemplate, resultsEl, data);
    } else {
      const data = await searchManga(query, { limit: 20 });
      renderListWithTemplate(mangaCardTemplate, resultsEl, data);
    }
    setStatus(statusEl, `Showing ${currentType} results for “${query}”.`);
    enableAddButtons();
  } catch (err) {
    console.error(err);
    setStatus(statusEl, `Something went wrong: ${err.message}`);
  }
});

function enableAddButtons() {
  resultsEl.querySelectorAll("[data-add-type]").forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.addType;
      const id = btn.dataset.id;
      const title = btn.dataset.title;
      const image = btn.dataset.image;
      const episodes = btn.dataset.episodes || "—";
      const mal_id = type === "manga" ? `manga-${id}` : Number(id);

      addToWatchlist({
        mal_id,
        title,
        image,
        score: btn.dataset.score || "—",
        episodes,
        type
      });

      btn.textContent = "✔ Added";
      btn.disabled = true;
    });
  });
}
