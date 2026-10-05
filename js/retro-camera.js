/**
 * ==========================================================================
 * CABINA DE FOTOS RETRO & MARCO POLAROID
 * Archivo Secreto · JavaScript Interactivo
 * ==========================================================================
 */

(() => {
  'use strict';

  // Configuración de filtros
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

  class RetroCameraBooth {
    constructor() {
      this.currentStream = null;
      this.facingMode = 'user'; // 'user' (frontal) o 'environment' (trasera)
      this.activeFilter = 'chispa-rosa';
      this.capturedImage = null; // Image o Canvas con la foto capturada
      this.isMirrored = true; // Por defecto true para frontal
      this.audioCtx = null;

      this.initElements();
      if (!this.container) return;

      this.bindEvents();
      this.initDateBadge();
    }

    initElements() {
      this.container = document.getElementById('retroCameraModule');
      if (!this.container) return;

      this.video = document.getElementById('cameraVideo');
      this.standbyOverlay = document.getElementById('cameraStandby');
      this.activateBtn = document.getElementById('cameraActivateBtn');
      this.shutterBtn = document.getElementById('cameraShutterBtn');
      this.switchBtn = document.getElementById('cameraSwitchBtn');
      this.uploadBtn = document.getElementById('cameraUploadBtn');
      this.fileInput = document.getElementById('cameraFileInput');
      this.flash = document.getElementById('cameraFlash');
      this.filterChips = document.querySelectorAll('.filter-chip');

      // Elementos de la Polaroid
      this.polaroidPhotoBox = document.getElementById('polaroidPhotoBox');
      this.polaroidEmpty = document.getElementById('polaroidEmpty');
      this.polaroidImg = document.getElementById('polaroidImg');
      this.polaroidCaption = document.getElementById('polaroidCaptionInput');
      this.polaroidDate = document.getElementById('polaroidDateBadge');
      this.downloadBtn = document.getElementById('downloadPolaroidBtn');
      this.retakeBtn = document.getElementById('retakePolaroidBtn');
      this.toast = document.getElementById('cameraToast');
    }

    bindEvents() {
      // Activar cámara
      if (this.activateBtn) {
        this.activateBtn.addEventListener('click', () => this.startCamera());
      }

      // Disparador de foto
      if (this.shutterBtn) {
        this.shutterBtn.addEventListener('click', () => this.takeSnapshot());
      }

      // Cambiar entre cámara delantera y trasera
      if (this.switchBtn) {
        this.switchBtn.addEventListener('click', () => this.toggleFacingMode());
      }

      // Subir foto desde el carrete o galería
      if (this.uploadBtn && this.fileInput) {
        this.uploadBtn.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
      }

      // Selector de filtros
      this.filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
          const filterKey = chip.dataset.filter;
          if (filterKey && FILTERS[filterKey]) {
            this.setFilter(filterKey);
          }
        });
      });

      // Descargar Polaroid
      if (this.downloadBtn) {
        this.downloadBtn.addEventListener('click', () => this.downloadPolaroid());
      }

      // Repetir foto
      if (this.retakeBtn) {
        this.retakeBtn.addEventListener('click', () => this.resetSnapshot());
      }

      // Si el usuario cambia el texto, que la foto se mantenga lista
      if (this.polaroidCaption) {
        this.polaroidCaption.addEventListener('input', () => {
          if (this.capturedImage && this.downloadBtn) {
            this.downloadBtn.disabled = false;
          }
        });
      }
    }

    initDateBadge() {
      if (!this.polaroidDate) return;
      const now = new Date();
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      const formattedDate = now.toLocaleDateString('es-ES', options).toUpperCase();
      this.polaroidDate.textContent = `✦ ${formattedDate} · ARCHIVO SECRETO ✦`;
    }

    // ========================================================================
    // GESTIÓN DE CÁMARA & STREAM
    // ========================================================================
    async startCamera() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        this.showToast('Tu navegador no permite acceso directo a la cámara. Puedes subir una foto.');
        this.fallbackToUpload();
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

        if (this.standbyOverlay) {
          this.standbyOverlay.classList.add('hidden');
        }
        if (this.shutterBtn) {
          this.shutterBtn.disabled = false;
        }

        this.showToast('📸 Cámara conectada en directo');
      } catch (err) {
        console.warn('Error al acceder a la cámara:', err);
        let msg = 'No se pudo activar la cámara.';
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          msg = 'Permiso de cámara denegado. Puedes subir una foto de tu carrete.';
        }
        this.showToast(msg);
        this.fallbackToUpload();
      }
    }

    stopStream() {
      if (this.currentStream) {
        this.currentStream.getTracks().forEach(track => track.stop());
        this.currentStream = null;
      }
    }

    async toggleFacingMode() {
      this.facingMode = (this.facingMode === 'user') ? 'environment' : 'user';
      this.showToast(this.facingMode === 'user' ? '🤳 Cámara frontal' : '📷 Cámara trasera');
      await this.startCamera();
    }

    fallbackToUpload() {
      if (this.standbyOverlay) {
        this.standbyOverlay.classList.remove('hidden');
        const standbyDesc = this.standbyOverlay.querySelector('p');
        if (standbyDesc) {
          standbyDesc.textContent = 'Pulsa el botón de abajo para elegir una foto de tu carrete o galería.';
        }
      }
    }

    // ========================================================================
    // SONIDO Y FLASH DE OBTURADOR
    // ========================================================================
    playShutterSound() {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;

        if (!this.audioCtx) {
          this.audioCtx = new AudioContextClass();
        }
        if (this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }

        const ctx = this.audioCtx;
        const now = ctx.currentTime;

        // Ruido blanco para el chasquido del obturador mecánico
        const bufferSize = ctx.sampleRate * 0.07;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

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

        // Segundo clic mecánico (rebote de la cortinilla)
        setTimeout(() => {
          try {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(360, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.05);
            g.gain.setValueAtTime(0.35, ctx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
            osc.connect(g);
            g.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.05);
          } catch {}
        }, 55);
      } catch (e) {
        // Fallback silencioso
      }
    }

    triggerFlash() {
      if (!this.flash) return;
      this.flash.classList.add('flash-active');
      setTimeout(() => {
        this.flash.classList.remove('flash-active');
      }, 90);
    }

    // ========================================================================
    // TOMA DE FOTO & PROCESAMIENTO
    // ========================================================================
    takeSnapshot() {
      if (!this.video || !this.video.videoWidth) {
        this.showToast('Activa la cámara antes de disparar');
        return;
      }

      this.playShutterSound();
      this.triggerFlash();

      // Captura en canvas temporal
      const vWidth = this.video.videoWidth;
      const vHeight = this.video.videoHeight;
      const size = Math.min(vWidth, vHeight);
      const sx = (vWidth - size) / 2;
      const sy = (vHeight - size) / 2;

      const snapCanvas = document.createElement('canvas');
      snapCanvas.width = size;
      snapCanvas.height = size;
      const ctx = snapCanvas.getContext('2d');

      // Si la cámara es frontal, aplicamos espejo para que la foto quede tal como se ve en pantalla
      if (this.isMirrored) {
        ctx.translate(size, 0);
        ctx.scale(-1, 1);
      }

      ctx.drawImage(this.video, sx, sy, size, size, 0, 0, size, size);

      // Guardamos la imagen
      this.capturedImage = snapCanvas;

      // Actualizamos la Polaroid
      this.displayPolaroidImage(snapCanvas.toDataURL('image/jpeg', 0.95));
      this.showToast('✨ Polaroid revelada. ¡Lista para descargar!');
    }

    handleFileUpload(event) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Crear canvas cuadrado centrado
          const size = Math.min(img.width, img.height);
          const sx = (img.width - size) / 2;
          const sy = (img.height - size) / 2;

          const snapCanvas = document.createElement('canvas');
          snapCanvas.width = size;
          snapCanvas.height = size;
          const ctx = snapCanvas.getContext('2d');
          ctx.drawImage(img, sx, sy, size, size, 0, 0, size, size);

          this.capturedImage = snapCanvas;
          this.isMirrored = false; // Foto de galería sin espejo

          this.displayPolaroidImage(snapCanvas.toDataURL('image/jpeg', 0.95));
          this.showToast('🖼️ Foto cargada en la Polaroid');
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    displayPolaroidImage(dataUrl) {
      if (this.polaroidEmpty) this.polaroidEmpty.style.display = 'none';
      if (this.polaroidImg) {
        this.polaroidImg.src = dataUrl;
        this.polaroidImg.style.display = 'block';
        this.applyFilterClasses();
      }
      if (this.downloadBtn) this.downloadBtn.disabled = false;
      if (this.retakeBtn) this.retakeBtn.style.display = 'inline-flex';
    }

    resetSnapshot() {
      this.capturedImage = null;
      if (this.polaroidImg) {
        this.polaroidImg.src = '';
        this.polaroidImg.style.display = 'none';
      }
      if (this.polaroidEmpty) {
        this.polaroidEmpty.style.display = 'flex';
      }
      if (this.downloadBtn) {
        this.downloadBtn.disabled = true;
      }
      if (this.retakeBtn) {
        this.retakeBtn.style.display = 'none';
      }

      if (!this.currentStream) {
        this.startCamera();
      } else {
        this.showToast('Listo para una nueva foto');
      }
    }

    // ========================================================================
    // FILTROS
    // ========================================================================
    setFilter(filterKey) {
      if (!FILTERS[filterKey]) return;
      this.activeFilter = filterKey;

      // Actualizar chips activos
      this.filterChips.forEach(chip => {
        chip.classList.toggle('active', chip.dataset.filter === filterKey);
      });

      this.applyFilterClasses();
      this.showToast(`Filtro: ${FILTERS[filterKey].name}`);
    }

    applyFilterClasses() {
      const activeObj = FILTERS[this.activeFilter] || FILTERS['natural'];

      // Limpiar clases anteriores de video y polaroidImg
      Object.values(FILTERS).forEach(f => {
        if (this.video) this.video.classList.remove(f.cssClass);
        if (this.polaroidImg) this.polaroidImg.classList.remove(f.cssClass);
      });

      // Añadir la clase activa
      if (this.video) this.video.classList.add(activeObj.cssClass);
      if (this.polaroidImg) this.polaroidImg.classList.add(activeObj.cssClass);
    }

    // ========================================================================
    // DESCARGA DE POLAROID EN ALTA DEFINICIÓN (CANVAS)
    // ========================================================================
    async downloadPolaroid() {
      if (!this.capturedImage) {
        this.showToast('Primero saca una foto o sube una imagen');
        return;
      }

      this.showToast('Generando Polaroid HD...');
      if (document.fonts && document.fonts.ready) {
        try {
          await document.fonts.ready;
        } catch {}
      }

      // Dimensiones de alta resolución para Polaroid (1200 x 1500 px)
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 1500;
      const ctx = canvas.getContext('2d');

      // 1. Fondo de papel Polaroid blanco cálido
      ctx.fillStyle = '#faf8f5';
      this.drawRoundedRect(ctx, 0, 0, 1200, 1500, 24);
      ctx.fill();

      // Borde sutil del papel
      ctx.strokeStyle = '#e9e3da';
      ctx.lineWidth = 2;
      this.drawRoundedRect(ctx, 1, 1, 1198, 1498, 24);
      ctx.stroke();

      // 2. Cinta adhesiva washi tape arriba al centro
      ctx.save();
      ctx.translate(600, 38);
      ctx.rotate((-1.5 * Math.PI) / 180);
      ctx.fillStyle = 'rgba(255, 215, 235, 0.72)';
      this.drawRoundedRect(ctx, -120, -18, 240, 48, 4);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 155, 205, 0.5)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      this.drawRoundedRect(ctx, -120, -18, 240, 48, 4);
      ctx.stroke();
      ctx.restore();

      // 3. Recuadro de la foto (1020 x 1020 px cuadrado)
      const photoX = 90;
      const photoY = 100;
      const photoSize = 1020;

      // Fondo oscuro detrás de la foto
      ctx.fillStyle = '#180e1a';
      this.drawRoundedRect(ctx, photoX, photoY, photoSize, photoSize, 6);
      ctx.fill();

      // Dibujar la foto con el filtro activo aplicado
      ctx.save();
      this.drawRoundedRect(ctx, photoX, photoY, photoSize, photoSize, 6);
      ctx.clip();

      const activeFilterObj = FILTERS[this.activeFilter] || FILTERS['natural'];
      if (activeFilterObj.canvasFilter && activeFilterObj.canvasFilter !== 'none') {
        ctx.filter = activeFilterObj.canvasFilter;
      }

      ctx.drawImage(this.capturedImage, photoX, photoY, photoSize, photoSize);
      ctx.restore();

      // Sombra interior sutil alrededor de la foto
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
      ctx.lineWidth = 3;
      this.drawRoundedRect(ctx, photoX, photoY, photoSize, photoSize, 6);
      ctx.stroke();

      // 4. Texto de la dedicatoria (Caption)
      const captionText = (this.polaroidCaption?.value || 'Un recuerdo para siempre 💗').trim();
      ctx.fillStyle = '#2b1825';
      ctx.font = 'bold 50px "Playfair Display", Georgia, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(captionText, 600, 1260);

      // 5. Fecha y sello del archivo
      const now = new Date();
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      const formattedDate = now.toLocaleDateString('es-ES', options).toUpperCase();
      const dateText = `✦ ${formattedDate} · ARCHIVO SECRETO ✦`;

      ctx.fillStyle = '#8c6a7e';
      ctx.font = '600 24px "DM Sans", Arial, sans-serif';
      ctx.fillText(dateText, 600, 1345);

      // 6. Descarga directa del archivo
      try {
        canvas.toBlob((blob) => {
          if (!blob) {
            this.showToast('No se pudo exportar la imagen.');
            return;
          }
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          const cleanDate = now.toISOString().slice(0, 10);
          link.download = `polaroid-recuerdo-${cleanDate}.png`;
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => URL.revokeObjectURL(url), 4000);
          this.showToast('🎉 ¡Polaroid guardada en tu dispositivo!');
        }, 'image/png');
      } catch (err) {
        console.error('Error al generar la descarga:', err);
        this.showToast('Error al descargar la foto');
      }
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
    // TOAST NOTIFICATIONS
    // ========================================================================
    showToast(message) {
      if (!this.toast) return;
      this.toast.textContent = message;
      this.toast.classList.add('show');
      clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => {
        this.toast.classList.remove('show');
      }, 3200);
    }
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new RetroCameraBooth());
  } else {
    new RetroCameraBooth();
  }
})();
