const BASE = "https://api.jikan.moe/v4";

// Jikan is a free API... I keep requests SFW and limits to 24 for simplicity 
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

// Details by ID W06
export async function getAnimeById(malId) {
    const res = await fetch(`${BASE}/anime/${malId}`);
    if (!res.ok) throw new Error(`Jikan error: ${res.status} ${res.statusText}`);
    const json = await res.json();
    return json?.data ?? null;
}
