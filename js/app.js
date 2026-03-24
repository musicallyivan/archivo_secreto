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
const ratingForm = document.getElementById("ratingForm");
const ratingStars = document.getElementById("ratingStars");
const ratingValue = document.getElementById("ratingValue");
const ratingInput = document.getElementById("ratingInput");
const submittedAtInput = document.getElementById("submittedAtInput");
const ratingMessage = document.getElementById("ratingMessage");
const ratingFeedback = document.getElementById("ratingFeedback");
const clearRatingButton = document.getElementById("clearRatingButton");
const saveRatingButton = document.getElementById("saveRatingButton");
const thankYouCard = document.getElementById("thankYouCard");
const thankYouMessage = document.getElementById("thankYouMessage");
const thankYouMeta = document.getElementById("thankYouMeta");
const rateAgainButton = document.getElementById("rateAgainButton");

const SESSION_KEY = "archivo-secreto-session";
const VISITS_KEY = "archivo-secreto-visits";
const LOCK_KEY = "archivo-secreto-lock-until";
const ATTEMPTS_KEY = "archivo-secreto-attempts";
const RATING_KEY = "archivo-secreto-rating";
const MAX_ATTEMPTS = 4;
const LOCK_MINUTES = 1;
let currentTrackIndex = 0;
let selectedRating = 0;

function formatTimestamp(date) {
    return new Intl.DateTimeFormat("es-ES", {
        dateStyle: "long",
        timeStyle: "short"
    }).format(date);
}

function getClosingMessage(rating) {
    if (rating === 5) {
        return "Tu 5/5 deja este rincón en lo más alto del archivo.";
    }

    if (rating === 4) {
        return "Una nota alta siempre deja ganas de seguir ampliando este recuerdo.";
    }

    if (rating === 3) {
        return "Queda registrada una nota equilibrada, con margen para seguir mejorándolo.";
    }

    return "Valoracion recibida. Queda guardada como parte de esta historia.";
}

function showThankYouCard(rating, message, submittedAt) {
    thankYouMessage.textContent = message || getClosingMessage(rating);
    thankYouMeta.textContent = `Enviado el ${submittedAt} con una puntuacion de ${rating}/5.`;
    ratingForm.classList.add("hidden");
    thankYouCard.classList.remove("hidden");
}

function showRatingForm() {
    thankYouCard.classList.add("hidden");
    ratingForm.classList.remove("hidden");
}

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

function updateRatingUi() {
    const stars = ratingStars.querySelectorAll(".star-button");
    stars.forEach((star) => {
        const value = Number(star.dataset.value);
        star.classList.toggle("is-active", value <= selectedRating);
    });

    ratingInput.value = selectedRating ? String(selectedRating) : "";
    ratingValue.textContent = selectedRating ? `${selectedRating}/5 estrellas` : "Sin valorar todavia";
}

function loadSavedRating() {
    const saved = localStorage.getItem(RATING_KEY);
    if (!saved) {
        showRatingForm();
        updateRatingUi();
        return;
    }

    try {
        const parsed = JSON.parse(saved);
        selectedRating = Number(parsed.rating) || 0;
        ratingMessage.value = parsed.message || "";
        if (parsed.submittedAt && selectedRating) {
            showThankYouCard(selectedRating, parsed.message, parsed.submittedAt);
        } else {
            showRatingForm();
        }
    } catch {
        selectedRating = 0;
        ratingMessage.value = "";
        showRatingForm();
    }

    updateRatingUi();
}

async function submitRating() {
    if (!selectedRating) {
        ratingFeedback.textContent = "Selecciona una puntuacion antes de guardar.";
        ratingFeedback.dataset.state = "error";
        return;
    }

    const submittedAt = formatTimestamp(new Date());
    submittedAtInput.value = submittedAt;

    const payload = {
        rating: selectedRating,
        message: ratingMessage.value.trim(),
        submittedAt
    };

    localStorage.setItem(RATING_KEY, JSON.stringify(payload));
    saveRatingButton.disabled = true;
    ratingFeedback.textContent = "Enviando valoracion...";
    ratingFeedback.dataset.state = "";

    try {
        const formData = new FormData(ratingForm);
        const response = await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        });

        if (!response.ok) {
            throw new Error("netlify-submit-failed");
        }

        ratingFeedback.textContent = "Valoracion enviada y guardada en este dispositivo.";
        ratingFeedback.dataset.state = "success";
        showThankYouCard(selectedRating, payload.message, submittedAt);
    } catch {
        ratingFeedback.textContent = "No se pudo enviar a Netlify, pero la valoracion se guardo en este dispositivo.";
        ratingFeedback.dataset.state = "error";
    } finally {
        saveRatingButton.disabled = false;
    }
}

function clearRating() {
    selectedRating = 0;
    submittedAtInput.value = "";
    ratingMessage.value = "";
    localStorage.removeItem(RATING_KEY);
    updateRatingUi();
    ratingFeedback.textContent = "Valoracion borrada.";
    ratingFeedback.dataset.state = "success";
    showRatingForm();
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
    loadSavedRating();

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

ratingStars.addEventListener("click", (event) => {
    const star = event.target.closest(".star-button");
    if (!star) {
        return;
    }

    selectedRating = Number(star.dataset.value);
    star.classList.remove("is-burst");
    void star.offsetWidth;
    star.classList.add("is-burst");
    updateRatingUi();
    ratingFeedback.textContent = "";
    ratingFeedback.dataset.state = "";
});

ratingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    submitRating();
});

clearRatingButton.addEventListener("click", clearRating);
rateAgainButton.addEventListener("click", showRatingForm);

setInterval(updateLoginAvailability, 1000);

bootstrap();
