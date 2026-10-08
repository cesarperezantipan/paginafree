# 🔥 Fuego Squad — Fan page de Free Fire

Proyecto web con HTML, CSS y JavaScript puro. No necesita instalar nada.

## Qué incluye
- **Interactividad:** juego de puntería (clics y tecla Espacio), cartas que giran, equipo con drag-and-drop, atajos de teclado 1-6, validación del apodo.
- **Estilo:** Flexbox y Grid, animaciones con `@keyframes` y transiciones, diseño responsivo con media queries.
- **API externa:** [open.er-api.com](https://www.exchangerate-api.com/docs/free) (gratis, sin clave) para el precio del dólar en varias monedas y un conversor.
- **Armería 3D:** visor con [three.js](https://threejs.org/) para girar, acercar y cambiar entre AK, MP40, XM8 y AWM. Los modelos y texturas van incrustados en `models.js`, así que funciona con doble clic. Necesita internet solo para cargar three.js desde una CDN.
- **Personalización:** apodo y color del equipo, guardados con `localStorage` junto con tu récord y tu equipo.

## Cómo probarlo
Abre `index.html` en el navegador (doble clic).

## Cómo subirlo a GitHub
1. Crea un repositorio nuevo en github.com (por ejemplo `free-fire-fan`).
2. En la carpeta del proyecto, ejecuta:
   ```bash
   git init
   git add .
   git commit -m "Primera versión de Fuego Squad"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/free-fire-fan.git
   git push -u origin main
   ```
3. Para publicarlo en línea: en el repositorio ve a **Settings → Pages**, elige **Deploy from a branch**, rama `main`, carpeta `/ (root)` y guarda. En unos minutos tendrás un enlace público.

## Personaliza
- Cambia el nombre "Fuego Squad" en `index.html`.
- Edita los colores en las variables `:root` de `style.css`.
- Agrega personajes o armas en las listas `chars` y `guns` de `script.js`.

*Proyecto de fans, no oficial. Free Fire es una marca de Garena.*
