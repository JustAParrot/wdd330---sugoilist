import { searchAnime } from "./api.mjs";
import { qs, renderListWithTemplate, setStatus } from "./utils.mjs";
import { animeCardTemplate } from "./templates.mjs";

const form = qs("#search-form");
const input = qs("#q");
const resultsEl = qs("#results");
const statusEl = qs("#status");

// Basic submit search flow
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    setStatus(statusEl, "Loading…");
    resultsEl.innerHTML = "";

    try {
        const data = await searchAnime(query, { limit: 24 });
        if (!data.length) {
            setStatus(statusEl, `No results for “${query}” :( --//-- Try another title`);
            return;
        }
        renderListWithTemplate(animeCardTemplate, resultsEl, data);
        setStatus(statusEl, `Showing ${data.length} result(s) for “${query}”.`);
    } catch (err) {
        console.error(err);
        setStatus(statusEl, "Something went wrong fetching results!! D: Please try again");
    }
});
