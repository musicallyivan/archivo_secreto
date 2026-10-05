/**
 * ==========================================================================
 * MURAL DE FOTOS SECRETO
 * Archivo Secreto · Autoguardado & Sincronización
 * ==========================================================================
 */

(() => {
  'use strict';

  const API = (window.CARLA_API_URL || 'https://archivo-secreto-api.onrender.com').replace(/\/$/, '');
  const DB_NAME = 'archivo_secreto_mural_db';
  const DB_VERSION = 1;
  const STORE_NAME = 'photos';

  const FILTERS = {
    'chispa-rosa': {
      name: '🌸 Chispa Rosa',
      cssClass: 'filter-chispa-rosa',
      canvasFilter: 'sepia(0.22) saturate(1.3) hue-rotate(-12deg) contrast(1.06) brightness(1.02)'
    },
    'retro-90s': {
      name: '🎞️ Retro 90s',
      cssClass: 'filter-retro-90s',
      canvasFilter: 'sepia(0.42) contrast(1.18) brightness(0.94) saturate(1.22)'
    },
    'noir': {
      name: '🖤 Noir Clásico',
      cssClass: 'filter-noir',
      canvasFilter: 'grayscale(1) contrast(1.28) brightness(0.96)'
    },
    'golden': {
      name: '✨ Golden Hour',
      cssClass: 'filter-golden',
      canvasFilter: 'sepia(0.32) saturate(1.45) brightness(1.06) contrast(1.03)'
    },
    'pastel': {
      name: '🌿 Pastel Dream',
      cssClass: 'filter-pastel',
      canvasFilter: 'brightness(1.07) contrast(0.96) saturate(1.15) hue-rotate(5deg)'
    },
    'natural': {
      name: '📷 Natural',
      cssClass: 'filter-natural',
      canvasFilter: 'none'
    }
  };

  class MuralApp {
    constructor() {
      this.db = null;
      this.photos = [];
      this.currentStream = null;
      this.facingMode = 'user';
      this.isMirrored = true;
      this.activeFilter = 'chispa-rosa';
      this.currentAuthor = 'Carla';
      this.filterWallAuthor = 'todos';
      this.audioCtx = null;
      this.capturedSquare = null;

      this.initElements();
      this.initIndexedDB().then(() => {
        this.loadLocalPhotos();
        this.fetchServerPhotos();
      });
      this.bindEvents();
    }

    // ========================================================================
    // INDEXEDDB ENGINE (PERSISTENCIA LOCAL INMEDIATA)
    // ========================================================================
    initIndexedDB() {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          console.warn('IndexedDB no soportado en este navegador');
          resolve();
          return;
        }
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            const store = db.createObjectStore(STORE_NAME, { keyPath: 'local_id', autoIncrement: true });
            store.createIndex('id', 'id', { unique: false });
            store.createIndex('created_at', 'created_at', { unique: false });
          }
        };
        request.onsuccess = (e) => {
          this.db = e.target.result;
          resolve();
        };
        request.onerror = () => {
          console.warn('Error al abrir IndexedDB');
          resolve();
        };
      });
    }

    saveLocalRecord(photo) {
      if (!this.db) return Promise.resolve();
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          store.put(photo);
          tx.oncomplete = () => resolve();
          tx.onerror = () => resolve();
        } catch {
          resolve();
        }
      });
    }

    getAllLocalRecords() {
      if (!this.db) return Promise.resolve([]);
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction(STORE_NAME, 'readonly');
          const store = tx.objectStore(STORE_NAME);
          const req = store.getAll();
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => resolve([]);
        } catch {
          resolve([]);
        }
      });
    }

    deleteLocalRecord(id) {
      if (!this.db) return Promise.resolve();
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          const req = store.openCursor();
          req.onsuccess = (e) => {
            const cursor = e.target.result;
            if (cursor) {
              if (String(cursor.value.id) === String(id) || String(cursor.value.local_id) === String(id)) {
                cursor.delete();
              }
              cursor.continue();
            } else {
              resolve();
            }
          };
          req.onerror = () => resolve();
        } catch {
          resolve();
        }
      });
    }

    async loadLocalPhotos() {
      const locals = await this.getAllLocalRecords();
      if (locals.length > 0) {
        // Ordenar del más reciente al más antiguo
        this.photos = locals.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        this.renderMural();
      }
    }

    // ========================================================================
    // SINCRONIZACIÓN CON EL SERVIDOR (RENDER + POSTGRESQL)
    // ========================================================================
    async fetchServerPhotos() {
      this.updateStatusBadge('syncing', 'Sincronizando mural...');
      try {
        const res = await fetch(`${API}/api/mural-photos`);
        if (!res.ok) throw new Error('Servidor no disponible');
        const remotePhotos = await res.json();

        if (Array.isArray(remotePhotos)) {
          // Fusionar con fotos locales y guardar en IndexedDB
          this.photos = remotePhotos;
          for (const p of remotePhotos) {
            await this.saveLocalRecord(p);
          }
          this.renderMural();
          this.updateStatusBadge('online', '🟢 Conectado con la nube');
        }
      } catch (err) {
        console.warn('Servidor en espera o sin conexión:', err);
        this.updateStatusBadge('local', '🟡 Guardando en este dispositivo');
      }
    }

    updateStatusBadge(state, text) {
      const dot = document.getElementById('statusDot');
      const label = document.getElementById('statusText');
      if (!dot || !label) return;

      dot.className = 'status-dot';
      if (state === 'syncing') {
        dot.classList.add('syncing');
      } else if (state === 'local') {
        dot.style.background = '#ffb300';
        dot.style.boxShadow = '0 0 8px #ffb300';
      } else {
        dot.style.background = '#38ef7d';
        dot.style.boxShadow = '0 0 8px #38ef7d';
      }
      label.textContent = text;
    }

    // ========================================================================
    // ELEMENTOS & EVENTOS
    // ========================================================================
    initElements() {
      // Autor selector
      this.authorChips = document.querySelectorAll('.author-chip');

      // Visor de cámara
      this.video = document.getElementById('boothVideo');
      this.standby = document.getElementById('boothStandby');
      this.activateBtn = document.getElementById('activateBoothBtn');
      this.shutterBtn = document.getElementById('boothShutterBtn');
      this.switchBtn = document.getElementById('switchCameraBtn');
      this.uploadBtn = document.getElementById('uploadPhotoBtn');
      this.fileInput = document.getElementById('fileInput');
      this.flash = document.getElementById('boothFlash');
      this.filterPills = document.querySelectorAll('.filter-pill');

      // Previsualización de Polaroid
      this.previewPhotoBox = document.getElementById('previewPhotoBox');
      this.previewImg = document.getElementById('previewImg');
      this.previewEmpty = document.getElementById('previewEmpty');
      this.captionInput = document.getElementById('boothCaptionInput');
      this.hangBtn = document.getElementById('hangOnWallBtn');

      // Mural Board
      this.muralBoard = document.getElementById('muralBoard');
      this.photoCountPill = document.getElementById('photoCountPill');
      this.wallFilterBtns = document.querySelectorAll('.wall-filter-btn');

      // Lightbox
      this.lightbox = document.getElementById('muralLightbox');
      this.lightboxClose = document.getElementById('lightboxClose');
      this.lightboxImg = document.getElementById('lightboxImg');
      this.lightboxCaption = document.getElementById('lightboxCaption');
      this.lightboxMeta = document.getElementById('lightboxMeta');
      this.lightboxDownload = document.getElementById('lightboxDownload');

      // Toast
      this.toast = document.getElementById('muralToast');
    }

    bindEvents() {
      // Selector de autor
      this.authorChips.forEach(chip => {
        chip.addEventListener('click', () => {
          this.authorChips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          this.currentAuthor = chip.dataset.author || 'Carla';
          this.showToast(`Colgando fotos como: ${this.currentAuthor}`);
        });
      });

      // Encender cámara
      if (this.activateBtn) {
        this.activateBtn.addEventListener('click', () => this.startCamera());
      }

      // Cambiar cámara
      if (this.switchBtn) {
        this.switchBtn.addEventListener('click', () => this.toggleCamera());
      }

      // Disparador de foto
      if (this.shutterBtn) {
        this.shutterBtn.addEventListener('click', () => this.capturePhoto());
      }

      // Subir archivo de galería
      if (this.uploadBtn && this.fileInput) {
        this.uploadBtn.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
      }

      // Filtros
      this.filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
          this.setFilter(pill.dataset.filter);
        });
      });

      // Botón: ¡Colgar en el mural! (Autoguardado)
      if (this.hangBtn) {
        this.hangBtn.addEventListener('click', () => this.hangPhotoOnWall());
      }

      // Filtros del mural (Todas, Carla, Alina, Iván)
      this.wallFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.wallFilterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.filterWallAuthor = btn.dataset.wallFilter || 'todos';
          this.renderMural();
        });
      });

      // Lightbox close
      if (this.lightboxClose) {
        this.lightboxClose.addEventListener('click', () => this.closeLightbox());
      }
      if (this.lightbox) {
        this.lightbox.addEventListener('click', (e) => {
          if (e.target === this.lightbox) this.closeLightbox();
        });
      }
    }

    // ========================================================================
    // CÁMARA
    // ========================================================================
    async startCamera() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        this.showToast('Cámara directa no disponible. Puedes subir una foto.');
        return;
      }

      this.stopStream();
      const constraints = {
        video: {
          facingMode: this.facingMode,
          width: { ideal: 1080 },
          height: { ideal: 1080 }
        },
        audio: false
      };

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        this.currentStream = stream;
        this.video.srcObject = stream;
        await this.video.play();

        this.isMirrored = (this.facingMode === 'user');
        this.video.classList.toggle('mirrored', this.isMirrored);

        if (this.standby) this.standby.classList.add('hidden');
        if (this.shutterBtn) this.shutterBtn.disabled = false;
        this.showToast('📸 Cámara conectada');
      } catch (err) {
        console.warn('Error al activar cámara:', err);
        this.showToast('No se pudo acceder a la cámara. Usa el botón de subir foto.');
      }
    }

    stopStream() {
      if (this.currentStream) {
        this.currentStream.getTracks().forEach(t => t.stop());
        this.currentStream = null;
      }
    }

    async toggleCamera() {
      this.facingMode = (this.facingMode === 'user') ? 'environment' : 'user';
      this.showToast(this.facingMode === 'user' ? '🤳 Cámara frontal' : '📷 Cámara trasera');
      await this.startCamera();
    }

    playShutterSound() {
      try {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioClass) return;
        if (!this.audioCtx) this.audioCtx = new AudioClass();
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

        const ctx = this.audioCtx;
        const now = ctx.currentTime;
        const bufferSize = ctx.sampleRate * 0.07;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400, now);
        filter.Q.setValueAtTime(3.5, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.8, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(now);
      } catch {}
    }

    triggerFlash() {
      if (!this.flash) return;
      this.flash.classList.add('active');
      setTimeout(() => this.flash.classList.remove('active'), 90);
    }

    setFilter(filterKey) {
      if (!FILTERS[filterKey]) return;
      this.activeFilter = filterKey;
      this.filterPills.forEach(p => p.classList.toggle('active', p.dataset.filter === filterKey));

      Object.values(FILTERS).forEach(f => {
        if (this.video) this.video.classList.remove(f.cssClass);
        if (this.previewImg) this.previewImg.classList.remove(f.cssClass);
      });

      const active = FILTERS[filterKey];
      if (this.video) this.video.classList.add(active.cssClass);
      if (this.previewImg) this.previewImg.classList.add(active.cssClass);
      this.showToast(`Filtro: ${active.name}`);
    }

    // ========================================================================
    // CAPTURA Y AUTO-REVELADO
    // ========================================================================
    capturePhoto() {
      if (!this.video || !this.video.videoWidth) {
        this.showToast('Primero activa la cámara');
        return;
      }

      this.playShutterSound();
      this.triggerFlash();

      const vWidth = this.video.videoWidth;
      const vHeight = this.video.videoHeight;
      const size = Math.min(vWidth, vHeight);
      const sx = (vWidth - size) / 2;
      const sy = (vHeight - size) / 2;

      const snapCanvas = document.createElement('canvas');
      snapCanvas.width = size;
      snapCanvas.height = size;
      const ctx = snapCanvas.getContext('2d');

      if (this.isMirrored) {
        ctx.translate(size, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(this.video, sx, sy, size, size, 0, 0, size, size);

      this.capturedSquare = snapCanvas;
      this.displayPreview(snapCanvas.toDataURL('image/jpeg', 0.95));
      this.showToast('✨ Foto capturada. ¡Pulsa "Colgar en el mural"!');
    }

    handleFileUpload(e) {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const size = Math.min(img.width, img.height);
          const sx = (img.width - size) / 2;
          const sy = (img.height - size) / 2;

          const snapCanvas = document.createElement('canvas');
          snapCanvas.width = size;
          snapCanvas.height = size;
          const ctx = snapCanvas.getContext('2d');
          ctx.drawImage(img, sx, sy, size, size, 0, 0, size, size);

          this.capturedSquare = snapCanvas;
          this.displayPreview(snapCanvas.toDataURL('image/jpeg', 0.95));
          this.showToast('🖼️ Foto cargada en la Polaroid');
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }

    displayPreview(dataUrl) {
      if (this.previewEmpty) this.previewEmpty.style.display = 'none';
      if (this.previewImg) {
        this.previewImg.src = dataUrl;
        this.previewImg.style.display = 'block';
        this.previewImg.className = FILTERS[this.activeFilter]?.cssClass || '';
      }
      if (this.hangBtn) this.hangBtn.disabled = false;
    }

    // ========================================================================
    // AUTOGUARDADO EN LA WEB & COLGADO EN EL MURAL
    // ========================================================================
    async hangPhotoOnWall() {
      if (!this.capturedSquare) {
        this.showToast('Saca una foto antes de colgarla');
        return;
      }

      this.hangBtn.disabled = true;
      this.hangBtn.innerHTML = '⏳ Revelando y guardando...';

      // 1. Generar la Polaroid completa compuesta en alta definición (Canvas 720x900)
      const composedDataUrl = await this.renderPolaroidCanvas(this.capturedSquare);

      const now = new Date();
      const caption = (this.captionInput?.value || 'Un recuerdo para siempre 💗').trim();
      const newPhoto = {
        id: 'local_' + Date.now(),
        author: this.currentAuthor,
        caption: caption,
        filter: this.activeFilter,
        image_data: composedDataUrl,
        created_at: now.toISOString()
      };

      // 2. Guardar inmediatamente en IndexedDB (Persistencia local)
      await this.saveLocalRecord(newPhoto);

      // 3. Añadir a la lista en memoria y actualizar vista al instante
      this.photos.unshift(newPhoto);
      this.renderMural();

      // Desplazar suavemente hacia el mural
      document.getElementById('muralSection')?.scrollIntoView({ behavior: 'smooth' });
      this.showToast(`🎉 ¡Foto guardada y colgada en el mural por ${this.currentAuthor}!`);

      // 4. Subir al servidor en segundo plano
      try {
        const res = await fetch(`${API}/api/mural-photos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            author: this.currentAuthor,
            caption: caption,
            filter: this.activeFilter,
            image_data: composedDataUrl
          })
        });

        if (res.ok) {
          const savedServerPhoto = await res.json();
          // Actualizar ID temporal con el ID oficial de la base de datos
          newPhoto.id = savedServerPhoto.id;
          await this.saveLocalRecord(newPhoto);
          this.updateStatusBadge('online', '🟢 Conectado con la nube');
        }
      } catch (err) {
        console.warn('No se pudo subir al servidor ahora. Queda a salvo en local:', err);
        this.updateStatusBadge('local', '🟡 Guardada en este dispositivo');
      } finally {
        this.hangBtn.disabled = false;
        this.hangBtn.innerHTML = '📌 ¡Colgar en el mural!';
      }
    }

    // Renderiza la Polaroid completa (con papel blanco, washi tape, texto y fecha)
    renderPolaroidCanvas(squareImgCanvas) {
      return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 1000;
        const ctx = canvas.getContext('2d');

        // Papel blanco crema
        ctx.fillStyle = '#faf8f5';
        this.drawRoundedRect(ctx, 0, 0, 800, 1000, 16);
        ctx.fill();

        // Borde fino
        ctx.strokeStyle = '#e8e2d8';
        ctx.lineWidth = 2;
        this.drawRoundedRect(ctx, 1, 1, 798, 998, 16);
        ctx.stroke();

        // Washi tape decorativa arriba
        ctx.save();
        ctx.translate(400, 24);
        ctx.rotate((-1.5 * Math.PI) / 180);
        ctx.fillStyle = 'rgba(255, 215, 235, 0.72)';
        this.drawRoundedRect(ctx, -75, -12, 150, 32, 4);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 155, 205, 0.45)';
        ctx.setLineDash([5, 3]);
        this.drawRoundedRect(ctx, -75, -12, 150, 32, 4);
        ctx.stroke();
        ctx.restore();

        // Recuadro cuadrado de la foto (680 x 680 px)
        const photoX = 60;
        const photoY = 65;
        const photoSize = 680;

        ctx.fillStyle = '#180e1a';
        this.drawRoundedRect(ctx, photoX, photoY, photoSize, photoSize, 4);
        ctx.fill();

        // Dibujar foto con el filtro activo
        ctx.save();
        this.drawRoundedRect(ctx, photoX, photoY, photoSize, photoSize, 4);
        ctx.clip();

        const activeObj = FILTERS[this.activeFilter] || FILTERS['natural'];
        if (activeObj.canvasFilter && activeObj.canvasFilter !== 'none') {
          ctx.filter = activeObj.canvasFilter;
        }
        ctx.drawImage(squareImgCanvas, photoX, photoY, photoSize, photoSize);
        ctx.restore();

        // Sombra de foto
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.lineWidth = 2;
        this.drawRoundedRect(ctx, photoX, photoY, photoSize, photoSize, 4);
        ctx.stroke();

        // Dedicatoria / Caption
        const caption = (this.captionInput?.value || 'Un recuerdo para siempre 💗').trim();
        ctx.fillStyle = '#2b1825';
        ctx.font = 'bold 36px "Playfair Display", Georgia, serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(caption, 400, 835);

        // Autor y fecha
        const now = new Date();
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const dateStr = now.toLocaleDateString('es-ES', options).toUpperCase();
        const metaStr = `✦ ${dateStr} · POR ${this.currentAuthor.toUpperCase()} ✦`;

        ctx.fillStyle = '#8c6a7e';
        ctx.font = '600 18px "DM Sans", Arial, sans-serif';
        ctx.fillText(metaStr, 400, 905);

        resolve(canvas.toDataURL('image/jpeg', 0.88));
      });
    }

    drawRoundedRect(ctx, x, y, width, height, radius) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    }

    // ========================================================================
    // RENDERIZADO DEL MURAL
    // ========================================================================
    renderMural() {
      if (!this.muralBoard) return;

      // Filtrar fotos por autor si se seleccionó una pestaña
      const filtered = this.photos.filter(p => {
        if (this.filterWallAuthor === 'todos') return true;
        return (p.author || '').toLowerCase() === this.filterWallAuthor.toLowerCase();
      });

      if (this.photoCountPill) {
        this.photoCountPill.textContent = `${this.photos.length} recuerdos`;
      }

      if (filtered.length === 0) {
        this.muralBoard.innerHTML = `
          <div class="mural-empty-state">
            <span>📷</span>
            <h3>Aún no hay fotos en este mural</h3>
            <p>Usa la cabina de arriba para sacar una foto o subir una de tu galería. ¡Se guardará automáticamente en el mural para todos!</p>
          </div>
        `;
        return;
      }

      this.muralBoard.innerHTML = '';
      filtered.forEach((photo, idx) => {
        const item = document.createElement('article');
        item.className = 'polaroid-card mural-item';

        // Ligera rotación aleatoria para aspecto de corcho real (-2.5 a 2.5 grados)
        const rot = ((idx % 7) - 3) * 0.9;
        item.style.setProperty('--rot', `${rot}deg`);

        const dateStr = photo.created_at
          ? new Date(photo.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
          : 'Recuerdo';

        item.innerHTML = `
          <div class="polaroid-tape"></div>
          <div class="mural-item-toolbar">
            <button type="button" class="toolbar-btn view-btn" title="Ver grande">🔍</button>
            <button type="button" class="toolbar-btn download-btn" title="Descargar">💾</button>
            <button type="button" class="toolbar-btn delete-btn" title="Eliminar del mural">🗑️</button>
          </div>
          <div class="polaroid-photo">
            <img src="${photo.image_data}" alt="${photo.caption || 'Foto del mural'}" loading="lazy" />
          </div>
          <div class="polaroid-footer">
            <p class="polaroid-caption">${photo.caption || 'Recuerdo especial'}</p>
            <span class="polaroid-meta">
              <strong class="polaroid-author-badge">✦ ${photo.author || 'Anónimo'}</strong> · ${dateStr}
            </span>
          </div>
        `;

        // Eventos de los botones de cada polaroid
        item.querySelector('.view-btn').addEventListener('click', () => this.openLightbox(photo));
        item.querySelector('.download-btn').addEventListener('click', () => this.downloadPhoto(photo));
        item.querySelector('.delete-btn').addEventListener('click', () => this.confirmDelete(photo));

        // Click en la foto también abre el lightbox
        item.querySelector('.polaroid-photo').addEventListener('click', () => this.openLightbox(photo));

        this.muralBoard.appendChild(item);
      });
    }

    // ========================================================================
    // DESCARGA Y ELIMINACIÓN
    // ========================================================================
    downloadPhoto(photo) {
      const link = document.createElement('a');
      link.href = photo.image_data;
      link.download = `polaroid-${photo.author || 'recuerdo'}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.showToast('💾 Foto descargada en tu dispositivo');
    }

    async confirmDelete(photo) {
      const ok = confirm(`¿Quieres eliminar esta foto del mural de ${photo.author}?`);
      if (!ok) return;

      // 1. Eliminar local
      await this.deleteLocalRecord(photo.id);
      this.photos = this.photos.filter(p => p.id !== photo.id);
      this.renderMural();
      this.showToast('🗑️ Foto eliminada del mural');

      // 2. Eliminar del servidor si tiene ID numérico
      if (photo.id && !String(photo.id).startsWith('local_')) {
        try {
          await fetch(`${API}/api/mural-photos/${photo.id}`, { method: 'DELETE' });
        } catch {}
      }
    }

    // ========================================================================
    // LIGHTBOX
    // ========================================================================
    openLightbox(photo) {
      if (!this.lightbox) return;
      this.lightboxImg.src = photo.image_data;
      this.lightboxCaption.textContent = photo.caption || 'Recuerdo especial';
      this.lightboxMeta.textContent = `Foto de ${photo.author} · ${new Date(photo.created_at).toLocaleDateString('es-ES')}`;
      this.lightboxDownload.onclick = () => this.downloadPhoto(photo);
      this.lightbox.classList.add('active');
    }

    closeLightbox() {
      if (this.lightbox) this.lightbox.classList.remove('active');
    }

    // ========================================================================
    // TOAST
    // ========================================================================
    showToast(msg) {
      if (!this.toast) return;
      this.toast.textContent = msg;
      this.toast.classList.add('show');
      clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => this.toast.classList.remove('show'), 3400);
    }
  }

  // Inicializar al cargar el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new MuralApp());
  } else {
    new MuralApp();
  }
})();
