// ============================================================
// LANGUAGE SYSTEM (VI / EN)
// ============================================================
window.LANG = {
  vi: {
    settings: '⚙️ Cài Đặt',
    music: '🎵 Âm Thanh',
    musicFile: 'Chọn nhạc (MP3):',
    musicHint: 'Hoặc để trống dùng nhạc mặc định',
    countdown: '⏰ Đếm Ngược',
    countdownTime: 'Thời gian:',
    sec3: '3 giây',
    sec5: '5 giây',
    sec10: '10 giây',
    matrix: '🌧️ Mưa Chữ',
    matrixText: 'Chữ mưa:',
    colorTheme: 'Màu:',
    pinkTheme: 'Hồng',
    blueTheme: 'Xanh',
    purpleTheme: 'Tím',
    customTheme: 'Tùy chỉnh',
    matrixColor1: 'Màu 1:',
    matrixColor2: 'Màu 2:',
    sequence: '✨ Chữ Chính',
    sequenceText: 'Nội dung (cách bằng |):',
    gift: '🎁 Hình Động',
    giftImage: 'Chọn GIF:',
    noGif: 'Không có',
    book: '📖 Trang Sách',
    enableBook: 'Hiển thị sách:',
    enableHeart: 'Hiệu ứng trái tim:',
    on: 'Bật',
    off: 'Tắt',
    apply: '🎉 Áp Dụng'
  },
  en: {
    settings: '⚙️ Settings',
    music: '🎵 Audio',
    musicFile: 'Choose music (MP3):',
    musicHint: 'Or leave empty for default music',
    countdown: '⏰ Countdown',
    countdownTime: 'Duration:',
    sec3: '3 seconds',
    sec5: '5 seconds',
    sec10: '10 seconds',
    matrix: '🌧️ Matrix Rain',
    matrixText: 'Rain text:',
    colorTheme: 'Color:',
    pinkTheme: 'Pink',
    blueTheme: 'Blue',
    purpleTheme: 'Purple',
    customTheme: 'Custom',
    matrixColor1: 'Color 1:',
    matrixColor2: 'Color 2:',
    sequence: '✨ Main Text',
    sequenceText: 'Content (separate with |):',
    gift: '🎁 GIF',
    giftImage: 'Choose GIF:',
    noGif: 'None',
    book: '📖 Book Pages',
    enableBook: 'Show book:',
    enableHeart: 'Heart effect:',
    on: 'On',
    off: 'Off',
    apply: '🎉 Apply'
  }
};

// Current language state
window.currentLang = localStorage.getItem('lang') || 'vi';

// Apply translations
window.applyLanguage = function () {
  const lang = window.LANG[window.currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (lang[key]) {
      if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
        el.setAttribute('placeholder', lang[key]);
      } else {
        el.textContent = lang[key];
      }
    }
  });
};

// Switch language button
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('langSwitchBtn');
  if (btn) {
    btn.textContent = window.currentLang === 'vi' ? 'VI/EN' : 'EN/VI';
    btn.addEventListener('click', () => {
      window.currentLang = window.currentLang === 'vi' ? 'en' : 'vi';
      localStorage.setItem('lang', window.currentLang);
      btn.textContent = window.currentLang === 'vi' ? 'VI/EN' : 'EN/VI';
      window.applyLanguage();
    });
  }
  window.applyLanguage();
});
