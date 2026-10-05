(() => {
  "use strict";
  const $ = (id) => document.getElementById(id),
    music = $("music"),
    playBtn = $("playBtn"),
    nextBtn = $("nextBtn"),
    musicState = $("musicState"),
    disc = $("disc"),
    surpriseBtn = $("surpriseBtn"),
    surpriseText = $("surpriseText");
  const tracks = [
    { title: "Blessings", file: "assets/media/MUSICA 1.mp3" },
    { title: "Tell Me", file: "assets/media/MUSICA 2.mp3" },
    { title: "Raindance", file: "assets/media/MUSICA 4.mp3" },
    { title: "Buenos Días", file: "assets/media/MUSICA 5.mp3" },
  ];
  let trackIndex = 0;
  function loadTrack(i) {
    trackIndex = (i + tracks.length) % tracks.length;
    music.src = tracks[trackIndex].file;
    music.load();
    musicState.textContent = "Pista: " + tracks[trackIndex].title;
  }
  async function playMusic() {
    try {
      await music.play();
      playBtn.textContent = "Ⅱ Pausar";
      musicState.textContent =
        "Reproduciendo: " + tracks[trackIndex].title;
      disc.classList.add("playing");
    } catch {
      playBtn.textContent = "▶ Reproducir";
      musicState.textContent = "No se pudo reproducir esta pista.";
    }
  }
  function pauseMusic() {
    music.pause();
    playBtn.textContent = "▶ Reproducir";
    musicState.textContent = "Pausado: " + tracks[trackIndex].title;
    disc.classList.remove("playing");
  }
  playBtn.addEventListener("click", () =>
    music.paused ? playMusic() : pauseMusic(),
  );
  nextBtn.addEventListener("click", () => {
    loadTrack(trackIndex + 1);
    playMusic();
  });
  music.addEventListener("ended", () => {
    loadTrack(trackIndex + 1);
    playMusic();
  });
  music.addEventListener("error", () => {
    musicState.textContent =
      "No se encuentra la pista: " + tracks[trackIndex].file;
    disc.classList.remove("playing");
  });
  const letter =
    "Carla, hoy quería que tuvieras un rincón que fuera solamente tuyo. 💗\n\nEspero que este nuevo año te traiga muchísimas risas, momentos inesperados, personas que te hagan sentir bien y recuerdos que algún día mires y vuelvas a sonreír.\n\nGracias por todos esos momentos que, aunque parezcan pequeños, terminan siendo los que más se recuerdan. Y por supuesto, espero que disfrutes muchísimo de tu día.\n\nFeliz cumpleaños, Carla. 🎂✨";
  let typed = false;
  function typeLetter() {
    if (typed) return;
    typed = true;
    const el = $("typedLetter"),
      sig = $("letterSignature");
    let i = 0;
    const tick = () => {
      if (i < letter.length) {
        el.textContent = letter.slice(0, ++i);
        el.innerHTML += '<span class="letter-caret"></span>';
        setTimeout(tick, 22);
      } else {
        el.innerHTML = letter.replaceAll("\n", "<br>");
        sig.classList.add("show");
      }
    };
    tick();
  }
  const lc = document.querySelector(".letter-card");
  if (lc && "IntersectionObserver" in window) {
    const ob = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            typeLetter();
            ob.unobserve(e.target);
          }
        }),
      { threshold: 0.25 },
    );
    ob.observe(lc);
  } else typeLetter();
  const ri = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const ob = new IntersectionObserver(
      (es, obs) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    ri.forEach((x) => ob.observe(x));
  } else ri.forEach((x) => x.classList.add("visible"));
  const emojis = ["💗", "🎀", "✨", "🌸", "🦋", "🎂"];
  document.querySelectorAll(".sticker").forEach((st) =>
    st.addEventListener("click", (e) => {
      st.classList.remove("clicked");
      void st.offsetWidth;
      st.classList.add("clicked");
      for (let i = 0; i < 6; i++) {
        const s = document.createElement("span");
        s.className = "spark";
        s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        s.style.left = e.clientX + "px";
        s.style.top = e.clientY + "px";
        s.style.setProperty("--x", Math.random() * 180 - 90 + "px");
        s.style.setProperty("--y", Math.random() * -180 - 30 + "px");
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 950);
      }
    }),
  );
  surpriseBtn?.addEventListener("click", () => {
    const opening = surpriseText.classList.contains("hidden");
    surpriseText.classList.toggle("hidden");
    surpriseBtn.textContent = opening
      ? "Cerrar sorpresa 💗"
      : "No pulses esto 👀";
    if (opening)
      for (let i = 0; i < 24; i++) {
        const s = document.createElement("span");
        s.className = "spark";
        s.textContent = ["💗", "✨", "🎀", "🌸", "💖"][
          Math.floor(Math.random() * 5)
        ];
        s.style.left = 35 + Math.random() * 30 + "%";
        s.style.top = 55 + Math.random() * 10 + "%";
        s.style.setProperty("--x", Math.random() * 600 - 300 + "px");
        s.style.setProperty("--y", Math.random() * -450 - 30 + "px");
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 1000);
      }
  });
  const photos = [
    {
      src: "assets/media/CUMPLE_CARLA/RETRATO-2.JPEG",
      title: "La protagonista de hoy 💗",
    },
    {
      src: "assets/media/CUMPLE_CARLA/FOTO-1.JPEG",
      title: "Un recuerdo que merecía su propio sitio.",
    },
    {
      src: "assets/media/CUMPLE_CARLA/PORTADA-CHANEL-CARLA.PNG",
      title: "Momentos que se quedan.",
    },
    {
      src: "assets/media/CUMPLE_CARLA/PORTADA-REVISTA-MUERTE.PNG",
      title: "Noticia de última hora",
    },
    {
      src: "assets/media/CUMPLE_CARLA/RETRATO-1.JPEG",
      title: "Porque algunas fotos simplemente tienen que estar aquí.",
    },
    {
      src: "assets/media/CUMPLE_CARLA/RETRATO-3.JPEG",
      title: "Un retrato que no podía faltar.",
    },
  ];
  const lightbox = $("galleryLightbox"),
    image = $("galleryImage"),
    title = $("galleryTitle"),
    counter = $("galleryCounter"),
    prev = $("galleryPrev"),
    next = $("galleryNext"),
    close = $("galleryClose");
  let galleryIndex = 0;
  function renderPhoto(i, animate = true) {
    galleryIndex = (i + photos.length) % photos.length;
    if (animate) lightbox.classList.add("swapping");
    const update = () => {
      image.src = photos[galleryIndex].src;
      image.alt = photos[galleryIndex].title;
      title.textContent = photos[galleryIndex].title;
      counter.textContent = `${galleryIndex + 1} / ${photos.length}`;
      lightbox.classList.remove("swapping");
    };
    animate ? setTimeout(update, 160) : update();
  }
  function openGallery(i) {
    renderPhoto(i, false);
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
    close.focus();
  }
  function closeGallery() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }
  function initCarlaPolaroids() {
    document.querySelectorAll(".memory-card").forEach((card) => {
      const idx = Number(card.dataset.index);

      // Flip button badges (front "↺ Girar" and back "↺ Volver")
      card.querySelectorAll(".flip-btn-badge, .polaroid-flip-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          card.classList.toggle("is-flipped");
        });
      });

      // Open gallery button on back
      card.querySelectorAll(".polaroid-gallery-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          openGallery(idx);
        });
      });

      // Front image click opens lightbox directly
      const frontImg = card.querySelector(".polaroid-front img");
      if (frontImg) {
        frontImg.addEventListener("click", (e) => {
          openGallery(idx);
        });
      }

      // Keyboard navigation
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          if (e.target.tagName === "BUTTON") return;
          e.preventDefault();
          card.classList.toggle("is-flipped");
        }
      });
    });
  }
  initCarlaPolaroids();
  prev.addEventListener("click", () => renderPhoto(galleryIndex - 1));
  next.addEventListener("click", () => renderPhoto(galleryIndex + 1));
  close.addEventListener("click", closeGallery);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeGallery();
  });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeGallery();
    if (e.key === "ArrowLeft") renderPhoto(galleryIndex - 1);
    if (e.key === "ArrowRight") renderPhoto(galleryIndex + 1);
  });
  let touchStartX = 0;
  image.addEventListener(
    "touchstart",
    (e) => (touchStartX = e.changedTouches[0].clientX),
    { passive: true },
  );
  image.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 45)
        renderPhoto(galleryIndex + (dx < 0 ? 1 : -1));
    },
    { passive: true },
  );
  $("enterBtn").addEventListener("click", (e) => {
    e.preventDefault();
    document.body.classList.add("unlocked");
    $("recuerdos").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  const logoutSection = document.createElement("section");
  logoutSection.className = "section logout-section";
  logoutSection.innerHTML = '<div class="glass final-card"><button class="glow-button" type="button">Cerrar sesión y volver al inicio</button></div>';
  logoutSection.querySelector("button").addEventListener("click", () => {
    ["archivo-secreto-session", "archivo-secreto-profile", "archivo-secreto-access"].forEach((key) => localStorage.removeItem(key));
    window.location.href = "index.html";
  });
  document.querySelector("main")?.appendChild(logoutSection);
  let currentVoiceAudio = null;
  let currentVoiceBtn = null;
  function initCarlaVoiceNotes() {
    document.querySelectorAll(".carla-voice-card").forEach((card) => {
      const btn = card.querySelector(".carla-voice-btn");
      const audio = card.querySelector("audio");
      const icon = btn.querySelector("span");
      const progressFill = card.querySelector(".carla-progress-fill");
      const timeDisplay = card.querySelector(".carla-voice-time");
      const defaultDuration = timeDisplay.textContent;

      btn.addEventListener("click", async () => {
        if (currentVoiceAudio && currentVoiceAudio !== audio) {
          currentVoiceAudio.pause();
          currentVoiceAudio.currentTime = 0;
          if (currentVoiceBtn) {
            currentVoiceBtn.closest(".carla-voice-card")?.classList.remove("is-playing");
            currentVoiceBtn.querySelector("span").textContent = "▶";
          }
        }

        if (audio.paused) {
          pauseMusic();
          try {
            await audio.play();
            currentVoiceAudio = audio;
            currentVoiceBtn = btn;
            card.classList.add("is-playing");
            icon.textContent = "❚❚";
          } catch {
            timeDisplay.textContent = "Error";
          }
        } else {
          audio.pause();
          card.classList.remove("is-playing");
          icon.textContent = "▶";
        }
      });

      audio.addEventListener("timeupdate", () => {
        if (audio.duration) {
          const percent = (audio.currentTime / audio.duration) * 100;
          progressFill.style.width = percent + "%";
          const mins = Math.floor(audio.currentTime / 60);
          const secs = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");
          timeDisplay.textContent = mins + ":" + secs;
        }
      });

      audio.addEventListener("ended", () => {
        card.classList.remove("is-playing");
        icon.textContent = "▶";
        progressFill.style.width = "0%";
        timeDisplay.textContent = defaultDuration;
      });
    });
  }

  function initCarlaTrivia() {
    const container = $("carlaTriviaContent");
    if (!container) return;
    const questions = [
      {
        q: "¿Cuál es la palabra o concepto clave que define toda nuestra complicidad?",
        opts: ["El caos absoluto", "La chispa ✨", "Los audios de 10 minutos", "Las conversaciones formales"],
        correct: 1,
        fb: "¡Exacto! Esa chispa que solo nosotros entendemos y que lo hace todo más fácil. 💗"
      },
      {
        q: "¿Qué pasa habitualmente cuando nos ponemos a hablar sin ningún filtro?",
        opts: ["Nos aburrimos en 2 minutos", "Salen ideas absurdas, risas y proyectos como este 🚀", "Nos quedamos serios en silencio", "Se nos olvida contestar durante un mes"],
        correct: 1,
        fb: "100% verídico. De esas charlas y bromas improvisadas nació este refugio."
      },
      {
        q: "¿Qué representa principalmente este rincón secreto?",
        opts: ["Una web normal y corriente", "Un examen sorpresa de programación", "Un refugio íntimo con recuerdos al que volver cuando quieras 💗", "Un misterio sin resolver"],
        correct: 2,
        fb: "¡Justo eso! Un rincón cálido guardado para siempre, pase lo que pase."
      }
    ];

    let current = 0;
    let score = 0;
    let answered = false;

    function render() {
      if (current >= questions.length) {
        let msg = "";
        if (score === questions.length) msg = "¡Puntuación perfecta! 🌟 Conexión al 100%, nos conocemos los detalles al milímetro.";
        else if (score >= 2) msg = "¡Casi perfecto! 👏 Te sabes prácticamente todo sobre nosotros.";
        else msg = "¡Buen intento! 😂 Toca repasar recuerdos y volver a leer la carta.";

        container.innerHTML = `
          <div class="carla-trivia-result">
            <span class="carla-voice-badge">Resultado final</span>
            <h3>${score} de ${questions.length} acertadas</h3>
            <p>${msg}</p>
            <button type="button" class="glow-button" id="restartCarlaTrivia">Repetir test ↺</button>
          </div>
        `;
        $("restartCarlaTrivia")?.addEventListener("click", () => {
          current = 0; score = 0; answered = false; render();
        });
        return;
      }

      const item = questions[current];
      answered = false;
      container.innerHTML = `
        <div class="carla-trivia-header">
          <span>Pregunta ${current + 1} de ${questions.length}</span>
          <span class="carla-trivia-score-badge">Aciertos: ${score}</span>
        </div>
        <h3 class="carla-trivia-question">${item.q}</h3>
        <div class="carla-trivia-options">
          ${item.opts.map((opt, i) => `
            <button type="button" class="carla-trivia-btn" data-idx="${i}">
              <span class="carla-trivia-letter">${String.fromCharCode(65 + i)}</span>
              <span>${opt}</span>
            </button>
          `).join("")}
        </div>
        <div class="carla-trivia-feedback hidden" id="carlaFb">
          <p id="carlaFbText"></p>
          <button type="button" class="glow-button" id="carlaNextBtn" style="align-self:flex-start">
            ${current + 1 < questions.length ? "Siguiente pregunta →" : "Ver resultado final ✦"}
          </button>
        </div>
      `;

      const fb = $("carlaFb");
      const fbText = $("carlaFbText");
      const nextBtn = $("carlaNextBtn");
      const btns = container.querySelectorAll(".carla-trivia-btn");

      btns.forEach((btn) => {
        btn.addEventListener("click", () => {
          if (answered) return;
          answered = true;
          const chosen = Number(btn.dataset.idx);
          const ok = chosen === item.correct;
          if (ok) {
            score++;
            btn.classList.add("is-correct");
            fbText.innerHTML = "<strong>✨ ¡Correcto!</strong> " + item.fb;
          } else {
            btn.classList.add("is-wrong");
            btns[item.correct]?.classList.add("is-correct");
            fbText.innerHTML = "<strong>Oops!</strong> " + item.fb;
          }
          btns.forEach((b) => (b.disabled = true));
          fb.classList.remove("hidden");
        });
      });

      nextBtn?.addEventListener("click", () => {
        current++;
        render();
      });
    }

    render();
  }

  function triggerScratchSparks() {
    const wrapper = $("carlaScratchWrapper");
    const rect = wrapper ? wrapper.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 200, height: 100 };
    const icons = ["🎁", "✨", "💗", "🎉", "🎀", "💖", "🌸", "⭐"];
    for (let i = 0; i < 36; i++) {
      const s = document.createElement("span");
      s.className = "spark";
      s.textContent = icons[Math.floor(Math.random() * icons.length)];
      s.style.left = (rect.left + rect.width * (0.2 + Math.random() * 0.6)) + "px";
      s.style.top = (rect.top + rect.height * (0.2 + Math.random() * 0.6)) + "px";
      s.style.setProperty("--x", (Math.random() * 500 - 250) + "px");
      s.style.setProperty("--y", (Math.random() * -400 - 40) + "px");
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1000);
    }
  }

  function initCarlaScratch() {
    const canvas = $("carlaScratchCanvas");
    const wrapper = $("carlaScratchWrapper");
    const quickBtn = $("carlaRevealBtn");
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    let isScratching = false;
    let isRevealed = false;
    let lastX = null;
    let lastY = null;
    let strokeCount = 0;

    function reveal() {
      if (isRevealed) return;
      isRevealed = true;
      canvas.classList.add("revealed");
      if (quickBtn) quickBtn.style.display = "none";
      triggerScratchSparks();
    }

    quickBtn?.addEventListener("click", reveal);

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

    function drawMetallicCover(w, h) {
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, "#d8b4e2");
      grad.addColorStop(0.25, "#f7d6e6");
      grad.addColorStop(0.5, "#ffffff");
      grad.addColorStop(0.75, "#f5c2dd");
      grad.addColorStop(1, "#c084b0");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Shimmer sparkles
      ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
      for (let i = 0; i < 45; i++) {
        const rx = (Math.sin(i * 77 + 3) * 0.5 + 0.5) * w;
        const ry = (Math.cos(i * 41 + 5) * 0.5 + 0.5) * h;
        ctx.beginPath();
        ctx.arc(rx, ry, (i % 3) + 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Outer decorative frame
      ctx.strokeStyle = "rgba(255, 143, 199, 0.55)";
      ctx.lineWidth = 4;
      ctx.strokeRect(8, 8, w - 16, h - 16);

      // Responsive text on scratch surface
      const titleSize = Math.max(12, Math.min(18, Math.round(w / 22)));
      const subSize = Math.max(10, Math.min(14, Math.round(w / 28)));

      ctx.fillStyle = "#4a1936";
      ctx.font = `bold ${titleSize}px 'DM Sans', sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("✨ RASCA AQUÍ CON EL DEDO ✨", w / 2, h / 2 - 14);

      ctx.fillStyle = "#7a2858";
      ctx.font = `${subSize}px 'DM Sans', sans-serif`;
      ctx.fillText("Descubre tu sorpresa de cumpleaños 🎁", w / 2, h / 2 + 16);
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
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 42;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

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
      if (strokeCount % 8 !== 0 || isRevealed) return;

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

      if (transparent / totalSampled > 0.38) {
        reveal();
      }
    }

    canvas.addEventListener("pointerdown", (e) => {
      isScratching = true;
      canvas.setPointerCapture?.(e.pointerId);
      const pos = getPos(e);
      scratch(pos.x, pos.y);
    });

    canvas.addEventListener("pointermove", (e) => {
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

    canvas.addEventListener("pointerup", stopScratch);
    canvas.addEventListener("pointercancel", stopScratch);

    window.addEventListener("resize", () => {
      if (!isRevealed) resizeCanvas();
    });

    if ("IntersectionObserver" in window) {
      const ob = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !isRevealed) resizeCanvas();
        });
      }, { threshold: 0.1 });
      ob.observe(wrapper);
    }

    requestAnimationFrame(resizeCanvas);
  }

  initCarlaVoiceNotes();
  initCarlaTrivia();
  initCarlaScratch();
  loadTrack(0);
})();
