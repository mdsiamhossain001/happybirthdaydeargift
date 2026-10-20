// ============================================================
// CONFIG
// ============================================================
window.CONFIG = {
  texts: ['HAPPY', 'BIRTHDAY', 'MY', 'CUTEE', 'LITTLE', 'SWARALI', '❤'],
  countdown: 5,
  matrixText: 'HAPPYBIRTHDAY',
  matrixColor1: '#ff69b4',
  matrixColor2: '#ff1493',
  giftImage: '',
  enableBook: true,
  enableHeart: true,
  musicSrc: './music/happybirthday.mp3',
  bookPages: [
    { front: 'https://picsum.photos/400/600?random=1', back: 'https://picsum.photos/400/600?random=2' },
    { front: 'https://picsum.photos/400/600?random=3', back: 'https://picsum.photos/400/600?random=4' },
    { front: 'https://picsum.photos/400/600?random=5', back: 'https://picsum.photos/400/600?random=6' }
  ]
};

// ============================================================
// MATRIX RAIN
// ============================================================
const canvas = document.getElementById('matrix-rain');
const ctx = canvas.getContext('2d');
let matrixColumns = [];
const matrixFontSize = 16;
let matrixActive = false;
let matrixRAF = null;

function resizeMatrixCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const cols = Math.floor(canvas.width / matrixFontSize);
  matrixColumns = Array(cols).fill(0).map(() => Math.random() * canvas.height);
}

function getMatrixGradient() {
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, CONFIG.matrixColor1);
  grad.addColorStop(1, CONFIG.matrixColor2);
  return grad;
}

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = matrixFontSize + 'px monospace';
  ctx.fillStyle = getMatrixGradient();

  for (let i = 0; i < matrixColumns.length; i++) {
    const char = CONFIG.matrixText[Math.floor(Math.random() * CONFIG.matrixText.length)];
    const x = i * matrixFontSize;
    const y = matrixColumns[i];
    ctx.fillText(char, x, y);
    if (y > canvas.height && Math.random() > 0.975) {
      matrixColumns[i] = 0;
    }
    matrixColumns[i] += matrixFontSize;
  }
  matrixRAF = requestAnimationFrame(drawMatrix);
}

function startMatrix() {
  if (matrixActive) return;
  matrixActive = true;
  canvas.style.display = 'block';
  resizeMatrixCanvas();
  drawMatrix();
}

function stopMatrix() {
  matrixActive = false;
  if (matrixRAF) cancelAnimationFrame(matrixRAF);
  canvas.style.display = 'none';
}

window.addEventListener('resize', () => {
  if (matrixActive) resizeMatrixCanvas();
});

// ============================================================
// COUNTDOWN (CSS-driven, JS chỉ đổi số)
// ============================================================
let countdownInterval = null;

function startCountdown() {
  const wrapper = document.getElementById('countdownWrapper');
  const numberEl = document.getElementById('countdownNumber');

  wrapper.classList.remove('hide');
  wrapper.classList.add('show');

  let count = CONFIG.countdown;
  numberEl.textContent = count;

  // Restart CSS animation cho số
  numberEl.style.animation = 'none';
  void numberEl.offsetWidth;
  numberEl.style.animation = '';

  countdownInterval = setInterval(() => {
    count--;

    if (count > 0) {
      // Reset animation mỗi lần đổi số
      numberEl.textContent = count;
      numberEl.style.animation = 'none';
      void numberEl.offsetWidth;
      numberEl.style.animation = '';
    } else {
      clearInterval(countdownInterval);
      countdownInterval = null;

      // Fade out mượt
      wrapper.classList.add('hide');
      setTimeout(() => {
        wrapper.classList.remove('show', 'hide');
        setTimeout(() => {
          startMatrix();
          setTimeout(playSequence, 400);
        }, 200);
      }, 500);
    }
  }, 1000);
}

// ============================================================
// SEQUENCE — CSS-driven word reveal
// ============================================================
let isSequencePlaying = false;
let currentTextIndex = 0;
let sequenceTimeout = null;

function showWordCSS(word) {
  const container = document.getElementById('wordsContainer');
  const display = document.getElementById('contentDisplay');

  display.classList.add('show');
  container.innerHTML = '';

  const span = document.createElement('span');
  span.className = 'word-reveal';
  span.textContent = word;

  // Reset animation mỗi lần
  span.style.animation = 'none';
  container.appendChild(span);
  void span.offsetWidth;
  span.style.animation = '';

  // Fade out sau 1.6s
  setTimeout(() => {
    span.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    span.style.opacity = '0';
    span.style.transform = 'translateY(-30px) scale(0.9)';
  }, 1600);
}

function playSequence() {
  if (isSequencePlaying) return;
  isSequencePlaying = true;
  currentTextIndex = 0;

  function next() {
    if (currentTextIndex >= CONFIG.texts.length) {
      isSequencePlaying = false;
      onSequenceComplete();
      return;
    }
    showWordCSS(CONFIG.texts[currentTextIndex]);
    currentTextIndex++;
    sequenceTimeout = setTimeout(next, 2000);
  }
  next();
}

function onSequenceComplete() {
  const display = document.getElementById('contentDisplay');
  display.classList.remove('show');

  if (CONFIG.enableBook) {
    document.getElementById('bookContainer').classList.add('show');
    buildBook();
    document.getElementById('book').classList.add('show');
  }
  if (CONFIG.giftImage) {
    const container = document.getElementById('gift-image-container');
    container.innerHTML = `<img id="gift-image" src="${CONFIG.giftImage}" alt="gift">`;
  }
}

// ============================================================
// BOOK
// ============================================================
function buildBook() {
  const book = document.getElementById('book');
  if (book.dataset.built === '1') return;
  book.dataset.built = '1';
  book.innerHTML = '';

  const pages = CONFIG.bookPages;
  const total = pages.length;

  pages.forEach((page, i) => {
    const pageEl = document.createElement('div');
    pageEl.className = 'page';
    pageEl.style.setProperty('--page-z-index', total - i);
    pageEl.style.setProperty('--page-flipped-z-index', i + total);
    pageEl.innerHTML = `
      <div class="page-front"><img src="${page.front}" alt=""></div>
      <div class="page-back"><img src="${page.back}" alt=""></div>
    `;
    pageEl.addEventListener('click', () => pageEl.classList.toggle('flipped'));
    book.appendChild(pageEl);
  });
}

// ============================================================
// HEART
// ============================================================
function createHeart() {
  if (!CONFIG.enableHeart) return;
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = ['❤', '💖', '💕', '💗', '💓'][Math.floor(Math.random() * 5)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.bottom = '0';
  heart.style.fontSize = (15 + Math.random() * 20) + 'px';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 4000);
}

// ============================================================
// AUDIO
// ============================================================
const audio = document.getElementById('birthdayAudio');
const musicControl = document.getElementById('musicControl');

musicControl.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().then(() => {
      musicControl.textContent = '⏸';
      musicControl.classList.add('playing');
    }).catch(err => console.warn('Cannot play:', err));
  } else {
    audio.pause();
    musicControl.textContent = '▶';
    musicControl.classList.remove('playing');
  }
});

// ============================================================
// RESTART
// ============================================================
function restartExperience() {
  stopMatrix();
  if (countdownInterval) clearInterval(countdownInterval);
  if (sequenceTimeout) clearTimeout(sequenceTimeout);
  isSequencePlaying = false;
  currentTextIndex = 0;

  document.getElementById('countdownWrapper').classList.remove('show', 'hide');
  document.getElementById('contentDisplay').classList.remove('show');
  document.getElementById('wordsContainer').innerHTML = '';
  document.getElementById('bookContainer').classList.remove('show');

  const book = document.getElementById('book');
  book.classList.remove('show');
  book.innerHTML = '';
  book.dataset.built = '';
  document.getElementById('gift-image-container').innerHTML = '';

  setTimeout(startCountdown, 100);
}

// Expose globals
window.startMatrix = startMatrix;
window.stopMatrix = stopMatrix;
window.restartExperience = restartExperience;
window.startCountdown = startCountdown;
window.playSequence = playSequence;
window.buildBook = buildBook;
window.createHeart = createHeart;
window.showWordCSS = showWordCSS;

// Start
window.addEventListener('load', () => {
  startCountdown();
  audio.play().then(() => {
    musicControl.textContent = '⏸';
    musicControl.classList.add('playing');
  }).catch(() => console.log('Autoplay blocked - user click needed'));
});

// Heart loop
setInterval(createHeart, 800);
