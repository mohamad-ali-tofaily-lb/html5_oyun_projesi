const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const renkler = {
  arkaplan: '#f5a06a',
  siyah: '#000000',
  beyaz: '#ffffff',
  kalpbos: '#f5a06a',
  sapka: '#d7890a',
  sapkakoyu: '#ff0000',
};

const durum = {
  baslamadi: 'baslamadi',
  oynuyor: 'oynuyor',
  oldu: 'oldu',
  kazandi: 'kazandi',
};

const yercekimi = 0.55;
const ziplaguc = -13;
const hiz = 3.5;

const karakter = {
  x: 80,
  y: 220,
  gen: 28,
  yuk: 38,
  hizx: 0,
  hizy: 0,
  zeminde: false,
  maxkalp: 3,
  kalp: 3,
};

const platformlar = [
  { x: 0,   y: 270, gen: 240, yuk: 90 },
  { x: 315, y: 270, gen: 260, yuk: 90 },
  { x: 650, y: 270, gen: 400, yuk: 90 },
];

const kapi = {
  x: 820,
  y: 210,
  gen: 32,
  yuk: 60,
};

let kamerax = 0;
let oyundurum = durum.baslamadi;

const tuslar = {};
window.addEventListener('keydown', e => { tuslar[e.code] = true; });
window.addEventListener('keyup', e => { tuslar[e.code] = false; });
