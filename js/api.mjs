const BASE = "https://api.jikan.moe/v4";

/* ------------------  Jikan (Anime)  ------------------ */
export async function searchAnime(query, { limit = 24 } = {}) {
  const url = new URL(`${BASE}/anime`);
  url.searchParams.set("q", query);
  url.searchParams.set("sfw", "true");
  url.searchParams.set("limit", limit.toString());
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Jikan error: ${res.status} ${res.statusText}`);
  const json = await res.json();
  return Array.isArray(json?.data) ? json.data : [];
}

export async function getAnimeById(malId) {
  const res = await fetch(`${BASE}/anime/${malId}`);
  if (!res.ok) throw new Error(`Jikan error: ${res.status} ${res.statusText}`);
  const json = await res.json();
  return json?.data ?? null;
}

/* ------------------  Kitsu (MANGA)  ------------------ */
const KITSU_BASE = "https://kitsu.io/api/edge";

export async function searchManga(query, { limit = 20 } = {}) {
  const url = new URL(`${KITSU_BASE}/manga`);
  url.searchParams.set("filter[text]", query);
  url.searchParams.set("page[limit]", String(Math.min(limit, 20)));

  const res = await fetch(url.toString(), {
    headers: { Accept: "application/vnd.api+json" },
  });
  if (!res.ok) throw new Error(`Kitsu error: ${res.status} ${res.statusText}`);
  const json = await res.json();
  return Array.isArray(json?.data) ? json.data : [];
}

/** Get single manga by id */
export async function getMangaById(id) {
  const res = await fetch(`${KITSU_BASE}/manga/${id}`, {
    headers: { Accept: "application/vnd.api+json" },
  });
  if (!res.ok) throw new Error(`Kitsu error: ${res.status} ${res.statusText}`);
  const json = await res.json();
  return json?.data ?? null;
}
