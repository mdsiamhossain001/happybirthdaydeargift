// ============================================================
// MAIN CONFIG & LOGIC
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
// TYPEWRITER
// ============================================================
let typeInterval = null;

function showText(text) {
  const contentDisplay = document.getElementById('contentDisplay');
  const contentText = document.getElementById('contentText');

  if (typeInterval) clearInterval(typeInterval);

  contentDisplay.classList.add('show');
  contentText.textContent = '';

  let i = 0;
  typeInterval = setInterval(() => {
    if (i < text.length) {
      contentText.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typeInterval);
      typeInterval = null;
    }
  }, 100);
}

// ============================================================
// SEQUENCE
// ============================================================
let isSequencePlaying = false;
let currentTextIndex = 0;

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
    showText(CONFIG.texts[currentTextIndex]);
    currentTextIndex++;
    setTimeout(next, 2000);
  }
  next();
}

function onSequenceComplete() {
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
// COUNTDOWN + START
// ============================================================
function startCountdown() {
  const contentDisplay = document.getElementById('contentDisplay');
  const contentText = document.getElementById('contentText');
  contentDisplay.classList.add('show');

  let count = CONFIG.countdown;
  contentText.textContent = count;

  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      contentText.textContent = count;
    } else {
      clearInterval(interval);
      contentDisplay.classList.remove('show');
      setTimeout(() => {
        startMatrix();
        setTimeout(playSequence, 500);
      }, 500);
    }
  }, 1000);
}

function restartExperience() {
  stopMatrix();
  if (typeInterval) clearInterval(typeInterval);
  isSequencePlaying = false;
  currentTextIndex = 0;

  document.getElementById('contentDisplay').classList.remove('show');
  document.getElementById('bookContainer').classList.remove('show');
  const book = document.getElementById('book');
  book.classList.remove('show');
  book.innerHTML = '';
  book.dataset.built = '';
  document.getElementById('gift-image-container').innerHTML = '';

  startCountdown();
}

// Expose globals
window.startMatrix = startMatrix;
window.stopMatrix = stopMatrix;
window.restartExperience = restartExperience;
window.startCountdown = startCountdown;
window.playSequence = playSequence;
window.buildBook = buildBook;
window.createHeart = createHeart;
window.showText = showText;

// Start on load
window.addEventListener('load', () => {
  startCountdown();
  audio.play().then(() => {
    musicControl.textContent = '⏸';
    musicControl.classList.add('playing');
  }).catch(() => console.log('Autoplay blocked - user click needed'));
});

// Heart loop
setInterval(createHeart, 800);
