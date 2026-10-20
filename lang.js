// ============================================================
// LANGUAGE SYSTEM (VI / EN) — Complete
// ============================================================
window.LANG = {
  vi: {
    // ===== COUNTDOWN =====
    gettingReady: 'Đang chuẩn bị...',

    // ===== SETTINGS MODAL =====
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
    noteSequence: 'Lưu ý: ngăn cách bằng dấu | để tách từ, không nên để dòng quá dài',

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
    // ===== COUNTDOWN =====
    gettingReady: 'Getting ready...',

    // ===== SETTINGS MODAL =====
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
    noteSequence: 'Note: separate words with |, do not make lines too long',

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

// ============================================================
// CURRENT LANGUAGE STATE
// ============================================================
window.currentLang = localStorage.getItem('lang') || 'vi';

// ============================================================
// APPLY TRANSLATIONS
// ============================================================
window.applyLanguage = function () {
  const lang = window.LANG[window.currentLang];
  if (!lang) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!lang[key]) return;

    // Nếu là input có placeholder → đổi placeholder
    if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
      el.setAttribute('placeholder', lang[key]);
    } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      // input không có placeholder → đổi value (chỉ khi đang trống)
      // Bỏ qua để không ghi đè dữ liệu người dùng
    } else {
      // Text content thông thường
      el.textContent = lang[key];
    }
  });

  // Update <html lang>
  document.documentElement.setAttribute('lang', window.currentLang === 'vi' ? 'vi' : 'en');
};

// ============================================================
// LANGUAGE SWITCH BUTTON
// ============================================================
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

  // Apply ngay khi DOM ready
  window.applyLanguage();
});

// Apply lại sau khi toàn bộ trang load (phòng khi DOM thay đổi)
window.addEventListener('load', () => {
  window.applyLanguage();
});
