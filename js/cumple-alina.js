const body = document.body;
const main = document.getElementById('mainContent');
const openButton = document.getElementById('openButton');
const letter = `Alina,\n\nHoy toca celebrar todo lo bueno que traes contigo. Espero que este nuevo año venga lleno de momentos que te hagan ilusión, personas que te cuiden y planes que te saquen una sonrisa de las de verdad.\n\nHe querido dejarte este pequeño espacio porque hay recuerdos que merecen tener un lugar propio. Gracias por tu forma de ser, por las risas y por esa energía tan tuya.\n\nDisfruta muchísimo de tu día. Te lo mereces todo.\n\nFeliz cumpleaños.`;
const tracks = [
  { title: 'Suelta Gatita Suelta', file: 'assets/media/MUSICA 3.mp3' },
  { title: 'Choque', file: 'assets/media/MUSICA 6.mp3' },
  { title: 'Tussi Channel', file: 'assets/media/MUSICA 7.mp3' }
];
let trackIndex = 0;

function revealPage() {
  body.classList.remove('locked');
  body.classList.add('unlocked');
  main.setAttribute('aria-hidden', 'false');
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
  document.getElementById('typedLetter').textContent = '';
  typeLetter();
  document.getElementById('welcome').scrollIntoView({ behavior: 'smooth' });
}

function typeLetter() {
  const target = document.getElementById('typedLetter');
  let index = 0;
  const write = () => {
    target.textContent = letter.slice(0, index);
    if (index < letter.length) { index += 1; window.setTimeout(write, 18); }
    else document.getElementById('signature').classList.add('show');
  };
  write();
}

function updateCountdown() {
  const target = new Date('2026-10-10T00:00:00+02:00').getTime();
  const difference = target - Date.now();
  if (difference <= 0) { document.getElementById('countdownMessage').textContent = 'Hoy es tu día. Feliz cumpleaños, Alina 💙💗💜'; return; }
  const days = Math.floor(difference / 86400000);
  const hours = Math.floor((difference % 86400000) / 3600000);
  const minutes = Math.floor((difference % 3600000) / 60000);
  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
}

function loadTrack() {
  const track = tracks[trackIndex];
  document.getElementById('music').src = track.file;
  document.getElementById('trackTitle').textContent = track.title;
  document.getElementById('musicState').textContent = `Lista para sonar: ${track.title}`;
}

async function toggleMusic() {
  const music = document.getElementById('music');
  const button = document.getElementById('playButton');
  if (music.paused) { try { await music.play(); button.textContent = 'Ⅱ Pausar'; document.getElementById('musicState').textContent = `Reproduciendo: ${tracks[trackIndex].title}`; document.getElementById('disc').classList.add('playing'); } catch { document.getElementById('musicState').textContent = 'Pulsa otra vez para iniciar la música.'; } }
  else { music.pause(); button.textContent = '▶ Reproducir'; document.getElementById('musicState').textContent = `En pausa: ${tracks[trackIndex].title}`; document.getElementById('disc').classList.remove('playing'); }
}

function applyMode(mode) {
  const validModes = ['cute', 'party', 'relax'];
  const activeMode = validModes.includes(mode) ? mode : 'cute';
  document.documentElement.dataset.alinaMode = activeMode;
  document.querySelectorAll('[data-alina-mode]').forEach((button) => button.classList.toggle('active', button.dataset.alinaMode === activeMode));
  localStorage.setItem('alina-theme', activeMode);
}

function buildControls() {
  const controls = document.createElement('div');
  controls.className = 'alina-controls glass';
  controls.innerHTML = '<div class="alina-control-group"><span>✦ Ambiente</span><button type="button" data-alina-mode="cute">🌸 Cute</button><button type="button" data-alina-mode="party">🎉 Party</button><button type="button" data-alina-mode="relax">🌙 Relax</button></div><button type="button" id="nightToggle">🌙 Modo noche</button>';
  document.body.appendChild(controls);
  controls.querySelectorAll('[data-alina-mode]').forEach((button) => button.addEventListener('click', () => applyMode(button.dataset.alinaMode)));
  const nightButton = document.getElementById('nightToggle');
  const setNight = (enabled) => { document.documentElement.dataset.night = enabled ? '1' : '0'; nightButton.textContent = enabled ? '☀️ Modo día' : '🌙 Modo noche'; localStorage.setItem('alina-night', enabled ? '1' : '0'); };
  nightButton.addEventListener('click', () => setNight(document.documentElement.dataset.night !== '1'));
  applyMode(localStorage.getItem('alina-theme') || 'cute');
  setNight(localStorage.getItem('alina-night') === '1');
}

function buildFutureMessage() {
  const section = document.createElement('section');
  section.className = 'section reveal';
  section.innerHTML = '<div class="section-title"><span>06</span><div><p class="eyebrow">Para tu yo del futuro</p><h2>Un mensaje para tu próximo cumpleaños 💌</h2></div></div><div class="glass alina-future-card"><p>Escribe algo que quieras recordar, conseguir o decirte más adelante.</p><textarea id="futureMessage" maxlength="4000" placeholder="Querida Alina del futuro..."></textarea><div class="alina-future-actions"><span id="futureStatus">Todavía no hay ningún mensaje guardado.</span><button class="glow-button" id="saveFuture" type="button">Guardar para el futuro ✨</button></div></div>';
  main.appendChild(section);
  const message = document.getElementById('futureMessage');
  const status = document.getElementById('futureStatus');
  message.value = localStorage.getItem('alina-future-message') || '';
  if (message.value) status.textContent = 'Tu mensaje está guardado en este dispositivo.';
  document.getElementById('saveFuture').addEventListener('click', () => { const value = message.value.trim(); if (!value) { status.textContent = 'Escribe algo antes de guardarlo.'; return; } localStorage.setItem('alina-future-message', value); status.textContent = '✨ Guardado para tu yo del futuro.'; });
}

function buildGallery() {
  const cards = [...document.querySelectorAll('[data-gallery]')];
  const lightbox = document.getElementById('galleryLightbox');
  const image = document.getElementById('galleryImage');
  const title = document.getElementById('galleryTitle');
  const counter = document.getElementById('galleryCounter');
  let currentIndex = 0;
  const show = (index) => { currentIndex = (index + cards.length) % cards.length; const card = cards[currentIndex]; image.src = card.querySelector('img').src; image.alt = card.querySelector('img').alt; title.textContent = card.dataset.title; counter.textContent = `${currentIndex + 1} / ${cards.length}`; lightbox.showModal(); };
  cards.forEach((card, index) => { card.addEventListener('click', () => show(index)); card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); show(index); } }); });
  document.getElementById('galleryClose').addEventListener('click', () => lightbox.close());
  document.getElementById('galleryPrevious').addEventListener('click', () => show(currentIndex - 1));
  document.getElementById('galleryNext').addEventListener('click', () => show(currentIndex + 1));
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
  window.addEventListener('keydown', (event) => { if (!lightbox.open) return; if (event.key === 'Escape') lightbox.close(); if (event.key === 'ArrowLeft') show(currentIndex - 1); if (event.key === 'ArrowRight') show(currentIndex + 1); });
}

openButton.addEventListener('click', revealPage);
document.getElementById('playButton').addEventListener('click', toggleMusic);
document.getElementById('nextButton').addEventListener('click', async () => { trackIndex = (trackIndex + 1) % tracks.length; loadTrack(); await toggleMusic(); });
document.getElementById('music').addEventListener('ended', () => { trackIndex = (trackIndex + 1) % tracks.length; loadTrack(); document.getElementById('music').play().catch(() => {}); });
document.getElementById('surpriseButton').addEventListener('click', () => { const text = document.getElementById('surpriseText'); text.classList.toggle('hidden'); document.getElementById('surpriseButton').textContent = text.classList.contains('hidden') ? 'Abrir sorpresa 💌' : 'Cerrar sorpresa'; });

function buildLogoutButton() {
  const section = document.createElement('section');
  section.className = 'section logout-section';
  section.innerHTML = '<div class="glass final-card"><button class="glow-button" type="button">Cerrar sesión y volver al inicio</button></div>';
  section.querySelector('button').addEventListener('click', () => {
    ['archivo-secreto-session', 'archivo-secreto-profile', 'archivo-secreto-access'].forEach((key) => localStorage.removeItem(key));
    window.location.href = 'index.html';
  });
  main.appendChild(section);
}

buildControls();
buildFutureMessage();
buildGallery();
updateCountdown();
window.setInterval(updateCountdown, 60000);
loadTrack();
buildLogoutButton();