// ============================================================
// UI: SETTINGS, THEME, FILE UPLOAD
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const settingsModal = document.getElementById('settingsModal');
  const settingsButton = document.getElementById('settingsButton');
  const closeSettings = document.getElementById('closeSettings');
  const applySettings = document.getElementById('applySettings');

  // Open
  settingsButton.addEventListener('click', () => {
    settingsModal.style.display = 'block';
  });

  // Close
  closeSettings.addEventListener('click', () => {
    settingsModal.style.display = 'none';
  });

  settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) settingsModal.style.display = 'none';
  });

  // Color theme buttons
  document.querySelectorAll('.color-theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.color-theme-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const theme = btn.dataset.theme;
      const customSection = document.getElementById('customColorSection');

      if (theme === 'pink') {
        CONFIG.matrixColor1 = '#ff69b4';
        CONFIG.matrixColor2 = '#ff1493';
        customSection.style.display = 'none';
      } else if (theme === 'blue') {
        CONFIG.matrixColor1 = '#87ceeb';
        CONFIG.matrixColor2 = '#4169e1';
        customSection.style.display = 'none';
      } else if (theme === 'purple') {
        CONFIG.matrixColor1 = '#dda0dd';
        CONFIG.matrixColor2 = '#9370db';
        customSection.style.display = 'none';
      } else if (theme === 'custom') {
        customSection.style.display = 'flex';
      }
    });
  });

  // Music file upload
  document.getElementById('musicFile').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const audio = document.getElementById('birthdayAudio');
    audio.querySelector('source').src = url;
    audio.load();
  });

  // Apply settings
  applySettings.addEventListener('click', () => {
    const newMatrixText = document.getElementById('matrixText').value || 'HAPPYBIRTHDAY';
    const newTexts = document.getElementById('sequenceText').value.split('|').filter(Boolean);
    const newCountdown = parseInt(document.getElementById('countdownTime').value);
    const newGift = document.getElementById('giftImage').value;
    const newEnableBook = document.getElementById('enableBook').value === 'true';
    const newEnableHeart = document.getElementById('enableHeart').value === 'true';

    CONFIG.matrixText = newMatrixText;
    CONFIG.texts = newTexts.length ? newTexts : CONFIG.texts;
    CONFIG.countdown = newCountdown;
    CONFIG.giftImage = newGift;
    CONFIG.enableBook = newEnableBook;
    CONFIG.enableHeart = newEnableHeart;

    if (document.querySelector('.color-theme-btn[data-theme="custom"]').classList.contains('active')) {
      CONFIG.matrixColor1 = document.getElementById('matrixColor1').value;
      CONFIG.matrixColor2 = document.getElementById('matrixColor2').value;
    }

    // Save to localStorage
    try {
      localStorage.setItem('gift_config', JSON.stringify({
        matrixText: CONFIG.matrixText,
        texts: CONFIG.texts,
        countdown: CONFIG.countdown,
        giftImage: CONFIG.giftImage,
        enableBook: CONFIG.enableBook,
        enableHeart: CONFIG.enableHeart,
        matrixColor1: CONFIG.matrixColor1,
        matrixColor2: CONFIG.matrixColor2
      }));
    } catch (err) {
      console.warn('Cannot save config:', err);
    }

    settingsModal.style.display = 'none';
    window.restartExperience();
  });

  // Load saved config
  try {
    const saved = localStorage.getItem('gift_config');
    if (saved) {
      const cfg = JSON.parse(saved);
      Object.assign(CONFIG, cfg);

      // Sync UI
      document.getElementById('matrixText').value = CONFIG.matrixText;
      document.getElementById('sequenceText').value = CONFIG.texts.join('|');
      document.getElementById('countdownTime').value = CONFIG.countdown;
      document.getElementById('giftImage').value = CONFIG.giftImage || '';
      document.getElementById('enableBook').value = String(CONFIG.enableBook);
      document.getElementById('enableHeart').value = String(CONFIG.enableHeart);
    }
  } catch (err) {
    console.warn('Cannot load config:', err);
  }
});
