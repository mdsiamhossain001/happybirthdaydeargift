document.addEventListener('DOMContentLoaded', () => {
  const settingsModal = document.getElementById('settingsModal');
  const settingsButton = document.getElementById('settingsButton');
  const closeSettings = document.getElementById('closeSettings');
  const applySettings = document.getElementById('applySettings');

  // নিশ্চিত করুন মোডাল শুরুতে লুকানো আছে
  settingsModal.style.display = 'none';

  settingsButton.addEventListener('click', () => {
    settingsModal.style.display = 'block';
  });

  closeSettings.addEventListener('click', () => {
    settingsModal.style.display = 'none';
  });

  settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) settingsModal.style.display = 'none';
  });

  document.querySelectorAll('.color-theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.color-theme-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const theme = btn.dataset.theme;
      const customSection = document.getElementById('customColorSection');

      if (theme === 'pink') { CONFIG.matrixColor1 = '#ff69b4'; CONFIG.matrixColor2 = '#ff1493'; customSection.style.display = 'none'; }
      else if (theme === 'blue') { CONFIG.matrixColor1 = '#87ceeb'; CONFIG.matrixColor2 = '#4169e1'; customSection.style.display = 'none'; }
      else if (theme === 'purple') { CONFIG.matrixColor1 = '#dda0dd'; CONFIG.matrixColor2 = '#9370db'; customSection.style.display = 'none'; }
      else if (theme === 'custom') { customSection.style.display = 'flex'; }
    });
  });

  document.getElementById('musicFile').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const audio = document.getElementById('birthdayAudio');
    audio.querySelector('source').src = url;
    audio.load();
  });

  applySettings.addEventListener('click', () => {
    CONFIG.matrixText = document.getElementById('matrixText').value || 'HAPPYBIRTHDAY';
    CONFIG.texts = document.getElementById('sequenceText').value.split('|').filter(Boolean);
    CONFIG.countdown = parseInt(document.getElementById('countdownTime').value);
    CONFIG.giftImage = document.getElementById('giftImage').value;
    CONFIG.enableBook = document.getElementById('enableBook').value === 'true';
    CONFIG.enableHeart = document.getElementById('enableHeart').value === 'true';

    if (document.querySelector('.color-theme-btn[data-theme="custom"]').classList.contains('active')) {
      CONFIG.matrixColor1 = document.getElementById('matrixColor1').value;
      CONFIG.matrixColor2 = document.getElementById('matrixColor2').value;
    }

    settingsModal.style.display = 'none';
    window.restartExperience();
  });
});
