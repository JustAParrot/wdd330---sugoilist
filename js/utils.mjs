export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}

export function qsa(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
}

export function renderListWithTemplate(templateFn, parent, list = []) {
    parent.innerHTML = "";
    const html = list.map(templateFn).join("");
    parent.insertAdjacentHTML("beforeend", html);
}

// Get images from Jikan
export function getAnimeImage(anime, fallback = "/images/fallback.png") {
    return (
        anime?.images?.jpg?.large_image_url ||
        anime?.images?.jpg?.image_url ||
        anime?.images?.webp?.large_image_url ||
        anime?.images?.webp?.image_url ||
        fallback
    );
}

export function setStatus(el, msg = "") {
    el.textContent = msg;
}
