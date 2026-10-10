const content = window.ARCHIVO_CONTENT || { profiles: {}, password: "" };

// cumple_carla uses its own birthday page. All existing passwords keep using this app.
document.addEventListener("submit", (event) => {
    const form = event.target;
    const input = form?.querySelector?.("#password");
    if (input && input.value.trim() === "cumple_carla") {
        event.preventDefault();
        event.stopImmediatePropagation();
        window.location.href = "cumple-carla.html";
    }
    if (input && input.value.trim() === "cumple_alina") {
        event.preventDefault();
        event.stopImmediatePropagation();
        window.location.href = "cumple-alina.html";
    }
}, true);

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
const timeGreeting = document.getElementById("timeGreeting");
const heroTitle = document.getElementById("heroTitle");
const heroDescription = document.getElementById("heroDescription");
const statusValue = document.getElementById("statusValue");
const profileValue = document.getElementById("profileValue");
const countdownStatus = document.getElementById("countdownStatus");
const libraryTitle = document.getElementById("libraryTitle");
const galleryTitle = document.getElementById("galleryTitle");
const lettersTitle = document.getElementById("lettersTitle");
const timelineTitle = document.getElementById("timelineTitle");
const capsuleTitle = document.getElementById("capsuleTitle");
const playlistTitle = document.getElementById("playlistTitle");
const dailyMemoryTitle = document.getElementById("dailyMemoryTitle");
const countdownTitle = document.getElementById("countdownTitle");
const notesTitle = document.getElementById("notesTitle");
const notesList = document.getElementById("notesList");
const ratingTitle = document.getElementById("ratingTitle");
const countdownList = document.getElementById("countdownList");
const dailyMemoryCard = document.getElementById("dailyMemoryCard");
const playlistCard = document.getElementById("playlistCard");
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

const hintsModal = document.getElementById("hintsModal");
const hintsOpenButton = document.getElementById("hintsOpenButton");
const closeHintsModal = document.getElementById("closeHintsModal");

const siteAgeCounter = document.getElementById("siteAgeCounter");
const siteAgeDays = document.getElementById("siteAgeDays");
const siteAgeHours = document.getElementById("siteAgeHours");
const siteAgeMinutes = document.getElementById("siteAgeMinutes");
const siteAgeSeconds = document.getElementById("siteAgeSeconds");
const SITE_CREATION_DATE = new Date("2026-03-24T22:53:09+01:00").getTime();

const floatingPlayer = document.getElementById("floatingPlayer");
const playerProgressBar = document.getElementById("playerProgressBar");
const playerProgressFill = document.getElementById("playerProgressFill");
const playerTrackTitle = document.getElementById("playerTrackTitle");
const playerTrackTime = document.getElementById("playerTrackTime");
const playerDisc = document.getElementById("playerDisc");
const playerPrevBtn = document.getElementById("playerPrevBtn");
const playerPlayBtn = document.getElementById("playerPlayBtn");
const playerNextBtn = document.getElementById("playerNextBtn");
const playerPlayIcon = document.getElementById("playerPlayIcon");
const playerPauseIcon = document.getElementById("playerPauseIcon");

const cinemaModal = document.getElementById("cinemaModal");
const cinemaHeroButton = document.getElementById("cinemaHeroButton");
const cinemaGalleryButton = document.getElementById("cinemaGalleryButton");
const cinemaCloseBtn = document.getElementById("cinemaCloseBtn");
const cinemaPrevBtn = document.getElementById("cinemaPrevBtn");
const cinemaNextBtn = document.getElementById("cinemaNextBtn");
const cinemaPlayPauseBtn = document.getElementById("cinemaPlayPauseBtn");
const cinemaMusicToggleBtn = document.getElementById("cinemaMusicToggleBtn");
const cinemaImage = document.getElementById("cinemaImage");
const cinemaTitle = document.getElementById("cinemaTitle");
const cinemaDescription = document.getElementById("cinemaDescription");
const cinemaCounter = document.getElementById("cinemaCounter");
const cinemaProgressBar = document.getElementById("cinemaProgressBar");

const PROFILES_INFO = {
    Carla: {
        number: "01",
        name: "Carla",
        emoji: "💗",
        photo: "assets/media/CUMPLE_CARLA/RETRATO-1.JPEG",
        photoPosition: "center 20%",
        birthDate: "12 de enero",
        age: "22 años",
        city: "Madrid",
        favColor: "Rosa",
        favColorHex: "#ff8fc7",
        socials: [
            { name: "Instagram", icon: "ig", url: "https://www.instagram.com/carla12_01", handle: "@carla12_01" },
            { name: "TikTok", icon: "tt", url: "https://www.tiktok.com/@_carlalopez_03", handle: "@_carlalopez_03" }
        ],
        themeClass: "info-carla",
        tagline: "rosa · cálida · cercana",
        vibe: "Energía incondicional, risas sin filtro y una chispa que lo hace todo más fácil.",
        quote: "«Eres esa persona con la que sé que siempre puedo contar, para lo bueno, lo malo y lo completamente absurdo. No cambiaría eso por nada.»",
        traits: [
            { icon: "🎂", label: "Nacimiento", value: "12 de enero" },
            { icon: "⏳", label: "Edad", value: "22 años" },
            { icon: "📍", label: "Ciudad", value: "Madrid" },
            { icon: "🎨", label: "Color fav", value: "Rosa" },
            { icon: "✨", label: "Concepto", value: "La Chispa pura" },
            { icon: "🎵", label: "Música", value: "Blessings & Raindance" }
        ],
        cornerUrl: "cumple-carla.html",
        cornerLabel: "🎂 Abrir Rincón de Cumple de Carla 💗"
    },
    Alina: {
        number: "02",
        name: "Alina",
        emoji: "💙",
        photo: "assets/media/ALINA_ANUEL.PNG",
        photoPosition: "22% 24%",
        birthDate: "10 de octubre",
        age: "22 años",
        city: "Madrid",
        favColor: "Azul / Lila",
        favColorHex: "#7c8cff",
        socials: [
            { name: "Instagram", icon: "ig", url: "https://www.instagram.com/", handle: "@alina" },
            { name: "TikTok", icon: "tt", url: "https://www.tiktok.com/", handle: "@alina" }
        ],
        themeClass: "info-alina",
        tagline: "azul · rosa · lila",
        vibe: "Serenidad, tono cinematográfico y recuerdos que dejan huella con calma y complicidad.",
        quote: "«Un rincón hecho con azul, rosa y lila para celebrar tu día y guardar momentos que merecen quedarse para siempre.»",
        traits: [
            { icon: "🎂", label: "Nacimiento", value: "10 de octubre" },
            { icon: "⏳", label: "Edad", value: "22 años" },
            { icon: "📍", label: "Ciudad", value: "Madrid" },
            { icon: "🎨", label: "Color fav", value: "Azul / Lila" },
            { icon: "✨", label: "Concepto", value: "Aurora Boreal" },
            { icon: "🎵", label: "Música", value: "Tell Me & Relax" }
        ],
        cornerUrl: "cumple-alina.html",
        cornerLabel: "✨ Abrir Rincón de Cumple de Alina 💙"
    }
};

const profileInfoModal = document.getElementById("profileInfoModal");
const profileInfoCard = document.getElementById("profileInfoCard");
const closeProfileInfoBtn = document.getElementById("closeProfileInfoBtn");
const infoNumber = document.getElementById("infoNumber");
const infoAvatar = document.getElementById("infoAvatar");
const infoAvatarEmoji = document.getElementById("infoAvatarEmoji");
const infoName = document.getElementById("infoName");
const infoTagline = document.getElementById("infoTagline");
const infoVibe = document.getElementById("infoVibe");
const infoQuote = document.getElementById("infoQuote");
const infoTraits = document.getElementById("infoTraits");
const infoSocials = document.getElementById("infoSocials");
const infoCornerLink = document.getElementById("infoCornerLink");

const SESSION_KEY = "archivo-secreto-session";
const PROFILE_KEY = "archivo-secreto-profile";
const ACCESS_KEY = "archivo-secreto-access";
const VISITS_KEY = "archivo-secreto-visits";
const LOCK_KEY = "archivo-secreto-lock-until";
const ATTEMPTS_KEY = "archivo-secreto-attempts";
const RATING_KEY = "archivo-secreto-rating";
const MAX_ATTEMPTS = 4;
const LOCK_MINUTES = 1;
const PASSWORDS = { legacy: content.password, future: "2027" };
let currentTrackIndex = 0;
let selectedRating = 0;
let activeProfileName = "";
let activeAccess = "legacy";
let lastSurpriseIndex = -1;
let countdownTimerId = null;

function getActiveProfile() { return content.profiles?.[activeProfileName] || null; }
function formatTimestamp(date) { return new Intl.DateTimeFormat("es-ES", { dateStyle: "long", timeStyle: "short" }).format(date); }
function getTimeBucket() { const hour = new Date().getHours(); if (hour < 12) return "morning"; if (hour < 20) return "afternoon"; return "evening"; }
function getTodaySeed() { const now = new Date(); return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`; }
function getClosingMessage(rating) { if (rating === 5) return "Tu 5/5 deja este rincón en lo más alto del archivo."; if (rating === 4) return "Una nota alta siempre deja ganas de seguir ampliando este recuerdo."; if (rating === 3) return "Queda registrada una nota equilibrada, con margen para seguir mejorándolo."; return "Valoracion recibida. Queda guardada como parte de esta historia."; }
function showThankYouCard(rating, message, submittedAt) { thankYouMessage.textContent = message || getClosingMessage(rating); thankYouMeta.textContent = `Enviado el ${submittedAt} por ${activeProfileName} con una puntuacion de ${rating}/5.`; ratingForm.classList.add("hidden"); thankYouCard.classList.remove("hidden"); }
function showRatingForm() { thankYouCard.classList.add("hidden"); ratingForm.classList.remove("hidden"); ratingFeedback.textContent = ""; ratingFeedback.dataset.state = ""; }
function escapeHtml(value) { return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;"); }
function setFeedback(message, state = "") { loginFeedback.textContent = message; loginFeedback.dataset.state = state; }
function getLockUntil() { return Number(localStorage.getItem(LOCK_KEY) || 0); }
function isLocked() { return Date.now() < getLockUntil(); }
function getRemainingLockSeconds() { return Math.max(0, Math.ceil((getLockUntil() - Date.now()) / 1000)); }
function updateLoginAvailability() { if (!submitButton) return; const locked = isLocked(); submitButton.disabled = locked; if (locked) setFeedback(`Acceso bloqueado temporalmente. Espera ${getRemainingLockSeconds()}s.`, "error"); }
function registerVisit() { const visitsByProfile = JSON.parse(localStorage.getItem(VISITS_KEY) || "{}"); const visitKey = `${activeAccess}:${activeProfileName}`; const visits = Number(visitsByProfile[visitKey] || 0) + 1; visitsByProfile[visitKey] = visits; localStorage.setItem(VISITS_KEY, JSON.stringify(visitsByProfile)); visitCount.textContent = String(visits); }
function renderFeatured(items) { featuredGrid.innerHTML = items.map((item) => `<article class="media-card"><figure class="media-frame"><video controls preload="metadata" playsinline src="${escapeHtml(item.file)}"></video></figure><div class="media-body"><p class="media-meta">Video</p><h4>${escapeHtml(item.title)}</h4><p class="media-description">${escapeHtml(item.description || "")}</p></div></article>`).join(""); }
function renderPhotos(items) { photoGrid.innerHTML = items.map((item, index) => `<article class="photo-card" data-index="${index}" tabindex="0" role="button" aria-label="Abrir ${escapeHtml(item.title)}"><figure><img src="${escapeHtml(item.file)}" alt="${escapeHtml(item.title)}"><figcaption class="photo-caption">${escapeHtml(item.title)}</figcaption></figure></article>`).join(""); }
function renderNotes(items) { notesList.innerHTML = items.map((item) => `<li>${escapeHtml(item)}</li>`).join(""); }
function renderPlaylist(items) { playlistCard.innerHTML = items.map((item, index) => `<article class="playlist-item ${index === currentTrackIndex ? "is-active" : ""}"><div><p class="playlist-index">Pista ${index + 1}</p><h4>${escapeHtml(item.title || `Pista ${index + 1}`)}</h4></div></article>`).join(""); }
function hashString(value) { let hash = 0; for (let index = 0; index < value.length; index += 1) hash = (hash * 31 + value.charCodeAt(index)) >>> 0; return hash; }
function renderDailyMemory(profile) { const pool = [...(profile.photos || []).map((item) => ({ kind: "Foto", title: item.title, description: item.description })), ...(profile.letters || []).map((item) => ({ kind: "Carta", title: item.title, description: item.tag || item.signature || "" })), ...(profile.featured || []).map((item) => ({ kind: "Video", title: item.title, description: item.description }))]; if (!pool.length) { dailyMemoryCard.innerHTML = "<p class=\"daily-memory-empty\">Todavia no hay recuerdos suficientes para elegir uno aleatorio.</p>"; return; } const selected = pool[hashString(`${activeAccess}-${activeProfileName}-${getTodaySeed()}`) % pool.length]; dailyMemoryCard.innerHTML = `<p class="daily-memory-kind">${escapeHtml(selected.kind)}</p><h4>${escapeHtml(selected.title || "Recuerdo del dia")}</h4><p class="daily-memory-copy">${escapeHtml(selected.description || "El archivo ha querido destacar esta pieza hoy.")}</p>`; }
function renderTimeline(items) { timelineList.innerHTML = items.map((item) => `<article class="timeline-item"><p class="timeline-date">${escapeHtml(item.date || "")}</p><h4>${escapeHtml(item.title || "")}</h4><p class="timeline-body">${escapeHtml(item.body || "")}</p></article>`).join(""); }
function renderCapsule(items) { capsuleGrid.innerHTML = items.map((item) => `<article class="capsule-card"><p class="capsule-when">${escapeHtml(item.when || "")}</p><h4>${escapeHtml(item.title || "")}</h4><p class="capsule-body">${escapeHtml(item.body || "")}</p></article>`).join(""); }
function renderLetters(items) { lettersGrid.innerHTML = items.map((item) => `<article class="letter-card"><div class="letter-top"><h4 class="letter-title">${escapeHtml(item.title)}</h4><span class="letter-tag">${escapeHtml(item.tag || "Carta")}</span></div><p class="letter-body">${escapeHtml(item.body || "")}</p><p class="letter-signature">${escapeHtml(item.signature || "")}</p></article>`).join(""); }
function openLightbox(index) { const photo = getActiveProfile()?.photos?.[index]; if (!photo) return; lightboxImage.src = photo.file; lightboxImage.alt = photo.title; lightbox.showModal(); }
function closeLightboxModal() { if (lightbox.open) lightbox.close(); }
function closeSurprise() { if (surpriseModal.open) surpriseModal.close(); }
function formatAudioTime(seconds) {
    if (Number.isNaN(seconds) || seconds < 0) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
}

function updateFloatingPlayerUi() {
    const tracks = getActiveProfile()?.backgroundTracks || [];
    const activeTrack = tracks[currentTrackIndex];
    const isAppVisible = app && !app.classList.contains("hidden");

    if (!floatingPlayer) return;

    if (!isAppVisible || !tracks.length || !activeTrack) {
        floatingPlayer.classList.add("hidden");
        return;
    }

    floatingPlayer.classList.remove("hidden");
    if (playerTrackTitle) playerTrackTitle.textContent = activeTrack.title || `Pista ${currentTrackIndex + 1}`;
    const isPlaying = !backgroundAudio.paused;
    if (playerDisc) playerDisc.classList.toggle("is-playing", isPlaying);
    if (playerPlayIcon) playerPlayIcon.classList.toggle("hidden", isPlaying);
    if (playerPauseIcon) playerPauseIcon.classList.toggle("hidden", !isPlaying);
}

function updateCinemaMusicBtn() {
    if (cinemaMusicToggleBtn) {
        cinemaMusicToggleBtn.textContent = backgroundAudio.paused ? "▶ Música" : "⏸ Música";
    }
}

function updateMusicUi() {
    const tracks = getActiveProfile()?.backgroundTracks || [];
    const activeTrack = tracks[currentTrackIndex];
    if (!tracks.length || !activeTrack) {
        musicStatus.textContent = "Sin pistas";
        toggleMusicButton.disabled = true;
        nextTrackButton.disabled = true;
        updateFloatingPlayerUi();
        updateCinemaMusicBtn();
        return;
    }
    toggleMusicButton.disabled = false;
    nextTrackButton.disabled = false;
    musicStatus.textContent = backgroundAudio.paused ? `${activeTrack.title} en pausa` : activeTrack.title;
    toggleMusicButton.textContent = backgroundAudio.paused ? "Reproducir musica" : "Pausar musica";
    renderPlaylist(tracks);
    updateFloatingPlayerUi();
    updateCinemaMusicBtn();
}
function updateSurpriseStatus() { const profile = getActiveProfile(); const surprises = profile?.surprises || []; surpriseStatus.textContent = surprises.length ? profile?.surpriseLabel || "Lista" : "Sin sorpresas"; surpriseButton.disabled = !surprises.length; }
function showRandomSurprise() { const surprises = getActiveProfile()?.surprises || []; if (!surprises.length) return; let nextIndex = Math.floor(Math.random() * surprises.length); if (surprises.length > 1 && nextIndex === lastSurpriseIndex) nextIndex = (nextIndex + 1) % surprises.length; lastSurpriseIndex = nextIndex; const surprise = surprises[nextIndex]; surpriseEyebrow.textContent = surprise.eyebrow || "Sorpresa"; surpriseModalTitle.textContent = surprise.title || "Momento sorpresa"; surpriseModalBody.textContent = surprise.body || ""; surpriseStatus.textContent = `Ultima sorpresa #${nextIndex + 1}`; surpriseModal.showModal(); }
function setTrack(index) { const tracks = getActiveProfile()?.backgroundTracks || []; if (!tracks.length) { updateMusicUi(); return; } currentTrackIndex = (index + tracks.length) % tracks.length; backgroundAudio.src = tracks[currentTrackIndex].file; updateMusicUi(); }
function updateTimeGreeting(profile) { const greetings = profile?.timeGreetings || {}; timeGreeting.textContent = greetings[getTimeBucket()] || "Esta version del archivo cambia segun el momento del dia."; }
function stopCountdown() { if (countdownTimerId) { clearInterval(countdownTimerId); countdownTimerId = null; } }
function getProfileCountdowns(profile = getActiveProfile()) { if (!profile) return []; if (Array.isArray(profile.countdowns) && profile.countdowns.length) return profile.countdowns; return profile.countdown ? [profile.countdown] : []; }
function getCountdownSnapshot(countdown) { const fallback = { label: countdown?.label || "Cuenta atras", title: countdown?.title || "", days: "0", hours: "0", minutes: "0", status: "Sin fecha", complete: true }; if (!countdown?.target) return fallback; const targetTime = new Date(countdown.target).getTime(); if (Number.isNaN(targetTime)) return fallback; const diff = targetTime - Date.now(); if (diff <= 0) return { ...fallback, status: "Fecha alcanzada", title: countdown.completeText || "La fecha ya ha llegado.", complete: true }; const totalMinutes = Math.floor(diff / 60000); const days = Math.floor(totalMinutes / (60 * 24)); const hours = Math.floor((totalMinutes % (60 * 24)) / 60); const minutes = totalMinutes % 60; return { label: countdown.label || "Cuenta atras", title: countdown.title || "El archivo espera el siguiente momento.", days: String(days), hours: String(hours), minutes: String(minutes), status: `${days}d ${hours}h`, complete: false, remainingMinutes: totalMinutes }; }
function updateCountdownUi() { const countdowns = getProfileCountdowns(); if (!countdowns.length) { countdownStatus.textContent = "Sin fecha"; countdownList.innerHTML = `<div class="countdown-card"><p class="countdown-label">Proximo recuerdo</p><div class="countdown-grid"><article class="countdown-unit"><strong>0</strong><span>Dias</span></article><article class="countdown-unit"><strong>0</strong><span>Horas</span></article><article class="countdown-unit"><strong>0</strong><span>Min</span></article></div><p class="countdown-copy"></p></div>`; return; } const snapshots = countdowns.map(getCountdownSnapshot); const nextActiveCountdown = snapshots.filter((item) => !item.complete && Number.isFinite(item.remainingMinutes)).sort((left, right) => left.remainingMinutes - right.remainingMinutes)[0]; countdownStatus.textContent = nextActiveCountdown ? nextActiveCountdown.status : "Fecha alcanzada"; countdownList.innerHTML = snapshots.map((item) => `<div class="countdown-card"><p class="countdown-label">${escapeHtml(item.label)}</p><div class="countdown-grid"><article class="countdown-unit"><strong>${item.days}</strong><span>Dias</span></article><article class="countdown-unit"><strong>${item.hours}</strong><span>Horas</span></article><article class="countdown-unit"><strong>${item.minutes}</strong><span>Min</span></article></div><p class="countdown-copy">${escapeHtml(item.title)}</p></div>`).join(""); }
function startCountdown() { stopCountdown(); updateCountdownUi(); countdownTimerId = setInterval(updateCountdownUi, 60000); }
function setupRevealAnimations() { const sections = document.querySelectorAll(".section, .hero"); if (!("IntersectionObserver" in window)) { sections.forEach((section) => section.classList.add("is-visible")); return; } const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }); }, { threshold: 0.16 }); sections.forEach((section, index) => { section.classList.add("reveal"); section.style.setProperty("--reveal-delay", `${index * 70}ms`); observer.observe(section); }); }
async function playBackgroundMusic() { const tracks = getActiveProfile()?.backgroundTracks || []; if (!tracks.length) { updateMusicUi(); return; } if (!backgroundAudio.src) setTrack(currentTrackIndex); try { await backgroundAudio.play(); } catch { musicStatus.textContent = "Pulsa reproducir para iniciar"; } updateMusicUi(); }
function pauseBackgroundMusic() { backgroundAudio.pause(); updateMusicUi(); }
function updateRatingUi() { ratingStars.querySelectorAll(".star-button").forEach((star) => { const value = Number(star.dataset.value); star.classList.toggle("is-active", value <= selectedRating); }); ratingInput.value = selectedRating ? String(selectedRating) : ""; ratingValue.textContent = selectedRating ? `${selectedRating}/5 estrellas` : "Sin valorar todavia"; }
function loadSavedRating() { const ratingsByProfile = JSON.parse(localStorage.getItem(RATING_KEY) || "{}"); const saved = ratingsByProfile[`${activeAccess}:${activeProfileName}`]; if (!saved) { showRatingForm(); ratingMessage.value = ""; selectedRating = 0; submittedAtInput.value = ""; updateRatingUi(); return; } try { const parsed = typeof saved === "string" ? JSON.parse(saved) : saved; selectedRating = Number(parsed.rating) || 0; ratingMessage.value = parsed.message || ""; submittedAtInput.value = parsed.submittedAt || ""; if (parsed.submittedAt && selectedRating) showThankYouCard(selectedRating, parsed.message, parsed.submittedAt); else showRatingForm(); } catch { selectedRating = 0; ratingMessage.value = ""; submittedAtInput.value = ""; showRatingForm(); } updateRatingUi(); }
async function submitRating() { if (!selectedRating) { ratingFeedback.textContent = "Selecciona una puntuacion antes de guardar."; ratingFeedback.dataset.state = "error"; return; } const submittedAt = formatTimestamp(new Date()); submittedAtInput.value = submittedAt; const payload = { profile: activeProfileName, access: activeAccess, rating: selectedRating, message: ratingMessage.value.trim(), submittedAt }; const ratingsByProfile = JSON.parse(localStorage.getItem(RATING_KEY) || "{}"); ratingsByProfile[`${activeAccess}:${activeProfileName}`] = payload; localStorage.setItem(RATING_KEY, JSON.stringify(ratingsByProfile)); saveRatingButton.disabled = true; ratingFeedback.textContent = "Enviando valoracion..."; try { const formData = new FormData(ratingForm); const response = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(formData).toString() }); if (!response.ok) throw new Error("netlify-submit-failed"); ratingFeedback.textContent = "Valoracion enviada y guardada en este dispositivo."; ratingFeedback.dataset.state = "success"; showThankYouCard(selectedRating, payload.message, submittedAt); } catch { ratingFeedback.textContent = "No se pudo enviar a Netlify, pero la valoracion se guardo en este dispositivo."; ratingFeedback.dataset.state = "error"; } finally { saveRatingButton.disabled = false; } }
function clearRating() { selectedRating = 0; submittedAtInput.value = ""; ratingMessage.value = ""; const ratingsByProfile = JSON.parse(localStorage.getItem(RATING_KEY) || "{}"); delete ratingsByProfile[`${activeAccess}:${activeProfileName}`]; localStorage.setItem(RATING_KEY, JSON.stringify(ratingsByProfile)); updateRatingUi(); ratingFeedback.textContent = "Valoracion borrada."; ratingFeedback.dataset.state = "success"; showRatingForm(); }
function showProfileStep() { document.body.dataset.screen = "login"; loginForm.classList.add("hidden"); profileStep.classList.remove("hidden"); setFeedback(""); }
function showPasswordStep() { document.body.dataset.screen = "login"; profileStep.classList.add("hidden"); loginForm.classList.remove("hidden"); introScreen.classList.add("hidden"); app.classList.add("hidden"); floatingPlayer?.classList.add("hidden"); }
function showIntroScreen() { document.body.dataset.screen = "intro"; loginShell.classList.add("hidden"); introScreen.classList.remove("hidden"); app.classList.add("hidden"); floatingPlayer?.classList.add("hidden"); }
function showApp() { document.body.dataset.screen = "app"; loginShell.classList.add("hidden"); introScreen.classList.add("hidden"); app.classList.remove("hidden"); updateFloatingPlayerUi(); }
function applyProfile(profileName) { const profile = content.profiles?.[profileName]; if (!profile) return; activeProfileName = profileName; currentTrackIndex = 0; document.body.dataset.profile = profile.theme || ""; introEyebrow.textContent = profile.introEyebrow || `Entrada de ${profileName}`; introTitle.textContent = profile.introTitle || "Una portada hecha para ti."; introDescription.textContent = profile.introDescription || "Tu version arranca con su propia introduccion."; enterProfileButton.textContent = profile.introButton || "Entrar a mi archivo"; heroEyebrow.textContent = profile.eyebrow; updateTimeGreeting(profile); heroTitle.textContent = profile.heroTitle; heroDescription.textContent = profile.heroDescription; statusValue.textContent = profile.statusLabel; profileValue.textContent = profileName; libraryTitle.textContent = profile.libraryTitle; galleryTitle.textContent = profile.galleryTitle; lettersTitle.textContent = profile.lettersTitle || "Mensajes solo para ti"; timelineTitle.textContent = profile.timelineTitle || "Recorrido de recuerdos"; capsuleTitle.textContent = profile.capsuleTitle || "Mensajes para otro momento"; playlistTitle.textContent = profile.playlistTitle || "Las pistas de esta version"; dailyMemoryTitle.textContent = profile.dailyMemoryTitle || "Hoy el archivo ha elegido esto"; countdownTitle.textContent = profile.countdownTitle || "Un momento marcado en el archivo"; notesTitle.textContent = profile.notesTitle; ratingTitle.textContent = profile.ratingTitle; securitySummary.textContent = profile.securitySummary || "La proteccion actual es solo de navegador."; securityNextStep.textContent = profile.securityNextStep || "Para privacidad real necesitas backend o una capa privada del hosting."; profileInput.value = profileName; renderFeatured(profile.featured || []); renderPhotos(profile.photos || []); renderLetters(profile.letters || []); renderTimeline(profile.timeline || []); renderCapsule(profile.capsule || []); renderDailyMemory(profile); renderPlaylist(profile.backgroundTracks || []); renderNotes(profile.notes || []); const visitsByProfile = JSON.parse(localStorage.getItem(VISITS_KEY) || "{}"); visitCount.textContent = String(visitsByProfile[`${activeAccess}:${profileName}`] || 0); lastSurpriseIndex = -1; setTrack(0); updateSurpriseStatus(); startCountdown(); loadSavedRating(); }
function unlockApp() { showApp(); localStorage.setItem(SESSION_KEY, "open"); localStorage.setItem(PROFILE_KEY, activeProfileName); localStorage.setItem(ACCESS_KEY, activeAccess); registerVisit(); playBackgroundMusic(); updateFloatingPlayerUi(); }
function lockApp() { localStorage.removeItem(SESSION_KEY); localStorage.removeItem(PROFILE_KEY); localStorage.removeItem(ACCESS_KEY); loginShell.classList.remove("hidden"); app.classList.add("hidden"); floatingPlayer?.classList.add("hidden"); closeCinemaMode(); passwordInput.value = ""; setFeedback(""); pauseBackgroundMusic(); stopCountdown(); showPasswordStep(); activeProfileName = ""; activeAccess = "legacy"; document.body.removeAttribute("data-profile"); }
function handleLogin(password) { if (isLocked()) { updateLoginAvailability(); return; } const matchedAccess = Object.keys(PASSWORDS).find((key) => PASSWORDS[key] && password === PASSWORDS[key]); if (matchedAccess) { activeAccess = matchedAccess; localStorage.removeItem(ATTEMPTS_KEY); localStorage.removeItem(LOCK_KEY); setFeedback(matchedAccess === "future" ? "Acceso 2027 desbloqueado. Ahora elige tu nombre." : "Contraseña correcta. Ahora elige tu nombre.", "success"); showProfileStep(); return; } const attempts = Number(localStorage.getItem(ATTEMPTS_KEY) || 0) + 1; localStorage.setItem(ATTEMPTS_KEY, String(attempts)); if (attempts >= MAX_ATTEMPTS) { const lockUntil = Date.now() + LOCK_MINUTES * 60 * 1000; localStorage.setItem(LOCK_KEY, String(lockUntil)); localStorage.removeItem(ATTEMPTS_KEY); updateLoginAvailability(); return; } setFeedback(`Contraseña incorrecta. Quedan ${MAX_ATTEMPTS - attempts} intento(s).`, "error"); }

/* ==========================================================================
   AMBIENT IMMERSIVE CANVAS
   ========================================================================== */
function initAmbientCanvas() {
    const canvas = document.getElementById("ambientCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles = [];
    let animationId = null;
    const mouse = { x: -1000, y: -1000, active: false };

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.8 + 0.8,
            baseAlpha: Math.random() * 0.45 + 0.25,
            twinkleSpeed: Math.random() * 0.02 + 0.01,
            twinkleOffset: Math.random() * Math.PI * 2,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.2 - 0.15
        };
    }

    function initParticles() {
        const count = Math.min(45, Math.max(20, Math.floor((width * height) / 30000)));
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(createParticle());
        }
    }

    function getPalette() {
        const profile = document.body.dataset.profile;
        if (profile === "carla") {
            return ["255, 140, 190", "255, 185, 215", "255, 215, 235", "255, 240, 248"];
        }
        if (profile === "alina") {
            return ["126, 213, 255", "165, 195, 255", "190, 225, 255", "240, 248, 255"];
        }
        return ["230, 165, 115", "245, 198, 145", "255, 230, 190", "255, 255, 255"];
    }

    let tick = 0;
    function render() {
        ctx.clearRect(0, 0, width, height);
        tick += 1;
        const palette = getPalette();

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;
            if (p.y < -10) p.y = height + 10;
            if (p.y > height + 10) p.y = -10;

            const twinkle = Math.sin(tick * p.twinkleSpeed + p.twinkleOffset);
            let alpha = p.baseAlpha + twinkle * 0.2;

            if (mouse.active) {
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    alpha = Math.min(0.95, alpha + (1 - dist / 120) * 0.5);
                }
            }

            const color = palette[i % palette.length];
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${color}, ${Math.max(0.08, alpha)})`;
            ctx.shadowBlur = p.radius * 3.5;
            ctx.shadowColor = `rgba(${color}, ${alpha * 0.8})`;
            ctx.fill();
        }

        animationId = requestAnimationFrame(render);
    }

    resize();
    initParticles();
    render();

    window.addEventListener("resize", () => {
        resize();
        initParticles();
    });

    const setPointer = (e) => {
        mouse.x = e.clientX || (e.touches && e.touches[0]?.clientX) || -1000;
        mouse.y = e.clientY || (e.touches && e.touches[0]?.clientY) || -1000;
        mouse.active = true;
    };
    window.addEventListener("pointermove", setPointer, { passive: true });
    window.addEventListener("pointerleave", () => { mouse.active = false; });
    window.addEventListener("touchstart", setPointer, { passive: true });
    window.addEventListener("touchmove", setPointer, { passive: true });
    window.addEventListener("touchend", () => { mouse.active = false; });

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            if (animationId) cancelAnimationFrame(animationId);
            animationId = null;
        } else if (!animationId) {
            render();
        }
    });
}

/* ==========================================================================
   SITE AGE / HISTORIA VIVA
   ========================================================================== */
function updateSiteAgeUi() {
    const diff = Math.max(0, Date.now() - SITE_CREATION_DATE);
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (siteAgeCounter) siteAgeCounter.textContent = `${days} días y ${hours}h`;
    if (siteAgeDays) siteAgeDays.textContent = String(days);
    if (siteAgeHours) siteAgeHours.textContent = String(hours);
    if (siteAgeMinutes) siteAgeMinutes.textContent = String(minutes);
    if (siteAgeSeconds) siteAgeSeconds.textContent = String(seconds);
}

/* ==========================================================================
   CINEMA MODE / REVIVIR RECUERDOS
   ========================================================================== */
let cinemaIndex = 0;
let cinemaPlaying = true;
let cinemaSlideTimer = null;
let cinemaProgressTimer = null;
const CINEMA_DURATION = 5000;
let cinemaStartTime = 0;

function getCinemaPhotos() {
    return getActiveProfile()?.photos || [];
}

function updateCinemaSlide() {
    const photos = getCinemaPhotos();
    if (!photos.length) return;
    const photo = photos[cinemaIndex];

    if (cinemaImage) {
        cinemaImage.src = photo.file;
        cinemaImage.alt = photo.title || "Recuerdo";
        cinemaImage.style.animation = "none";
        void cinemaImage.offsetWidth;
        cinemaImage.style.animation = "";
    }
    if (cinemaTitle) cinemaTitle.textContent = photo.title || "Recuerdo";
    if (cinemaDescription) cinemaDescription.textContent = photo.description || "";
    if (cinemaCounter) cinemaCounter.textContent = `${cinemaIndex + 1} / ${photos.length}`;

    resetCinemaProgress();
}

function resetCinemaProgress() {
    if (cinemaProgressTimer) clearInterval(cinemaProgressTimer);
    if (cinemaSlideTimer) clearTimeout(cinemaSlideTimer);
    if (cinemaProgressBar) cinemaProgressBar.style.width = "0%";

    if (!cinemaPlaying) return;

    cinemaStartTime = Date.now();
    cinemaProgressTimer = setInterval(() => {
        const elapsed = Date.now() - cinemaStartTime;
        const pct = Math.min(100, (elapsed / CINEMA_DURATION) * 100);
        if (cinemaProgressBar) cinemaProgressBar.style.width = `${pct}%`;
    }, 50);

    cinemaSlideTimer = setTimeout(() => {
        nextCinemaSlide();
    }, CINEMA_DURATION);
}

function nextCinemaSlide() {
    const photos = getCinemaPhotos();
    if (!photos.length) return;
    cinemaIndex = (cinemaIndex + 1) % photos.length;
    updateCinemaSlide();
}

function prevCinemaSlide() {
    const photos = getCinemaPhotos();
    if (!photos.length) return;
    cinemaIndex = (cinemaIndex - 1 + photos.length) % photos.length;
    updateCinemaSlide();
}

function toggleCinemaPlay() {
    cinemaPlaying = !cinemaPlaying;
    if (cinemaPlayPauseBtn) {
        cinemaPlayPauseBtn.textContent = cinemaPlaying ? "⏸ Pausa" : "▶ Reanudar";
    }
    if (cinemaPlaying) {
        resetCinemaProgress();
    } else {
        if (cinemaProgressTimer) clearInterval(cinemaProgressTimer);
        if (cinemaSlideTimer) clearTimeout(cinemaSlideTimer);
    }
}

function openCinemaMode() {
    const photos = getCinemaPhotos();
    if (!photos.length) {
        alert("Todavía no hay fotos en este perfil para el Modo Cine.");
        return;
    }
    cinemaIndex = 0;
    cinemaPlaying = true;
    if (cinemaPlayPauseBtn) cinemaPlayPauseBtn.textContent = "⏸ Pausa";
    updateCinemaSlide();
    if (cinemaModal) cinemaModal.showModal();

    if (backgroundAudio.paused) {
        playBackgroundMusic().catch(() => {});
    }
    updateCinemaMusicBtn();
}

function closeCinemaMode() {
    if (cinemaProgressTimer) clearInterval(cinemaProgressTimer);
    if (cinemaSlideTimer) clearTimeout(cinemaSlideTimer);
    if (cinemaModal && cinemaModal.open) cinemaModal.close();
}

function openProfileInfo(profileKey) {
    const data = PROFILES_INFO[profileKey];
    if (!data || !profileInfoModal) return;

    if (profileInfoCard) profileInfoCard.className = `profile-info-card ${data.themeClass}`;
    if (infoNumber) infoNumber.textContent = data.number;
    if (infoAvatar) {
        if (data.photo) {
            infoAvatar.innerHTML = `<img src="${escapeHtml(data.photo)}" alt="${escapeHtml(data.name)}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;object-position:${data.photoPosition || 'center'};display:block;">`;
        } else if (infoAvatarEmoji) {
            infoAvatar.innerHTML = `<span id="infoAvatarEmoji">${data.emoji}</span>`;
        }
    }
    if (infoName) infoName.textContent = data.name;
    if (infoTagline) infoTagline.textContent = data.tagline;
    if (infoVibe) infoVibe.textContent = data.vibe;
    if (infoQuote) infoQuote.textContent = data.quote;
    if (infoCornerLink) {
        infoCornerLink.href = data.cornerUrl;
        infoCornerLink.textContent = data.cornerLabel;
    }
    if (infoTraits) {
        infoTraits.innerHTML = data.traits.map((t) => `
            <div class="profile-info-chip">
                <span class="profile-info-chip-icon">${t.icon}</span>
                <div class="profile-info-chip-texts">
                    <small>${escapeHtml(t.label)}</small>
                    <strong>${escapeHtml(t.value)}</strong>
                </div>
            </div>
        `).join("");
    }
    if (infoSocials) {
        if (data.socials && data.socials.length) {
            infoSocials.innerHTML = data.socials.map((s) => `
                <a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer" class="social-link social-${escapeHtml(s.icon)}" aria-label="${escapeHtml(s.name)} de ${escapeHtml(data.name)} (abre en nueva pestaña)">
                    <span>${escapeHtml(s.name)}</span>
                </a>
            `).join("");
            infoSocials.classList.remove("hidden");
        } else {
            infoSocials.innerHTML = "";
            infoSocials.classList.add("hidden");
        }
    }

    if (profileInfoCard) {
        profileInfoCard.style.animation = "none";
        void profileInfoCard.offsetWidth;
        profileInfoCard.style.animation = "";
    }

    profileInfoModal.showModal();
}

function closeProfileInfo() {
    if (profileInfoModal && profileInfoModal.open) {
        profileInfoModal.close();
    }
}

/* ==========================================================================
   CUSTOM PROFILE CREATOR ENGINE & LOCAL STORAGE SYNC
   ========================================================================== */
const CUSTOM_PROFILES_KEY = "archivo-secreto-custom-profiles";
const COLOR_PRESETS = {
    pink: { name: "Rosa Pastel", hex: "#ff8fc7", theme: "custom-pink", emoji: "🌸", bg: "linear-gradient(155deg, rgba(255, 245, 250, 0.96) 0%, rgba(255, 222, 237, 0.92) 100%)", border: "rgba(227, 106, 150, 0.35)", text: "#6a2b47" },
    blue: { name: "Azul Nube", hex: "#7c8cff", theme: "custom-blue", emoji: "💙", bg: "linear-gradient(155deg, rgba(246, 252, 255, 0.96) 0%, rgba(220, 236, 255, 0.92) 100%)", border: "rgba(90, 160, 220, 0.35)", text: "#23456b" },
    purple: { name: "Lila Mágico", hex: "#ad75c9", theme: "custom-purple", emoji: "💜", bg: "linear-gradient(155deg, rgba(251, 246, 255, 0.96) 0%, rgba(238, 218, 255, 0.92) 100%)", border: "rgba(173, 117, 201, 0.35)", text: "#4a1e5c" },
    green: { name: "Verde Menta", hex: "#52b788", theme: "custom-green", emoji: "🌿", bg: "linear-gradient(155deg, rgba(244, 251, 247, 0.96) 0%, rgba(212, 244, 228, 0.92) 100%)", border: "rgba(82, 183, 136, 0.35)", text: "#1b4d3e" },
    gold: { name: "Ámbar Dorado", hex: "#f4a261", theme: "custom-gold", emoji: "✨", bg: "linear-gradient(155deg, rgba(255, 250, 244, 0.96) 0%, rgba(255, 231, 210, 0.92) 100%)", border: "rgba(244, 162, 97, 0.35)", text: "#6e3810" }
};

function getCustomProfiles() {
    try {
        return JSON.parse(localStorage.getItem(CUSTOM_PROFILES_KEY) || "{}");
    } catch {
        return {};
    }
}

function saveCustomProfile(name, profileData) {
    const list = getCustomProfiles();
    list[name] = profileData;
    localStorage.setItem(CUSTOM_PROFILES_KEY, JSON.stringify(list));
}

function renderCustomProfileCard(name, profile) {
    const previewContainer = document.querySelector(".profile-preview");
    if (!previewContainer) return;
    if (previewContainer.querySelector(`.preview-card[data-profile-name="${name}"]`)) return;

    const info = profile.cardInfo || {};
    const colorKey = profile.colorKey || "pink";
    const preset = COLOR_PRESETS[colorKey] || COLOR_PRESETS.pink;
    const card = document.createElement("article");
    card.className = "preview-card preview-custom";
    card.dataset.profileName = name;
    card.setAttribute("aria-label", `Ficha de ${name}`);
    card.style.background = preset.bg;
    card.style.borderColor = preset.border;
    card.style.color = preset.text;

    const ig = info.socials?.find((s) => s.icon === "ig" || s.name.toLowerCase().includes("insta"));
    const tt = info.socials?.find((s) => s.icon === "tt" || s.name.toLowerCase().includes("tiktok"));

    card.innerHTML = `
        <div class="preview-card-header">
            <span class="preview-card-num" style="background:${preset.hex}22; color:${preset.hex}">✦</span>
            <div class="preview-photo-wrap" style="border:3px solid rgba(255,255,255,0.95); box-shadow:0 8px 22px ${preset.hex}44">
                ${info.photo ? `<img src="${escapeHtml(info.photo)}" alt="Foto de ${escapeHtml(name)}" class="preview-photo" style="object-position:${info.photoPosition || 'center'};" loading="lazy">` : `<div style="font-size:2rem;display:grid;place-items:center;height:100%">${preset.emoji}</div>`}
            </div>
            <strong class="preview-name">${escapeHtml(name)}</strong>
            <span class="preview-tagline">${escapeHtml(profile.tagline || 'archivo personalizado')}</span>
        </div>

        <dl class="preview-info-list">
            <div class="preview-info-row">
                <dt><span class="info-icon" aria-hidden="true">🎂</span> Nacimiento</dt>
                <dd>${escapeHtml(info.birthDate || 'Sin fecha')}</dd>
            </div>
            <div class="preview-info-row">
                <dt><span class="info-icon" aria-hidden="true">⏳</span> Edad</dt>
                <dd>${escapeHtml(info.age || '—')}</dd>
            </div>
            <div class="preview-info-row">
                <dt><span class="info-icon" aria-hidden="true">📍</span> Ciudad</dt>
                <dd>${escapeHtml(info.city || '—')}</dd>
            </div>
            <div class="preview-info-row">
                <dt><span class="info-icon" aria-hidden="true">🎨</span> Color fav</dt>
                <dd class="preview-color-val">
                    <span class="color-swatch" style="background-color: ${preset.hex};" aria-hidden="true"></span>
                    <span>${escapeHtml(info.favColor || preset.name)}</span>
                </dd>
            </div>
        </dl>

        <div class="preview-socials" aria-label="Redes sociales de ${escapeHtml(name)}">
            <span class="preview-socials-label">Redes sociales</span>
            <div class="preview-social-links">
                ${ig ? `<a href="${escapeHtml(ig.url)}" target="_blank" rel="noopener noreferrer" class="social-link social-ig" title="Instagram de ${escapeHtml(name)}">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    <span>Instagram</span>
                </a>` : ""}
                ${tt ? `<a href="${escapeHtml(tt.url)}" target="_blank" rel="noopener noreferrer" class="social-link social-tt" title="TikTok de ${escapeHtml(name)}">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.87-4.49V8.75a8.16 8.16 0 0 0 4.77 1.52V6.83a4.86 4.86 0 0 1-.87-.14z"/></svg>
                    <span>TikTok</span>
                </a>` : ""}
                ${!ig && !tt ? `<span style="grid-column:span 2;font-size:0.75rem;opacity:0.6;text-align:center;">Sin redes añadidas</span>` : ""}
            </div>
        </div>

        <button type="button" class="preview-badge-btn" data-profile-name="${escapeHtml(name)}" aria-label="Ver ficha de ${escapeHtml(name)}">
            <span>Ver ficha completa ✦</span>
        </button>
    `;

    card.addEventListener("click", (event) => {
        if (event.target.closest("a") || event.target.closest(".preview-socials")) return;
        openProfileInfo(name);
    });
    card.querySelector(".preview-badge-btn")?.addEventListener("click", (e) => {
        e.stopPropagation();
        openProfileInfo(name);
    });

    previewContainer.appendChild(card);
}

function renderCustomProfileButton(name) {
    const grid = document.getElementById("profileGrid");
    if (!grid) return;
    if (grid.querySelector(`button[data-profile="${name}"]`)) return;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "profile-button";
    btn.dataset.profile = name;
    btn.textContent = name;
    btn.addEventListener("click", () => {
        applyProfile(name);
        showIntroScreen();
    });
    grid.appendChild(btn);
}

function loadCustomProfiles() {
    const list = getCustomProfiles();
    for (const [name, profile] of Object.entries(list)) {
        content.profiles[name] = profile;
        const colorKey = profile.colorKey || "pink";
        const preset = COLOR_PRESETS[colorKey] || COLOR_PRESETS.pink;
        PROFILES_INFO[name] = {
            number: "✦",
            name: name,
            emoji: preset.emoji,
            photo: profile.cardInfo?.photo || "",
            photoPosition: profile.cardInfo?.photoPosition || "center 20%",
            birthDate: profile.cardInfo?.birthDate || "",
            age: profile.cardInfo?.age || "",
            city: profile.cardInfo?.city || "",
            favColor: profile.cardInfo?.favColor || preset.name,
            favColorHex: preset.hex,
            socials: profile.cardInfo?.socials || [],
            themeClass: `info-custom info-${colorKey}`,
            tagline: profile.tagline || "archivo personalizado",
            vibe: `Espacio personal creado con cariño para ${name} por ${profile.creator || "un ser querido"}.`,
            quote: profile.letters?.[0]?.body ? `«${profile.letters[0].body.slice(0, 140)}...»` : "«Un lugar al que volver cuando quieras.»",
            traits: [
                { icon: "🎂", label: "Nacimiento", value: profile.cardInfo?.birthDate || "—" },
                { icon: "⏳", label: "Edad", value: profile.cardInfo?.age || "—" },
                { icon: "📍", label: "Ciudad", value: profile.cardInfo?.city || "—" },
                { icon: "🎨", label: "Color fav", value: profile.cardInfo?.favColor || preset.name },
                { icon: "✨", label: "Creador", value: profile.creator || "Archivo" }
            ],
            cornerUrl: "#",
            cornerLabel: `✨ Entrar al archivo de ${name}`
        };

        if (profile.password) {
            PASSWORDS[name.toLowerCase()] = profile.password;
        }

        renderCustomProfileCard(name, profile);
        renderCustomProfileButton(name);
    }
}

function initCreatorWizard() {
    const modal = document.getElementById("creatorModal");
    const openBtn = document.getElementById("openCreatorBtn");
    const closeBtn = document.getElementById("closeCreatorBtn");
    const form = document.getElementById("creatorForm");
    const step1 = document.getElementById("creatorStep1");
    const step2 = document.getElementById("creatorStep2");
    const step3 = document.getElementById("creatorStep3");
    const successPane = document.getElementById("creatorSuccessPane");
    const dots = document.querySelectorAll(".creator-step-dot");

    let uploadedPhotoData = "";

    function setStep(step) {
        step1?.classList.toggle("hidden", step !== 1);
        step2?.classList.toggle("hidden", step !== 2);
        step3?.classList.toggle("hidden", step !== 3);
        successPane?.classList.add("hidden");
        form?.classList.remove("hidden");
        dots.forEach((dot) => {
            const dotStep = Number(dot.dataset.step);
            dot.classList.toggle("active", dotStep === step);
        });
    }

    openBtn?.addEventListener("click", () => {
        setStep(1);
        modal?.showModal();
    });
    closeBtn?.addEventListener("click", () => modal?.close());
    modal?.addEventListener("click", (e) => {
        if (e.target === modal) modal.close();
    });

    document.getElementById("crGoStep2")?.addEventListener("click", () => {
        const name = document.getElementById("crPersonName")?.value.trim();
        const creator = document.getElementById("crCreatorName")?.value.trim();
        const tagline = document.getElementById("crTagline")?.value.trim();
        if (!name || !creator || !tagline) {
            alert("Por favor, rellena los campos marcados con asterisco (*).");
            return;
        }
        setStep(2);
    });

    document.getElementById("crBackStep1")?.addEventListener("click", () => setStep(1));

    document.getElementById("crGoStep3")?.addEventListener("click", () => {
        const bdate = document.getElementById("crBirthDate")?.value.trim();
        const age = document.getElementById("crAge")?.value.trim();
        const city = document.getElementById("crCity")?.value.trim();
        if (!bdate || !age || !city) {
            alert("Por favor, completa fecha de nacimiento, edad y ciudad.");
            return;
        }
        setStep(3);
    });

    document.getElementById("crBackStep2")?.addEventListener("click", () => setStep(2));

    const photoInput = document.getElementById("crPhotoInput");
    const chooseBtn = document.getElementById("crPhotoChooseBtn");
    const removeBtn = document.getElementById("crPhotoRemoveBtn");
    const avatarPreview = document.getElementById("crAvatarPreview");

    chooseBtn?.addEventListener("click", () => photoInput?.click());
    photoInput?.addEventListener("change", (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
            uploadedPhotoData = evt.target.result;
            if (avatarPreview) avatarPreview.innerHTML = `<img src="${uploadedPhotoData}" alt="Foto previsualizada">`;
            removeBtn?.classList.remove("hidden");
        };
        reader.readAsDataURL(file);
    });
    removeBtn?.addEventListener("click", () => {
        uploadedPhotoData = "";
        if (avatarPreview) avatarPreview.innerHTML = `<span id="crAvatarPlaceholder">📸</span>`;
        if (photoInput) photoInput.value = "";
        removeBtn?.classList.add("hidden");
    });

    document.getElementById("crSuggestLetterBtn")?.addEventListener("click", () => {
        const name = document.getElementById("crPersonName")?.value.trim() || "ti";
        const creator = document.getElementById("crCreatorName")?.value.trim() || "mí";
        const letterArea = document.getElementById("crLetter");
        if (letterArea) {
            letterArea.value = `Querida/o ${name},\n\nQuería que tuvieras un rincón privado que fuera solamente tuyo. Gracias por estar siempre ahí, por cada risa compartida y por esa complicidad que lo hace todo más fácil.\n\nEste archivo está hecho para que vuelvas siempre que quieras recordar los buenos momentos. ¡Te lo mereces todo!\n\nCon muchísimo cariño, ${creator}. ✦`;
        }
    });

    form?.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("crPersonName")?.value.trim();
        const creator = document.getElementById("crCreatorName")?.value.trim();
        const tagline = document.getElementById("crTagline")?.value.trim();
        const password = document.getElementById("crPassword")?.value.trim();
        const birthDate = document.getElementById("crBirthDate")?.value.trim();
        const age = document.getElementById("crAge")?.value.trim();
        const city = document.getElementById("crCity")?.value.trim();
        const colorKey = document.getElementById("crColorSelect")?.value || "pink";
        const instagram = document.getElementById("crInstagram")?.value.trim();
        const tiktok = document.getElementById("crTiktok")?.value.trim();
        const letter = document.getElementById("crLetter")?.value.trim();
        const memory = document.getElementById("crMemory")?.value.trim();
        const capsule = document.getElementById("crCapsule")?.value.trim();

        if (!name || !letter) {
            alert("Por favor, indica al menos el nombre y la carta personal.");
            return;
        }

        const preset = COLOR_PRESETS[colorKey] || COLOR_PRESETS.pink;
        function formatSocial(urlOrUser, network) {
            if (!urlOrUser) return "";
            if (urlOrUser.startsWith("http://") || urlOrUser.startsWith("https://")) return urlOrUser;
            const clean = urlOrUser.replace(/^@/, "");
            return network === "instagram" ? `https://www.instagram.com/${clean}/` : `https://www.tiktok.com/@${clean}`;
        }

        const newProfile = {
            theme: preset.theme,
            colorKey: colorKey,
            creator: creator,
            tagline: tagline,
            password: password || undefined,
            eyebrow: `Archivo de ${name}`,
            introEyebrow: `Entrada de ${name}`,
            introTitle: `${name}, esta portada es solo para ti.`,
            introDescription: `Todo aquí entra con calma y con tu propia energía. Este rincón ha sido guardado con dedicación por ${creator}.`,
            introButton: `Entrar al archivo de ${name}`,
            timeGreetings: {
                morning: `Buenos días, ${name}. Tu archivo despierta suave y con luz propia.`,
                afternoon: `Buenas tardes, ${name}. Este refugio entra cálido y con buen ritmo.`,
                evening: `Buenas noches, ${name}. Esta versión se ve mejor cuando todo va más lento.`
            },
            heroTitle: `Un refugio privado hecho a la medida de ${name}.`,
            heroDescription: `Cartas, recuerdos y música guardados con calma para volver cuando quieras.`,
            statusLabel: `Modo ${name}`,
            surpriseLabel: "Activa",
            libraryTitle: `Contenido especial de ${name}`,
            galleryTitle: `Recuerdos para ${name}`,
            lettersTitle: `Cartas para ${name}`,
            playlistTitle: `La mezcla musical de ${name}`,
            dailyMemoryTitle: `Hoy el archivo destaca este recuerdo para ${name}`,
            timelineTitle: `Momentos especiales con ${creator}`,
            capsuleTitle: `Cápsula del tiempo`,
            countdownTitle: `Momentos marcados en el archivo`,
            notesTitle: `Notas privadas`,
            securitySummary: `Este archivo personalizado está guardado en el navegador de este dispositivo.`,
            securityNextStep: `Puedes descargar una copia de seguridad en formato JSON cuando quieras.`,
            cardInfo: {
                photo: uploadedPhotoData || (colorKey === "pink" ? "assets/media/CUMPLE_CARLA/RETRATO-1.JPEG" : "assets/media/ALINA_ANUEL.PNG"),
                photoPosition: "center 20%",
                birthDate: birthDate,
                age: age,
                city: city,
                favColor: preset.name,
                favColorHex: preset.hex,
                socials: [
                    ...(instagram ? [{ name: "Instagram", icon: "ig", url: formatSocial(instagram, "instagram") }] : []),
                    ...(tiktok ? [{ name: "TikTok", icon: "tt", url: formatSocial(tiktok, "tiktok") }] : [])
                ]
            },
            letters: [
                {
                    title: `Para ${name}`,
                    tag: "Carta principal",
                    body: letter,
                    signature: `Con cariño, ${creator}`
                }
            ],
            timeline: [
                {
                    date: "El comienzo",
                    title: tagline,
                    body: memory || `Aquí empezó todo lo bueno. Cada conversación y cada broma compartida han sumado a este refugio.`
                }
            ],
            capsule: [
                {
                    when: "Abrir cuando necesites sonreír",
                    title: "Reserva de buen rollo",
                    body: capsule || `Vuelve a esta parte cuando las cosas pesen. Aquí sigue guardada la mejor versión de esta historia.`
                }
            ],
            surprises: [
                {
                    eyebrow: `Sorpresa de ${name}`,
                    title: "Un detalle inesperado",
                    body: `Hay recuerdos que no necesitan orden exacto. El archivo siempre tendrá sitio para ti.`
                }
            ],
            backgroundTracks: [
                { title: "Blessings (Chill Mix)", file: "assets/media/MUSICA 1.mp3" },
                { title: "Raindance (Nocturno)", file: "assets/media/MUSICA 4.mp3" },
                { title: "Tell Me (Melodía)", file: "assets/media/MUSICA 2.mp3" }
            ],
            photos: []
        };

        saveCustomProfile(name, newProfile);
        content.profiles[name] = newProfile;
        if (password) PASSWORDS[name.toLowerCase()] = password;

        PROFILES_INFO[name] = {
            number: "✦",
            name: name,
            emoji: preset.emoji,
            photo: newProfile.cardInfo.photo,
            photoPosition: "center 20%",
            birthDate: birthDate,
            age: age,
            city: city,
            favColor: preset.name,
            favColorHex: preset.hex,
            socials: newProfile.cardInfo.socials,
            themeClass: `info-custom info-${colorKey}`,
            tagline: tagline,
            vibe: `Energía única, recuerdos compartidos y complicidad con ${creator}.`,
            quote: `«${letter.slice(0, 140)}...»`,
            traits: [
                { icon: "🎂", label: "Nacimiento", value: birthDate },
                { icon: "⏳", label: "Edad", value: age },
                { icon: "📍", label: "Ciudad", value: city },
                { icon: "🎨", label: "Color fav", value: preset.name },
                { icon: "✨", label: "Creador", value: creator }
            ],
            cornerUrl: "#",
            cornerLabel: `✨ Entrar al archivo de ${name}`
        };

        renderCustomProfileCard(name, newProfile);
        renderCustomProfileButton(name);

        form.classList.add("hidden");
        const successName = document.getElementById("crSuccessName");
        const successMsg = document.getElementById("crSuccessMsg");
        const successAvatar = document.getElementById("crSuccessAvatar");
        if (successName) successName.textContent = `¡El archivo de ${name} ya está listo!`;
        if (successMsg) successMsg.textContent = `El motor ha creado automáticamente su tarjeta en la portada, su carta dedicada por ${creator} y su espacio personal.`;
        if (successAvatar) {
            if (newProfile.cardInfo.photo) {
                successAvatar.innerHTML = `<img src="${newProfile.cardInfo.photo}" alt="${name}">`;
            } else {
                successAvatar.innerHTML = `<span>${preset.emoji}</span>`;
            }
        }
        successPane?.classList.remove("hidden");

        const enterBtn = document.getElementById("crSuccessEnterBtn");
        if (enterBtn) {
            enterBtn.onclick = () => {
                modal.close();
                activeAccess = "legacy";
                applyProfile(name);
                showIntroScreen();
            };
        }

        const viewCardBtn = document.getElementById("crSuccessViewCardBtn");
        if (viewCardBtn) {
            viewCardBtn.onclick = () => {
                modal.close();
                const card = document.querySelector(`.preview-card[data-profile-name="${name}"]`);
                if (card) {
                    card.scrollIntoView({ behavior: "smooth", block: "center" });
                    card.style.transform = "scale(1.05)";
                    setTimeout(() => card.style.transform = "", 600);
                }
            };
        }

        const downloadBtn = document.getElementById("crSuccessDownloadBtn");
        if (downloadBtn) {
            downloadBtn.onclick = () => {
                const blob = new Blob([JSON.stringify(newProfile, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `archivo-secreto-${name.toLowerCase()}.json`;
                a.click();
                URL.revokeObjectURL(url);
            };
        }
    });
}

function bootstrap() {
    initAmbientCanvas();
    updateSiteAgeUi();
    setInterval(updateSiteAgeUi, 1000);
    updateLoginAvailability();
    loadCustomProfiles();
    initCreatorWizard();
    showPasswordStep();
    const savedProfile = localStorage.getItem(PROFILE_KEY);
    const savedAccess = localStorage.getItem(ACCESS_KEY) || "legacy";
    if (localStorage.getItem(SESSION_KEY) === "open" && savedProfile && content.profiles?.[savedProfile] && PASSWORDS[savedAccess]) {
        activeAccess = savedAccess;
        applyProfile(savedProfile);
        unlockApp();
    }
}

/* ==========================================================================
   EVENT LISTENERS
   ========================================================================== */
loginForm.addEventListener("submit", (event) => { event.preventDefault(); handleLogin(passwordInput.value.trim()); });
logoutButton.addEventListener("click", lockApp);
backToPasswordButton.addEventListener("click", showPasswordStep);
profileButtons.forEach((button) => button.addEventListener("click", () => { applyProfile(button.dataset.profile); showIntroScreen(); }));
enterProfileButton.addEventListener("click", unlockApp);
photoGrid.addEventListener("click", (event) => { const card = event.target.closest(".photo-card"); if (card) openLightbox(Number(card.dataset.index)); });
photoGrid.addEventListener("keydown", (event) => { const card = event.target.closest(".photo-card"); if (!card || (event.key !== "Enter" && event.key !== " ")) return; event.preventDefault(); openLightbox(Number(card.dataset.index)); });
closeLightbox.addEventListener("click", closeLightboxModal);
closeSurpriseModal.addEventListener("click", closeSurprise);
lightbox.addEventListener("click", (event) => { if (event.target === lightbox) closeLightboxModal(); });
surpriseModal.addEventListener("click", (event) => { if (event.target === surpriseModal) closeSurprise(); });
toggleMusicButton.addEventListener("click", () => backgroundAudio.paused ? playBackgroundMusic() : pauseBackgroundMusic());
nextTrackButton.addEventListener("click", async () => { setTrack(currentTrackIndex + 1); await playBackgroundMusic(); });
surpriseButton.addEventListener("click", showRandomSurprise);
backgroundAudio.addEventListener("ended", async () => { setTrack(currentTrackIndex + 1); await playBackgroundMusic(); });

/* Profile Info modal events */
document.querySelectorAll(".preview-card[data-profile-name]").forEach((card) => {
    card.addEventListener("click", (event) => {
        if (event.target.closest("a") || event.target.closest(".preview-socials")) return;
        openProfileInfo(card.dataset.profileName);
    });
});
document.querySelectorAll(".preview-badge-btn[data-profile-name]").forEach((btn) => {
    btn.addEventListener("click", (event) => {
        event.stopPropagation();
        openProfileInfo(btn.dataset.profileName);
    });
});
closeProfileInfoBtn?.addEventListener("click", closeProfileInfo);
profileInfoModal?.addEventListener("click", (event) => {
    if (event.target === profileInfoModal) closeProfileInfo();
});

/* Hints modal events */
hintsOpenButton?.addEventListener("click", () => hintsModal?.showModal());
closeHintsModal?.addEventListener("click", () => hintsModal?.close());
hintsModal?.addEventListener("click", (event) => { if (event.target === hintsModal) hintsModal.close(); });
hintsModal?.querySelectorAll("[data-fill]").forEach((button) => {
    button.addEventListener("click", () => {
        const key = button.getAttribute("data-fill");
        if (!key) return;
        passwordInput.value = key;
        hintsModal.close();
        handleLogin(key);
    });
});

/* Cinema mode events */
cinemaHeroButton?.addEventListener("click", openCinemaMode);
cinemaGalleryButton?.addEventListener("click", openCinemaMode);
cinemaCloseBtn?.addEventListener("click", closeCinemaMode);
cinemaPrevBtn?.addEventListener("click", prevCinemaSlide);
cinemaNextBtn?.addEventListener("click", nextCinemaSlide);
cinemaPlayPauseBtn?.addEventListener("click", toggleCinemaPlay);
cinemaMusicToggleBtn?.addEventListener("click", () => {
    backgroundAudio.paused ? playBackgroundMusic() : pauseBackgroundMusic();
    updateCinemaMusicBtn();
});
cinemaModal?.addEventListener("click", (event) => { if (event.target === cinemaModal) closeCinemaMode(); });

let touchCinemaStartX = 0;
cinemaModal?.addEventListener("touchstart", (e) => {
    touchCinemaStartX = e.changedTouches[0].screenX;
}, { passive: true });
cinemaModal?.addEventListener("touchend", (e) => {
    const touchCinemaEndX = e.changedTouches[0].screenX;
    if (touchCinemaEndX < touchCinemaStartX - 50) nextCinemaSlide();
    if (touchCinemaEndX > touchCinemaStartX + 50) prevCinemaSlide();
}, { passive: true });

/* Floating Player events */
backgroundAudio.addEventListener("timeupdate", () => {
    if (!backgroundAudio.duration) return;
    const progress = (backgroundAudio.currentTime / backgroundAudio.duration) * 100;
    if (playerProgressFill) playerProgressFill.style.width = `${progress}%`;
    if (playerProgressBar) playerProgressBar.setAttribute("aria-valuenow", Math.round(progress));
    if (playerTrackTime) {
        playerTrackTime.textContent = `${formatAudioTime(backgroundAudio.currentTime)} / ${formatAudioTime(backgroundAudio.duration)}`;
    }
});
backgroundAudio.addEventListener("play", updateFloatingPlayerUi);
backgroundAudio.addEventListener("pause", updateFloatingPlayerUi);

if (playerProgressBar) {
    playerProgressBar.addEventListener("click", (e) => {
        if (!backgroundAudio.duration) return;
        const rect = playerProgressBar.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        backgroundAudio.currentTime = ratio * backgroundAudio.duration;
    });
}
playerPlayBtn?.addEventListener("click", () => {
    backgroundAudio.paused ? playBackgroundMusic() : pauseBackgroundMusic();
});
playerPrevBtn?.addEventListener("click", async () => {
    setTrack(currentTrackIndex - 1);
    await playBackgroundMusic();
});
playerNextBtn?.addEventListener("click", async () => {
    setTrack(currentTrackIndex + 1);
    await playBackgroundMusic();
});

/* Keyboard shortcuts */
window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeLightboxModal();
        closeSurprise();
        closeCinemaMode();
        closeProfileInfo();
        if (hintsModal?.open) hintsModal.close();
    }
    if (cinemaModal?.open) {
        if (event.key === "ArrowRight") nextCinemaSlide();
        if (event.key === "ArrowLeft") prevCinemaSlide();
        if (event.key === " ") {
            event.preventDefault();
            toggleCinemaPlay();
        }
    }
});

ratingStars.addEventListener("click", (event) => { const star = event.target.closest(".star-button"); if (!star) return; selectedRating = Number(star.dataset.value); star.classList.remove("is-burst"); void star.offsetWidth; star.classList.add("is-burst"); updateRatingUi(); ratingFeedback.textContent = ""; ratingFeedback.dataset.state = ""; });
ratingForm.addEventListener("submit", (event) => { event.preventDefault(); submitRating(); });
clearRatingButton.addEventListener("click", clearRating);
rateAgainButton.addEventListener("click", showRatingForm);
setInterval(updateLoginAvailability, 1000);
setupRevealAnimations();
bootstrap();