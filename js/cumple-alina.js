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

const API = (window.ALINA_API_URL || window.CARLA_API_URL || 'https://archivo-secreto-api.onrender.com').replace(/\/$/, '');

function buildFutureMessage() {
  const section = document.createElement('section');
  section.className = 'section reveal';
  section.innerHTML = '<div class="section-title"><span>08</span><div><p class="eyebrow">Para tu yo del futuro</p><h2>Un mensaje para tu próximo cumpleaños 💌</h2></div></div><div class="glass alina-future-card"><p>Escribe algo que quieras recordar, conseguir o decirte más adelante. Se guardará online.</p><textarea id="futureMessage" maxlength="4000" placeholder="Querida Alina del futuro..."></textarea><div class="alina-future-actions"><span id="futureStatus">Todavía no hay ningún mensaje guardado.</span><button class="glow-button" id="saveFuture" type="button">Guardar para el futuro ✨</button></div></div>';
  main.appendChild(section);
  const message = document.getElementById('futureMessage');
  const status = document.getElementById('futureStatus');
  const saveBtn = document.getElementById('saveFuture');

  async function loadFuture() {
    const local = localStorage.getItem('alina-future-message') || '';
    if (local) {
      message.value = local;
      status.textContent = '💙 Tu mensaje está guardado en este dispositivo.';
    }
    if (!API) return;
    try {
      const res = await fetch(`${API}/api/future-message?profile=alina`);
      if (res.ok) {
        const data = await res.json();
        if (data.message) {
          message.value = data.message;
          localStorage.setItem('alina-future-message', data.message);
          status.textContent = '💙 Tu mensaje está guardado online.';
        }
      } else if (res.status === 404 && !local) {
        status.textContent = 'Todavía no hay ningún mensaje guardado.';
      }
    } catch {
      if (!local) status.textContent = 'No se pudo conectar con el servidor.';
    }
  }

  saveBtn.addEventListener('click', async () => {
    const value = message.value.trim();
    if (!value) {
      status.textContent = 'Escribe algo antes de guardarlo ✨';
      return;
    }
    saveBtn.disabled = true;
    status.textContent = 'Guardando...';
    try {
      const res = await fetch(`${API}/api/future-message`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: 'alina', message: value })
      });
      if (!res.ok) throw new Error('Error al guardar');
      localStorage.setItem('alina-future-message', value);
      status.textContent = '✨ Guardado online. Tu yo del futuro podrá leerlo.';
    } catch {
      localStorage.setItem('alina-future-message', value);
      status.textContent = '⚠️ Guardado en este dispositivo (sin conexión al servidor).';
    } finally {
      saveBtn.disabled = false;
    }
  });

  loadFuture();
}

function buildGallery() {
  const cards = [...document.querySelectorAll('.memory-card')];
  const lightbox = document.getElementById('galleryLightbox');
  const image = document.getElementById('galleryImage');
  const title = document.getElementById('galleryTitle');
  const counter = document.getElementById('galleryCounter');
  let currentIndex = 0;

  const show = (index) => {
    currentIndex = (index + cards.length) % cards.length;
    const card = cards[currentIndex];
    const imgEl = card.querySelector('img');
    const capEl = card.querySelector('figcaption');
    image.src = imgEl.src;
    image.alt = imgEl.alt || 'Recuerdo de Alina';
    title.textContent = capEl ? capEl.textContent : (card.dataset.title || 'Recuerdo de Alina');
    counter.textContent = `${currentIndex + 1} / ${cards.length}`;
    lightbox.showModal();
  };

  cards.forEach((card, index) => {
    // Flip buttons (front "↺ Girar" and back "↺ Volver")
    card.querySelectorAll('.flip-btn-badge, .polaroid-flip-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        card.classList.toggle('is-flipped');
      });
    });

    // Gallery button on back
    card.querySelectorAll('.polaroid-gallery-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        show(index);
      });
    });

    // Front image directly opens gallery
    const frontImg = card.querySelector('.polaroid-front img');
    if (frontImg) {
      frontImg.addEventListener('click', () => {
        show(index);
      });
    }

    // Keyboard accessibility
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        if (event.target.tagName === 'BUTTON') return;
        event.preventDefault();
        card.classList.toggle('is-flipped');
      }
    });
  });

  document.getElementById('galleryClose').addEventListener('click', () => lightbox.close());
  document.getElementById('galleryPrevious').addEventListener('click', () => show(currentIndex - 1));
  document.getElementById('galleryNext').addEventListener('click', () => show(currentIndex + 1));
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
  window.addEventListener('keydown', (event) => {
    if (!lightbox.open) return;
    if (event.key === 'Escape') lightbox.close();
    if (event.key === 'ArrowLeft') show(currentIndex - 1);
    if (event.key === 'ArrowRight') show(currentIndex + 1);
  });
}

let currentAlinaVoice = null;
let currentAlinaVoiceBtn = null;

function initAlinaVoiceNotes() {
  const cards = document.querySelectorAll('.alina-voice-card');
  cards.forEach((card) => {
    const btn = card.querySelector('.alina-voice-btn');
    const audio = card.querySelector('audio');
    const icon = btn.querySelector('span');
    const progressFill = card.querySelector('.alina-progress-fill');
    const timeDisplay = card.querySelector('.alina-voice-time');
    const defaultDuration = timeDisplay.textContent;

    btn.addEventListener('click', async () => {
      if (currentAlinaVoice && currentAlinaVoice !== audio) {
        currentAlinaVoice.pause();
        currentAlinaVoice.currentTime = 0;
        if (currentAlinaVoiceBtn) {
          currentAlinaVoiceBtn.closest('.alina-voice-card')?.classList.remove('is-playing');
          currentAlinaVoiceBtn.querySelector('span').textContent = '▶';
        }
      }

      if (audio.paused) {
        const music = document.getElementById('music');
        if (!music.paused) toggleMusic();
        try {
          await audio.play();
          currentAlinaVoice = audio;
          currentAlinaVoiceBtn = btn;
          card.classList.add('is-playing');
          icon.textContent = '❚❚';
        } catch {
          timeDisplay.textContent = 'Error';
        }
      } else {
        audio.pause();
        card.classList.remove('is-playing');
        icon.textContent = '▶';
      }
    });

    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = percent + '%';
        const mins = Math.floor(audio.currentTime / 60);
        const secs = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
        timeDisplay.textContent = mins + ':' + secs;
      }
    });

    audio.addEventListener('ended', () => {
      card.classList.remove('is-playing');
      icon.textContent = '▶';
      progressFill.style.width = '0%';
      timeDisplay.textContent = defaultDuration;
    });
  });
}

function initAlinaTrivia() {
  const container = document.getElementById('alinaTriviaContent');
  if (!container) return;
  const questions = [
    {
      q: '¿Cuál es el temazo insignia que abre con fuerza tu lista musical?',
      opts: ['Choque', 'Suelta Gatita Suelta 🐱', 'Tussi Channel', 'Un verano sin ti'],
      correct: 1,
      fb: '¡Claro que sí! Con ritmo y buena vibra desde el segundo uno.'
    },
    {
      q: '¿Qué colores y atmósfera definen tu versión exclusiva del archivo?',
      opts: ['Verde bosque y dorado', 'Azul aurora, lila y rosa 🌌', 'Gris marengo y blanco', 'Rojo pasión'],
      correct: 1,
      fb: '¡Exacto! Una atmósfera cinematográfica, relajante y hecha a tu medida.'
    },
    {
      q: '¿Qué es lo que mejor describe nuestra confianza y charlas?',
      opts: ['Buen rollo natural, risas sinceras y cero fingir 💙', 'Debates interminables de física cuántica', 'Hablar solo en cumpleaños', 'Conversaciones protocolares y serias'],
      correct: 0,
      fb: '¡Tal cual! Amistad sana, sin filtros y con la mejor de las energías.'
    }
  ];

  let current = 0;
  let score = 0;
  let answered = false;

  function render() {
    if (current >= questions.length) {
      let msg = '';
      if (score === questions.length) msg = '¡Puntuación perfecta! 🌟 Conexión al 100%, nos conocemos los detalles al milímetro.';
      else if (score >= 2) msg = '¡Casi perfecto! 👏 Te sabes prácticamente todo sobre nosotros.';
      else msg = '¡Buen intento! 😂 Toca repasar recuerdos y volver a leer la carta.';

      container.innerHTML = `
        <div class="alina-trivia-result">
          <span class="alina-voice-badge">Resultado final</span>
          <h3>${score} de ${questions.length} acertadas</h3>
          <p>${msg}</p>
          <button type="button" class="glow-button" id="restartAlinaTrivia">Repetir test ↺</button>
        </div>
      `;
      document.getElementById('restartAlinaTrivia')?.addEventListener('click', () => {
        current = 0; score = 0; answered = false; render();
      });
      return;
    }

    const item = questions[current];
    answered = false;
    container.innerHTML = `
      <div class="alina-trivia-header">
        <span>Pregunta ${current + 1} de ${questions.length}</span>
        <span class="alina-trivia-score-badge">Aciertos: ${score}</span>
      </div>
      <h3 class="alina-trivia-question">${item.q}</h3>
      <div class="alina-trivia-options">
        ${item.opts.map((opt, i) => `
          <button type="button" class="alina-trivia-btn" data-idx="${i}">
            <span class="alina-trivia-letter">${String.fromCharCode(65 + i)}</span>
            <span>${opt}</span>
          </button>
        `).join('')}
      </div>
      <div class="alina-trivia-feedback hidden" id="alinaFb">
        <p id="alinaFbText"></p>
        <button type="button" class="glow-button" id="alinaNextBtn" style="align-self:flex-start">
          ${current + 1 < questions.length ? 'Siguiente pregunta →' : 'Ver resultado final ✦'}
        </button>
      </div>
    `;

    const fb = document.getElementById('alinaFb');
    const fbText = document.getElementById('alinaFbText');
    const nextBtn = document.getElementById('alinaNextBtn');
    const btns = container.querySelectorAll('.alina-trivia-btn');

    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const chosen = Number(btn.dataset.idx);
        const ok = chosen === item.correct;
        if (ok) {
          score++;
          btn.classList.add('is-correct');
          fbText.innerHTML = '<strong>✨ ¡Correcto!</strong> ' + item.fb;
        } else {
          btn.classList.add('is-wrong');
          btns[item.correct]?.classList.add('is-correct');
          fbText.innerHTML = '<strong>Oops!</strong> ' + item.fb;
        }
        btns.forEach((b) => (b.disabled = true));
        fb.classList.remove('hidden');
      });
    });

    nextBtn?.addEventListener('click', () => {
      current++;
      render();
    });
  }

  render();
}

openButton.addEventListener('click', revealPage);
document.getElementById('playButton').addEventListener('click', toggleMusic);
document.getElementById('nextButton').addEventListener('click', async () => { trackIndex = (trackIndex + 1) % tracks.length; loadTrack(); await toggleMusic(); });
document.getElementById('music').addEventListener('ended', () => { trackIndex = (trackIndex + 1) % tracks.length; loadTrack(); document.getElementById('music').play().catch(() => {}); });
document.getElementById('surpriseButton')?.addEventListener('click', () => { const text = document.getElementById('surpriseText'); text.classList.toggle('hidden'); document.getElementById('surpriseButton').textContent = text.classList.contains('hidden') ? 'Abrir sorpresa 💌' : 'Cerrar sorpresa'; });

function triggerAlinaScratchParticles() {
  const wrapper = document.getElementById('alinaScratchWrapper');
  const rect = wrapper ? wrapper.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 200, height: 100 };
  const icons = ['💙', '✦', '🌸', '💜', '🎂', '✨', '🎁', '🥂'];
  for (let i = 0; i < 36; i++) {
    const s = document.createElement('span');
    s.className = 'spark';
    s.textContent = icons[Math.floor(Math.random() * icons.length)];
    s.style.position = 'fixed';
    s.style.pointerEvents = 'none';
    s.style.zIndex = '9999';
    s.style.fontSize = '22px';
    s.style.left = (rect.left + rect.width * (0.2 + Math.random() * 0.6)) + 'px';
    s.style.top = (rect.top + rect.height * (0.2 + Math.random() * 0.6)) + 'px';
    s.style.setProperty('--x', (Math.random() * 500 - 250) + 'px');
    s.style.setProperty('--y', (Math.random() * -400 - 40) + 'px');
    s.style.animation = 'sparkFly 0.95s ease-out forwards';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1000);
  }
}

function initAlinaScratch() {
  const canvas = document.getElementById('alinaScratchCanvas');
  const wrapper = document.getElementById('alinaScratchWrapper');
  if (!canvas || !wrapper) return;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  let isScratching = false;
  let isRevealed = false;
  let lastX = null;
  let lastY = null;
  let strokeCount = 0;

  function resizeCanvas() {
    const rect = wrapper.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    drawMetallicCover(rect.width, rect.height);
  }

  function drawMetallicCover(w, h) {
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#5869a8');
    grad.addColorStop(0.25, '#8ea1e1');
    grad.addColorStop(0.5, '#ffffff');
    grad.addColorStop(0.75, '#b298dc');
    grad.addColorStop(1, '#473b7b');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Aurora sparkle stars
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    for (let i = 0; i < 45; i++) {
      const rx = (Math.sin(i * 83 + 2) * 0.5 + 0.5) * w;
      const ry = (Math.cos(i * 37 + 4) * 0.5 + 0.5) * h;
      ctx.beginPath();
      ctx.arc(rx, ry, (i % 3) + 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Decorative frame
    ctx.strokeStyle = 'rgba(124, 140, 255, 0.6)';
    ctx.lineWidth = 4;
    ctx.strokeRect(8, 8, w - 16, h - 16);

    // Text on scratch surface
    ctx.fillStyle = '#0f1638';
    ctx.font = "bold 18px 'DM Sans', sans-serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ RASCA AQUÍ CON EL DEDO ✨', w / 2, h / 2 - 14);

    ctx.fillStyle = '#261b4d';
    ctx.font = "14px 'DM Sans', sans-serif";
    ctx.fillText('Descubre tu regalo exclusivo de cumpleaños ✦', w / 2, h / 2 + 16);
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }

  function scratch(x, y) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 42;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    if (lastX === null || lastY === null) {
      ctx.arc(x, y, 21, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    lastX = x;
    lastY = y;
  }

  function checkReveal() {
    strokeCount++;
    if (strokeCount % 10 !== 0 || isRevealed) return;

    const w = canvas.width;
    const h = canvas.height;
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;
    let transparent = 0;
    const step = 32;
    let totalSampled = 0;

    for (let i = 3; i < data.length; i += 4 * step) {
      totalSampled++;
      if (data[i] < 128) {
        transparent++;
      }
    }

    if (transparent / totalSampled > 0.4) {
      isRevealed = true;
      canvas.classList.add('revealed');
      triggerAlinaScratchParticles();
    }
  }

  canvas.addEventListener('pointerdown', (e) => {
    isScratching = true;
    canvas.setPointerCapture?.(e.pointerId);
    const pos = getPos(e);
    scratch(pos.x, pos.y);
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!isScratching) return;
    const pos = getPos(e);
    scratch(pos.x, pos.y);
    checkReveal();
  });

  const stopScratch = (e) => {
    isScratching = false;
    lastX = null;
    lastY = null;
    if (e && e.pointerId && canvas.releasePointerCapture) {
      try { canvas.releasePointerCapture(e.pointerId); } catch {}
    }
  };

  canvas.addEventListener('pointerup', stopScratch);
  canvas.addEventListener('pointercancel', stopScratch);

  window.addEventListener('resize', () => {
    if (!isRevealed) resizeCanvas();
  });

  requestAnimationFrame(resizeCanvas);
}

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
buildGallery();
initAlinaVoiceNotes();
initAlinaTrivia();
initAlinaScratch();
buildFutureMessage();
updateCountdown();
window.setInterval(updateCountdown, 60000);
loadTrack();
buildLogoutButton();