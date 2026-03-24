const content = window.ARCHIVO_CONTENT || { featured: [], photos: [], password: "" };

const loginShell = document.getElementById("loginShell");
const app = document.getElementById("app");
const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("submitButton");
const loginFeedback = document.getElementById("loginFeedback");
const logoutButton = document.getElementById("logoutButton");
const visitCount = document.getElementById("visitCount");
const featuredGrid = document.getElementById("featuredGrid");
const photoGrid = document.getElementById("photoGrid");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");
const backgroundAudio = document.getElementById("backgroundAudio");
const musicStatus = document.getElementById("musicStatus");
const toggleMusicButton = document.getElementById("toggleMusicButton");
const nextTrackButton = document.getElementById("nextTrackButton");

const SESSION_KEY = "archivo-secreto-session";
const VISITS_KEY = "archivo-secreto-visits";
const LOCK_KEY = "archivo-secreto-lock-until";
const ATTEMPTS_KEY = "archivo-secreto-attempts";
const MAX_ATTEMPTS = 4;
const LOCK_MINUTES = 1;
let currentTrackIndex = 0;

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function setFeedback(message, state = "") {
    loginFeedback.textContent = message;
    loginFeedback.dataset.state = state;
}

function getLockUntil() {
    return Number(localStorage.getItem(LOCK_KEY) || 0);
}

function isLocked() {
    return Date.now() < getLockUntil();
}

function getRemainingLockSeconds() {
    return Math.max(0, Math.ceil((getLockUntil() - Date.now()) / 1000));
}

function updateLoginAvailability() {
    if (!submitButton) {
        return;
    }

    const locked = isLocked();
    submitButton.disabled = locked;

    if (locked) {
        setFeedback(`Acceso bloqueado temporalmente. Espera ${getRemainingLockSeconds()}s.`, "error");
    }
}

function registerVisit() {
    const visits = Number(localStorage.getItem(VISITS_KEY) || 0) + 1;
    localStorage.setItem(VISITS_KEY, String(visits));
    visitCount.textContent = String(visits);
}

function renderFeatured(items) {
    featuredGrid.innerHTML = items.map((item) => {
        const title = escapeHtml(item.title);
        const description = escapeHtml(item.description || "");
        const file = escapeHtml(item.file);

        return `
            <article class="media-card">
                <figure class="media-frame">
                    <video controls preload="metadata" playsinline src="${file}"></video>
                </figure>
                <div class="media-body">
                    <p class="media-meta">Video</p>
                    <h4>${title}</h4>
                    <p class="media-description">${description}</p>
                </div>
            </article>
        `;
    }).join("");
}

function renderPhotos(items) {
    photoGrid.innerHTML = items.map((item, index) => `
        <article class="photo-card" data-index="${index}" tabindex="0" role="button" aria-label="Abrir ${escapeHtml(item.title)}">
            <figure>
                <img src="${escapeHtml(item.file)}" alt="${escapeHtml(item.title)}">
                <figcaption class="photo-caption">${escapeHtml(item.title)}</figcaption>
            </figure>
        </article>
    `).join("");
}

function openLightbox(index) {
    const photo = content.photos[index];
    if (!photo) {
        return;
    }

    lightboxImage.src = photo.file;
    lightboxImage.alt = photo.title;
    lightbox.showModal();
}

function closeLightboxModal() {
    if (lightbox.open) {
        lightbox.close();
    }
}

function updateMusicUi() {
    const tracks = content.backgroundTracks || [];
    const activeTrack = tracks[currentTrackIndex];

    if (!tracks.length || !activeTrack) {
        musicStatus.textContent = "Sin pistas";
        toggleMusicButton.disabled = true;
        nextTrackButton.disabled = true;
        return;
    }

    musicStatus.textContent = backgroundAudio.paused ? `${activeTrack.title} en pausa` : activeTrack.title;
    toggleMusicButton.textContent = backgroundAudio.paused ? "Reproducir musica" : "Pausar musica";
}

function setTrack(index) {
    const tracks = content.backgroundTracks || [];
    if (!tracks.length) {
        updateMusicUi();
        return;
    }

    currentTrackIndex = (index + tracks.length) % tracks.length;
    backgroundAudio.src = tracks[currentTrackIndex].file;
    updateMusicUi();
}

async function playBackgroundMusic() {
    const tracks = content.backgroundTracks || [];
    if (!tracks.length) {
        updateMusicUi();
        return;
    }

    if (!backgroundAudio.src) {
        setTrack(currentTrackIndex);
    }

    try {
        await backgroundAudio.play();
    } catch {
        musicStatus.textContent = "Pulsa reproducir para iniciar";
    }

    updateMusicUi();
}

function pauseBackgroundMusic() {
    backgroundAudio.pause();
    updateMusicUi();
}

function unlockApp() {
    loginShell.classList.add("hidden");
    app.classList.remove("hidden");
    localStorage.setItem(SESSION_KEY, "open");
    registerVisit();
    playBackgroundMusic();
}

function lockApp() {
    localStorage.removeItem(SESSION_KEY);
    loginShell.classList.remove("hidden");
    app.classList.add("hidden");
    passwordInput.value = "";
    setFeedback("");
    pauseBackgroundMusic();
}

function handleLogin(password) {
    if (isLocked()) {
        updateLoginAvailability();
        return;
    }

    if (password === content.password) {
        localStorage.removeItem(ATTEMPTS_KEY);
        localStorage.removeItem(LOCK_KEY);
        setFeedback("Acceso concedido.", "success");
        unlockApp();
        return;
    }

    const attempts = Number(localStorage.getItem(ATTEMPTS_KEY) || 0) + 1;
    localStorage.setItem(ATTEMPTS_KEY, String(attempts));

    if (attempts >= MAX_ATTEMPTS) {
        const lockUntil = Date.now() + LOCK_MINUTES * 60 * 1000;
        localStorage.setItem(LOCK_KEY, String(lockUntil));
        localStorage.removeItem(ATTEMPTS_KEY);
        updateLoginAvailability();
        return;
    }

    const remaining = MAX_ATTEMPTS - attempts;
    setFeedback(`Contraseña incorrecta. Quedan ${remaining} intento(s).`, "error");
}

function bootstrap() {
    renderFeatured(content.featured);
    renderPhotos(content.photos);
    visitCount.textContent = localStorage.getItem(VISITS_KEY) || "0";
    setTrack(0);
    updateLoginAvailability();

    if (localStorage.getItem(SESSION_KEY) === "open") {
        unlockApp();
    }
}

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleLogin(passwordInput.value.trim());
});

logoutButton.addEventListener("click", lockApp);

photoGrid.addEventListener("click", (event) => {
    const card = event.target.closest(".photo-card");
    if (!card) {
        return;
    }

    openLightbox(Number(card.dataset.index));
});

photoGrid.addEventListener("keydown", (event) => {
    const card = event.target.closest(".photo-card");
    if (!card || (event.key !== "Enter" && event.key !== " ")) {
        return;
    }

    event.preventDefault();
    openLightbox(Number(card.dataset.index));
});

closeLightbox.addEventListener("click", closeLightboxModal);
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightboxModal();
    }
});

toggleMusicButton.addEventListener("click", () => {
    if (backgroundAudio.paused) {
        playBackgroundMusic();
        return;
    }

    pauseBackgroundMusic();
});

nextTrackButton.addEventListener("click", async () => {
    setTrack(currentTrackIndex + 1);
    await playBackgroundMusic();
});

backgroundAudio.addEventListener("ended", async () => {
    setTrack(currentTrackIndex + 1);
    await playBackgroundMusic();
});

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeLightboxModal();
    }
});

setInterval(updateLoginAvailability, 1000);

bootstrap();
