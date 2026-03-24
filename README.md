# archivo_secreto

Pagina web privada para las cartas, recuerdos, fotos, audios y videos de Carla y Alina.

## Estructura

- `index.html`: estructura principal
- `css/styles.css`: estilos responsive
- `js/content.js`: contenido editable y contraseña
- `js/app.js`: login, renderizado y modal
- `assets/media/`: carpeta para subir multimedia

## Como subir multimedia

1. Copia tus archivos a `assets/media/`.
2. Abre `js/content.js`.
3. Cambia los archivos de ejemplo por tus nombres reales.
4. Recarga la pagina.

## Importante

La contraseña actual se guarda en `js/content.js`. Eso mejora la organizacion, pero sigue siendo una proteccion de lado cliente. Si quieres seguridad real, el siguiente paso es poner autenticacion en un backend.
