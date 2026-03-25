const content = window.ARCHIVO_CONTENT || { profiles: {}, password: "" };

const loginShell = document.getElementById("loginShell");
const introScreen = document.getElementById("introScreen");
const introEyebrow = document.getElementById("introEyebrow");
const introTitle = document.getElementById("introTitle");
const introDescription = document.getElementById("introDescription");
const enterProfileButton = document.getElementById("enterProfileButton");
const app = document.getElementById("app");
const loginForm = document.getElementById("loginForm");
const profileStep = document.getElementById("profileStep");
const backToPasswordButton = document.getElementById("backToPasswordButton");
const profileButtons = document.querySelectorAll(".profile-button");
const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("submitButton");
const loginFeedback = document.getElementById("loginFeedback");
const logoutButton = document.getElementById("logoutButton");
const visitCount = document.getElementById("visitCount");
const heroEyebrow = document.getElementById("heroEyebrow");
const heroTitle = document.getElementById("heroTitle");
const heroDescription = document.getElementById("heroDescription");
const statusValue = document.getElementById("statusValue");
const profileValue = document.getElementById("profileValue");
const libraryTitle = document.getElementById("libraryTitle");
const galleryTitle = document.getElementById("galleryTitle");
const lettersTitle = document.getElementById("lettersTitle");
const timelineTitle = document.getElementById("timelineTitle");
const capsuleTitle = document.getElementById("capsuleTitle");
const notesTitle = document.getElementById("notesTitle");
const notesList = document.getElementById("notesList");
const ratingTitle = document.getElementById("ratingTitle");
const featuredGrid = document.getElementById("featuredGrid");
const photoGrid = document.getElementById("photoGrid");
const lettersGrid = document.getElementById("lettersGrid");
const timelineList = document.getElementById("timelineList");
const capsuleGrid = document.getElementById("capsuleGrid");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");
const surpriseModal = document.getElementById("surpriseModal");
const closeSurpriseModal = document.getElementById("closeSurpriseModal");
const surpriseEyebrow = document.getElementById("surpriseEyebrow");
const surpriseModalTitle = document.getElementById("surpriseModalTitle");
const surpriseModalBody = document.getElementById("surpriseModalBody");
const backgroundAudio = document.getElementById("backgroundAudio");
const musicStatus = document.getElementById("musicStatus");
const surpriseStatus = document.getElementById("surpriseStatus");
const toggleMusicButton = document.getElementById("toggleMusicButton");
const nextTrackButton = document.getElementById("nextTrackButton");
const surpriseButton = document.getElementById("surpriseButton");
const ratingForm = document.getElementById("ratingForm");
const ratingStars = document.getElementById("ratingStars");
const ratingValue = document.getElementById("ratingValue");
const profileInput = document.getElementById("profileInput");
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
const securitySummary = document.getElementById("securitySummary");
const securityNextStep = document.getElementById("securityNextStep");

const SESSION_KEY = "archivo-secreto-session";
const PROFILE_KEY = "archivo-secreto-profile";
const VISITS_KEY = "archivo-secreto-visits";
const LOCK_KEY = "archivo-secreto-lock-until";
const ATTEMPTS_KEY = "archivo-secreto-attempts";
const RATING_KEY = "archivo-secreto-rating";
const MAX_ATTEMPTS = 4;
const LOCK_MINUTES = 1;
let currentTrackIndex = 0;
let selectedRating = 0;
let activeProfileName = "";
let lastSurpriseIndex = -1;

function getActiveProfile() {
    return content.profiles?.[activeProfileName] || null;
}

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
    thankYouMeta.textContent = `Enviado el ${submittedAt} por ${activeProfileName} con una puntuacion de ${rating}/5.`;
    ratingForm.classList.add("hidden");
    thankYouCard.classList.remove("hidden");
}

function showRatingForm() {
    thankYouCard.classList.add("hidden");
    ratingForm.classList.remove("hidden");
    ratingFeedback.textContent = "";
    ratingFeedback.dataset.state = "";
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
    const visitsByProfile = JSON.parse(localStorage.getItem(VISITS_KEY) || "{}");
    const visits = Number(visitsByProfile[activeProfileName] || 0) + 1;
    visitsByProfile[activeProfileName] = visits;
    localStorage.setItem(VISITS_KEY, JSON.stringify(visitsByProfile));
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

function renderNotes(items) {
    notesList.innerHTML = items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderTimeline(items) {
    timelineList.innerHTML = items.map((item) => `
        <article class="timeline-item">
            <p class="timeline-date">${escapeHtml(item.date || "")}</p>
            <h4>${escapeHtml(item.title || "")}</h4>
            <p class="timeline-body">${escapeHtml(item.body || "")}</p>
        </article>
    `).join("");
}

function renderCapsule(items) {
    capsuleGrid.innerHTML = items.map((item) => `
        <article class="capsule-card">
            <p class="capsule-when">${escapeHtml(item.when || "")}</p>
            <h4>${escapeHtml(item.title || "")}</h4>
            <p class="capsule-body">${escapeHtml(item.body || "")}</p>
        </article>
    `).join("");
}

function renderLetters(items) {
    lettersGrid.innerHTML = items.map((item) => `
        <article class="letter-card">
            <div class="letter-top">
                <h4 class="letter-title">${escapeHtml(item.title)}</h4>
                <span class="letter-tag">${escapeHtml(item.tag || "Carta")}</span>
            </div>
            <p class="letter-body">${escapeHtml(item.body || "")}</p>
            <p class="letter-signature">${escapeHtml(item.signature || "")}</p>
        </article>
    `).join("");
}

function openLightbox(index) {
    const photo = getActiveProfile()?.photos?.[index];
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

function closeSurprise() {
    if (surpriseModal.open) {
        surpriseModal.close();
    }
}

function updateMusicUi() {
    const tracks = getActiveProfile()?.backgroundTracks || [];
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

function updateSurpriseStatus() {
    const profile = getActiveProfile();
    const surprises = profile?.surprises || [];
    surpriseStatus.textContent = surprises.length ? profile?.surpriseLabel || "Lista" : "Sin sorpresas";
    surpriseButton.disabled = !surprises.length;
}

function showRandomSurprise() {
    const surprises = getActiveProfile()?.surprises || [];
    if (!surprises.length) {
        return;
    }

    let nextIndex = Math.floor(Math.random() * surprises.length);
    if (surprises.length > 1 && nextIndex === lastSurpriseIndex) {
        nextIndex = (nextIndex + 1) % surprises.length;
    }

    lastSurpriseIndex = nextIndex;
    const surprise = surprises[nextIndex];
    surpriseEyebrow.textContent = surprise.eyebrow || "Sorpresa";
    surpriseModalTitle.textContent = surprise.title || "Momento sorpresa";
    surpriseModalBody.textContent = surprise.body || "";
    surpriseStatus.textContent = `Ultima sorpresa #${nextIndex + 1}`;
    surpriseModal.showModal();
}

function setTrack(index) {
    const tracks = getActiveProfile()?.backgroundTracks || [];
    if (!tracks.length) {
        updateMusicUi();
        return;
    }

    currentTrackIndex = (index + tracks.length) % tracks.length;
    backgroundAudio.src = tracks[currentTrackIndex].file;
    updateMusicUi();
}

async function playBackgroundMusic() {
    const tracks = getActiveProfile()?.backgroundTracks || [];
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
    const ratingsByProfile = JSON.parse(localStorage.getItem(RATING_KEY) || "{}");
    const saved = ratingsByProfile[activeProfileName];
    if (!saved) {
        showRatingForm();
        ratingMessage.value = "";
        selectedRating = 0;
        submittedAtInput.value = "";
        updateRatingUi();
        return;
    }

    try {
        const parsed = typeof saved === "string" ? JSON.parse(saved) : saved;
        selectedRating = Number(parsed.rating) || 0;
        ratingMessage.value = parsed.message || "";
        submittedAtInput.value = parsed.submittedAt || "";
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
        profile: activeProfileName,
        rating: selectedRating,
        message: ratingMessage.value.trim(),
        submittedAt
    };

    const ratingsByProfile = JSON.parse(localStorage.getItem(RATING_KEY) || "{}");
    ratingsByProfile[activeProfileName] = payload;
    localStorage.setItem(RATING_KEY, JSON.stringify(ratingsByProfile));
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
    const ratingsByProfile = JSON.parse(localStorage.getItem(RATING_KEY) || "{}");
    delete ratingsByProfile[activeProfileName];
    localStorage.setItem(RATING_KEY, JSON.stringify(ratingsByProfile));
    updateRatingUi();
    ratingFeedback.textContent = "Valoracion borrada.";
    ratingFeedback.dataset.state = "success";
    showRatingForm();
}

function showProfileStep() {
    loginForm.classList.add("hidden");
    profileStep.classList.remove("hidden");
    setFeedback("");
}

function showPasswordStep() {
    profileStep.classList.add("hidden");
    loginForm.classList.remove("hidden");
    introScreen.classList.add("hidden");
    app.classList.add("hidden");
}

function showIntroScreen() {
    loginShell.classList.add("hidden");
    introScreen.classList.remove("hidden");
    app.classList.add("hidden");
}

function showApp() {
    loginShell.classList.add("hidden");
    introScreen.classList.add("hidden");
    app.classList.remove("hidden");
}

function applyProfile(profileName) {
    const profile = content.profiles?.[profileName];
    if (!profile) {
        return;
    }

    activeProfileName = profileName;
    currentTrackIndex = 0;
    document.body.dataset.profile = profile.theme || "";
    introEyebrow.textContent = profile.introEyebrow || `Entrada de ${profileName}`;
    introTitle.textContent = profile.introTitle || "Una portada hecha para ti.";
    introDescription.textContent = profile.introDescription || "Tu version arranca con su propia introduccion.";
    enterProfileButton.textContent = profile.introButton || "Entrar a mi archivo";
    heroEyebrow.textContent = profile.eyebrow;
    heroTitle.textContent = profile.heroTitle;
    heroDescription.textContent = profile.heroDescription;
    statusValue.textContent = profile.statusLabel;
    profileValue.textContent = profileName;
    libraryTitle.textContent = profile.libraryTitle;
    galleryTitle.textContent = profile.galleryTitle;
    lettersTitle.textContent = profile.lettersTitle || "Mensajes solo para ti";
    timelineTitle.textContent = profile.timelineTitle || "Recorrido de recuerdos";
    capsuleTitle.textContent = profile.capsuleTitle || "Mensajes para otro momento";
    notesTitle.textContent = profile.notesTitle;
    ratingTitle.textContent = profile.ratingTitle;
    securitySummary.textContent = profile.securitySummary || "La proteccion actual es solo de navegador.";
    securityNextStep.textContent = profile.securityNextStep || "Para privacidad real necesitas backend o una capa privada del hosting.";
    profileInput.value = profileName;
    renderFeatured(profile.featured || []);
    renderPhotos(profile.photos || []);
    renderLetters(profile.letters || []);
    renderTimeline(profile.timeline || []);
    renderCapsule(profile.capsule || []);
    renderNotes(profile.notes || []);
    const visitsByProfile = JSON.parse(localStorage.getItem(VISITS_KEY) || "{}");
    visitCount.textContent = String(visitsByProfile[profileName] || 0);
    lastSurpriseIndex = -1;
    setTrack(0);
    updateSurpriseStatus();
    loadSavedRating();
}

function unlockApp() {
    showApp();
    localStorage.setItem(SESSION_KEY, "open");
    localStorage.setItem(PROFILE_KEY, activeProfileName);
    registerVisit();
    playBackgroundMusic();
}

function lockApp() {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(PROFILE_KEY);
    loginShell.classList.remove("hidden");
    app.classList.add("hidden");
    passwordInput.value = "";
    setFeedback("");
    pauseBackgroundMusic();
    showPasswordStep();
    activeProfileName = "";
    document.body.removeAttribute("data-profile");
}

function handleLogin(password) {
    if (isLocked()) {
        updateLoginAvailability();
        return;
    }

    if (password === content.password) {
        localStorage.removeItem(ATTEMPTS_KEY);
        localStorage.removeItem(LOCK_KEY);
        setFeedback("Contraseña correcta. Ahora elige tu nombre.", "success");
        showProfileStep();
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
    updateLoginAvailability();
    showPasswordStep();

    const savedProfile = localStorage.getItem(PROFILE_KEY);
    if (localStorage.getItem(SESSION_KEY) === "open" && savedProfile && content.profiles?.[savedProfile]) {
        applyProfile(savedProfile);
        unlockApp();
    }
}

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleLogin(passwordInput.value.trim());
});

logoutButton.addEventListener("click", lockApp);
backToPasswordButton.addEventListener("click", showPasswordStep);

profileButtons.forEach((button) => {
    button.addEventListener("click", () => {
        applyProfile(button.dataset.profile);
        showIntroScreen();
    });
});

enterProfileButton.addEventListener("click", unlockApp);

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
closeSurpriseModal.addEventListener("click", closeSurprise);
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightboxModal();
    }
});
surpriseModal.addEventListener("click", (event) => {
    if (event.target === surpriseModal) {
        closeSurprise();
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

surpriseButton.addEventListener("click", showRandomSurprise);

backgroundAudio.addEventListener("ended", async () => {
    setTrack(currentTrackIndex + 1);
    await playBackgroundMusic();
});

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeLightboxModal();
        closeSurprise();
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
