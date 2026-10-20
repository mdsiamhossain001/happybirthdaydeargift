# 🎁 Happy Birthday Gift Website

Website thiệp sinh nhật với hiệu ứng mưa chữ, sách lật 3D, nhạc nền và trái tim bay.

## 🚀 Deploy Vercel

1. Push code lên GitHub
2. Import vào [Vercel](https://vercel.com)
3. Deploy - không cần config gì thêm

## 📝 Tùy chỉnh

Mở `index.html`, tìm phần `CONFIG` ở đầu `<script>`:

```js
const CONFIG = {
  texts: ['HAPPY', 'BIRTHDAY', 'MY', 'CUTEE', 'LITTLE', 'SWARALI', '❤'],
  countdown: 5,
  matrixText: 'HAPPYBIRTHDAY',
  matrixColor1: '#ff69b4',
  matrixColor2: '#ff1493',
  giftImage: '',
  enableBook: true,
  enableHeart: true,
  musicSrc: './music/happybirthday.mp3',
  bookPages: [...]
};
