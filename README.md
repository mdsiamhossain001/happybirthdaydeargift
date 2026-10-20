# Birthday Gift Website

A mobile-first birthday gift website with an animated book, star field, fireworks, floating hearts, optional Matrix effect API, music file selection, personal message, image/GIF URL, theme choices, language toggle, countdown and share button.

## Files
- `index.html` — page structure
- `css/index.css` — all styling and animations
- `js/lang.js` — English/Bangla text toggle
- `js/effects.js` — stars, fireworks, hearts and Matrix effect
- `js/settings.js` — personal settings and local browser storage
- `js/main.js` — book navigation, music, countdown and share interactions

## Run
Open `index.html` in a modern browser, or upload the files preserving the folder structure to GitHub Pages or Vercel.

## Important notes
- Settings are saved in the current browser using localStorage; they are not synced across devices.
- Choose a local audio file in Settings to use background music. Browsers may require a user tap before audio starts.
- The Matrix effect is available to call from JavaScript with `BirthdayEffects.matrix(true)`; call `BirthdayEffects.matrix(false)` to turn it off.
- Fullscreen is triggered by double-clicking/tapping the brand on supported browsers.
- This standalone project does not include Firebase Google Sign-In, server-backed order history, or payments. Those require valid Firebase/backend configuration and must not be represented as working without it.
- Google Fonts is optional; if unavailable, local system fonts are used.
