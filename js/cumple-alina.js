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
let letterTyped = false;
let resizeScratchCanvas = null;

function revealPage() {
  body.classList.remove('locked');
  body.classList.add('unlocked');
  if (main) main.setAttribute('aria-hidden', 'false');
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
  typeLetter();
  if (typeof resizeScratchCanvas === 'function') {
    window.setTimeout(resizeScratchCanvas, 150);
  }
  const firstSection = document.getElementById('primer-seccion') || document.querySelector('#mainContent .section');
  if (firstSection) {
    firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function typeLetter() {
  if (letterTyped) return;
  letterTyped = true;
  const target = document.getElementById('typedLetter');
  if (!target) return;
  let index = 0;
  const write = () => {
    target.textContent = letter.slice(0, index);
    if (index < letter.length) {
      index += 1;
      window.setTimeout(write, 18);
    } else {
      document.getElementById('signature')?.classList.add('show');
    }
  };
  write();
}

function updateCountdown() {
  const target = new Date('2026-10-10T00:00:00+02:00').getTime();
  const difference = target - Date.now();
  const msgEl = document.getElementById('countdownMessage');
  if (difference <= 0) {
    if (msgEl) msgEl.textContent = 'Hoy es tu día. Feliz cumpleaños, Alina 💙💗💜';
    return;
  }
  const days = Math.floor(difference / 86400000);
  const hours = Math.floor((difference % 86400000) / 3600000);
  const minutes = Math.floor((difference % 3600000) / 60000);
  const d = document.getElementById('days');
  const h = document.getElementById('hours');
  const m = document.getElementById('minutes');
  if (d) d.textContent = days;
  if (h) h.textContent = hours;
  if (m) m.textContent = minutes;
}

function loadTrack() {
  const track = tracks[trackIndex];
  const music = document.getElementById('music');
  const title = document.getElementById('trackTitle');
  const state = document.getElementById('musicState');
  if (music && track) music.src = track.file;
  if (title && track) title.textContent = track.title;
  if (state && track) state.textContent = `Lista para sonar: ${track.title}`;
}

async function toggleMusic() {
  const music = document.getElementById('music');
  const button = document.getElementById('playButton');
  const state = document.getElementById('musicState');
  const disc = document.getElementById('disc');
  if (!music || !button) return;

  if (music.paused) {
    try {
      await music.play();
      button.textContent = 'Ⅱ Pausar';
      if (state) state.textContent = `Reproduciendo: ${tracks[trackIndex].title}`;
      if (disc) disc.classList.add('playing');
    } catch {
      if (state) state.textContent = 'Pulsa otra vez para iniciar la música.';
    }
  } else {
    music.pause();
    button.textContent = '▶ Reproducir';
    if (state) state.textContent = `En pausa: ${tracks[trackIndex].title}`;
    if (disc) disc.classList.remove('playing');
  }
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
  controls.querySelectorAll('[data-alina-mode]').forEach((button) => button.addEventListener('click', (e) => {
    e.stopPropagation();
    applyMode(button.dataset.alinaMode);
  }));
  const nightButton = document.getElementById('nightToggle');
  const setNight = (enabled) => {
    document.documentElement.dataset.night = enabled ? '1' : '0';
    if (nightButton) nightButton.textContent = enabled ? '☀️ Modo día' : '🌙 Modo noche';
    localStorage.setItem('alina-night', enabled ? '1' : '0');
  };
  nightButton?.addEventListener('click', (e) => {
    e.stopPropagation();
    setNight(document.documentElement.dataset.night !== '1');
  });
  applyMode(localStorage.getItem('alina-theme') || 'cute');
  setNight(localStorage.getItem('alina-night') === '1');
}

const API = (window.ALINA_API_URL || window.CARLA_API_URL || 'https://archivo-secreto-api-v3.onrender.com').replace(/\/$/, '');

function buildFutureMessage() {
  const section = document.createElement('section');
  section.className = 'section reveal';
  section.innerHTML = '<div class="section-title"><span>08</span><div><p class="eyebrow">Para tu yo del futuro</p><h2>Un mensaje para tu próximo cumpleaños 💌</h2></div></div><div class="glass alina-future-card"><p>Escribe algo que quieras recordar, conseguir o decirte más adelante. Se guardará online.</p><textarea id="futureMessage" maxlength="4000" placeholder="Querida Alina del futuro..."></textarea><div class="alina-future-actions"><span id="futureStatus">Todavía no hay ningún mensaje guardado.</span><button class="glow-button" id="saveFuture" type="button">Guardar para el futuro ✨</button></div></div>';
  if (main) main.appendChild(section);
  const message = document.getElementById('futureMessage');
  const status = document.getElementById('futureStatus');
  const saveBtn = document.getElementById('saveFuture');

  async function loadFuture() {
    const local = localStorage.getItem('alina-future-message') || '';
    if (local && message && status) {
      message.value = local;
      status.textContent = '💙 Tu mensaje está guardado en este dispositivo.';
    }
    if (!API) return;
    try {
      const res = await fetch(`${API}/api/future-message?profile=alina`);
      if (res.ok) {
        const data = await res.json();
        if (data.message && message && status) {
          message.value = data.message;
          localStorage.setItem('alina-future-message', data.message);
          status.textContent = '💙 Tu mensaje está guardado online.';
        }
      } else if (res.status === 404 && !local && status) {
        status.textContent = 'Todavía no hay ningún mensaje guardado.';
      }
    } catch {
      if (!local && status) status.textContent = 'No se pudo conectar con el servidor.';
    }
  }

  saveBtn?.addEventListener('click', async (e) => {
    e.stopPropagation();
    if (!message || !status) return;
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
  const closeBtn = document.getElementById('galleryClose');
  const prevBtn = document.getElementById('galleryPrevious');
  const nextBtn = document.getElementById('galleryNext');
  if (!lightbox || !image) return;

  let currentIndex = 0;

  function renderPhoto(index, animate = true) {
    currentIndex = (index + cards.length) % cards.length;
    const card = cards[currentIndex];
    const imgEl = card.querySelector('img');
    const capEl = card.querySelector('figcaption');
    const src = card.dataset.src || imgEl?.src || '';
    const alt = imgEl?.alt || card.dataset.title || 'Recuerdo de Alina';
    const captionText = capEl ? capEl.textContent : (card.dataset.title || 'Recuerdo de Alina');

    const applyData = () => {
      image.src = src;
      image.alt = alt;
      if (title) title.textContent = captionText;
      if (counter) counter.textContent = `${currentIndex + 1} / ${cards.length}`;
      if (animate) lightbox.classList.remove('swapping');
    };

    if (animate) {
      lightbox.classList.add('swapping');
      window.setTimeout(applyData, 140);
    } else {
      applyData();
    }
  }

  function openGallery(index) {
    renderPhoto(index, false);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeGallery() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  cards.forEach((card, index) => {
    // Flip buttons (front "↺ Girar" and back "↺ Volver")
    card.querySelectorAll('.flip-btn-badge, .polaroid-flip-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        card.classList.toggle('is-flipped');
      });
    });

    // Gallery button on back
    card.querySelectorAll('.polaroid-gallery-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openGallery(index);
      });
    });

    // Front image directly opens gallery (only when not flipped)
    const frontImg = card.querySelector('.polaroid-front img');
    if (frontImg) {
      frontImg.addEventListener('click', (e) => {
        if (card.classList.contains('is-flipped')) return;
        e.stopPropagation();
        openGallery(index);
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

  closeBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeGallery();
  });
  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    renderPhoto(currentIndex - 1);
  });
  nextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    renderPhoto(currentIndex + 1);
  });

  // Click on background closes lightbox
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeGallery();
  });

  // Keyboard navigation
  window.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') closeGallery();
    if (event.key === 'ArrowLeft') renderPhoto(currentIndex - 1);
    if (event.key === 'ArrowRight') renderPhoto(currentIndex + 1);
  });

  // Mobile swipe gestures
  let touchStartX = 0;
  image.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  image.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 45) {
      renderPhoto(currentIndex + (dx < 0 ? 1 : -1));
    }
  }, { passive: true });
}

let currentAlinaVoice = null;
let currentAlinaVoiceBtn = null;

function initAlinaVoiceNotes() {
  const cards = document.querySelectorAll('.alina-voice-card');
  cards.forEach((card) => {
    const btn = card.querySelector('.alina-voice-btn');
    const audio = card.querySelector('audio');
    if (!btn || !audio) return;
    const icon = btn.querySelector('span');
    const progressFill = card.querySelector('.alina-progress-fill');
    const timeDisplay = card.querySelector('.alina-voice-time');
    const defaultDuration = timeDisplay ? timeDisplay.textContent : '0:30';

    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (currentAlinaVoice && currentAlinaVoice !== audio) {
        currentAlinaVoice.pause();
        currentAlinaVoice.currentTime = 0;
        if (currentAlinaVoiceBtn) {
          currentAlinaVoiceBtn.closest('.alina-voice-card')?.classList.remove('is-playing');
          const prevIcon = currentAlinaVoiceBtn.querySelector('span');
          if (prevIcon) prevIcon.textContent = '▶';
        }
      }

      if (audio.paused) {
        const music = document.getElementById('music');
        if (music && !music.paused) {
          music.pause();
          const playBtn = document.getElementById('playButton');
          if (playBtn) playBtn.textContent = '▶ Reproducir';
          document.getElementById('disc')?.classList.remove('playing');
        }
        try {
          await audio.play();
          currentAlinaVoice = audio;
          currentAlinaVoiceBtn = btn;
          card.classList.add('is-playing');
          if (icon) icon.textContent = '❚❚';
        } catch {
          if (timeDisplay) timeDisplay.textContent = 'Error';
        }
      } else {
        audio.pause();
        card.classList.remove('is-playing');
        if (icon) icon.textContent = '▶';
      }
    });

    audio.addEventListener('timeupdate', () => {
      if (audio.duration && progressFill && timeDisplay) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = percent + '%';
        const mins = Math.floor(audio.currentTime / 60);
        const secs = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
        timeDisplay.textContent = mins + ':' + secs;
      }
    });

    audio.addEventListener('ended', () => {
      card.classList.remove('is-playing');
      if (icon) icon.textContent = '▶';
      if (progressFill) progressFill.style.width = '0%';
      if (timeDisplay) timeDisplay.textContent = defaultDuration;
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
      document.getElementById('restartAlinaTrivia')?.addEventListener('click', (e) => {
        e.stopPropagation();
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
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (answered) return;
        answered = true;
        const chosen = Number(btn.dataset.idx);
        const ok = chosen === item.correct;
        if (ok) {
          score++;
          btn.classList.add('is-correct');
          if (fbText) fbText.innerHTML = '<strong>✨ ¡Correcto!</strong> ' + item.fb;
        } else {
          btn.classList.add('is-wrong');
          btns[item.correct]?.classList.add('is-correct');
          if (fbText) fbText.innerHTML = '<strong>Oops!</strong> ' + item.fb;
        }
        btns.forEach((b) => (b.disabled = true));
        if (fb) fb.classList.remove('hidden');
      });
    });

    nextBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      current++;
      render();
    });
  }

  render();
}

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

let scratchInitialized = false;

function initAlinaScratch() {
  if (scratchInitialized) return;
  const canvas = document.getElementById('alinaScratchCanvas');
  const wrapper = document.getElementById('alinaScratchWrapper');
  const quickBtn = document.getElementById('alinaRevealBtn');
  if (!canvas || !wrapper) return;
  scratchInitialized = true;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  let isScratching = false;
  let isRevealed = false;
  let lastX = null;
  let lastY = null;
  let strokeCount = 0;

  function reveal() {
    if (isRevealed) return;
    isRevealed = true;
    canvas.classList.add('revealed');
    if (quickBtn) quickBtn.style.display = 'none';
    triggerAlinaScratchParticles();
  }

  quickBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    reveal();
  });

  function resizeCanvas() {
    if (isRevealed) return;
    const rect = wrapper.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    drawMetallicCover(rect.width, rect.height);
  }

  resizeScratchCanvas = resizeCanvas;

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

    // Responsive text on scratch surface
    const titleSize = Math.max(12, Math.min(18, Math.round(w / 22)));
    const subSize = Math.max(10, Math.min(14, Math.round(w / 28)));

    ctx.fillStyle = '#0f1638';
    ctx.font = `bold ${titleSize}px 'DM Sans', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ RASCA AQUÍ CON EL DEDO ✨', w / 2, h / 2 - 14);

    ctx.fillStyle = '#261b4d';
    ctx.font = `${subSize}px 'DM Sans', sans-serif`;
    ctx.fillText('Descubre tu regalo exclusivo ✦', w / 2, h / 2 + 16);
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
    if (!w || !h) return;
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

    if (totalSampled > 0 && transparent / totalSampled > 0.38) {
      reveal();
    }
  }

  canvas.addEventListener('pointerdown', (e) => {
    isScratching = true;
    try { canvas.setPointerCapture?.(e.pointerId); } catch {}
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

  if ('IntersectionObserver' in window) {
    const ob = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !isRevealed) resizeCanvas();
      });
    }, { threshold: 0.1 });
    ob.observe(wrapper);
  }

  requestAnimationFrame(resizeCanvas);
}

function buildLogoutButton() {
  const section = document.createElement('section');
  section.className = 'section logout-section';
  section.innerHTML = '<div class="glass final-card"><button class="glow-button" type="button">Cerrar sesión y volver al inicio</button></div>';
  section.querySelector('button')?.addEventListener('click', (e) => {
    e.stopPropagation();
    ['archivo-secreto-session', 'archivo-secreto-profile', 'archivo-secreto-access'].forEach((key) => localStorage.removeItem(key));
    window.location.href = 'index.html';
  });
  if (main) main.appendChild(section);
}

// Observer for progressive reveal animations on scroll
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
}

openButton?.addEventListener('click', (e) => {
  e.preventDefault();
  revealPage();
});
document.getElementById('playButton')?.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleMusic();
});
document.getElementById('nextButton')?.addEventListener('click', async (e) => {
  e.stopPropagation();
  trackIndex = (trackIndex + 1) % tracks.length;
  loadTrack();
  await toggleMusic();
});
document.getElementById('music')?.addEventListener('ended', () => {
  trackIndex = (trackIndex + 1) % tracks.length;
  loadTrack();
  document.getElementById('music')?.play().catch(() => {});
});

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