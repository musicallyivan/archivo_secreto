# Archivo Secreto ✦

Página web privada e interactiva para las cartas, recuerdos, fotos, audios y vídeos de Carla y Alina.

---

## 📁 Estructura del Proyecto

### Páginas Principales
- `index.html`: Portal de acceso y selector privado por contraseña y perfil.
- `cumple-carla.html`: Rincón interactivo de Carla (carta mecanografiada, notas de voz, trivia, tarjeta rasca y gana, polaroids 3D).
- `cumple-alina.html`: Rincón interactivo de Alina (carta, galería de recuerdos, reproductor de música y cápsula del tiempo).
- `mural.html`: Mural compartido de fotos con autoguardado en la nube (PostgreSQL/Render) y cabina Polaroid retro.

### Estilos (`css/`)
- `css/styles.css`: Estilos principales, tema del portal y diseño responsive.
- `css/cumple-carla.css` / `css/cumple-alina.css`: Temas y paletas personalizadas por perfil.
- `css/carla-extras.css` / `css/alina-modes.css`: Modos ambientales (Cute, Party, Relax) y modo noche.
- `css/mural.css` / `css/retro-camera.css`: Cabina Polaroid y tablón del mural.

### Lógica (`js/`)
- `js/content.js`: Configuración de claves, cartas, multimedia y textos editables.
- `js/app.js`: Lógica de autenticación, transiciones y sistema de valoración.
- `js/cumple-carla.js`: Lógica completa de Carla (reproductor musical, trivia interactiva, notas de voz, rascador y polaroids).
- `js/cumple-alina.js`: Lógica de Alina (modos de color, mensaje al futuro y lightbox).
- `js/mural.js`: Motor del mural con sincronización en tiempo real con la API y persistencia en IndexedDB.
- `js/retro-camera.js`: Control de cámara web, flash, filtros en tiempo real y descarga polaroid HD.
- `js/pwa-update.js`: Detector de actualizaciones y control de ciclo de vida del Service Worker.
- `sw.js`: Service Worker PWA con estrategia cache-first y soporte para streaming de medios.

### Backend (`server/`)
- `server/src/server.js`: API REST en Express y Node.js conectada a PostgreSQL para autoguardado de fotos y mensajes al futuro.
- `render.yaml`: Manifiesto de despliegue automático en Render (`archivo-secreto-api-v3`).

---

## ⚡ Optimizaciones de Rendimiento (v13)

- **Carga diferida de imágenes (`loading="lazy"` & `decoding="async"`):** Todas las fotos de las galerías Polaroid solo se descargan cuando el usuario hace scroll hasta ellas, acelerando la carga inicial drásticamente en dispositivos móviles.
- **Modularización de JavaScript:** Extracción del código inline a `js/cumple-carla.js`, reduciendo el peso de `cumple-carla.html` de 58 KB a 32 KB y permitiendo caché HTTP y PWA independiente.
- **Eliminación de bloqueo de renderizado:** Atributos `defer` en todos los scripts de la aplicación para que el navegador construya el DOM inmediatamente sin pausas.
- **Precarga inteligente de audio:** Modificado `preload="auto"` por `preload="none"` / `preload="metadata"` para no consumir datos de canciones hasta que el usuario decida reproducirlas.
- **Service Worker robusto (v13):** Cacheado offline de todos los recursos esenciales y bypass automático de peticiones con cabecera `Range` para garantizar fluidez en la reproducción y avance de pistas de audio y vídeo.
- **CI/CD optimizado:** Automatización de despliegue en GitHub Pages mediante GitHub Actions compatible con ejecuciones en Windows Services (`cmd.exe`).

---

## ✨ Características Destacadas

1. **Mural de Fotos Secreto:** Fotos sincronizadas en la nube (PostgreSQL en Render) con respaldo local inmediato en IndexedDB.
2. **Cabina Polaroid Retro:** Filtros en tiempo real (Chispa Rosa, Retro 90s, Noir, Golden Hour, Pastel Dream), flash, captura frontal/trasera y descarga en alta resolución con marco polaroid.
3. **Cápsula del Tiempo:** Espacio para escribir mensajes a la versión futura de cada perfil guardados en la nube.
4. **Tarjetas Interactivas y Rascador:** Efecto de rascar interactivo con partículas para descubrir sorpresas.
5. **Trivia y Notas de Voz:** Minijuegos de complicidad con feedback inmediato y reproductor de audios personalizado.
6. **Experiencia PWA Instalable:** Acceso directo como aplicación en iOS y Android con icono personalizado y funcionamiento offline.

---

### © 2026 Ivan. TODOS LOS DERECHOS RESERVADOS
