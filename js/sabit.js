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
  y: 120,
  gen: 28,
  yuk: 38,
  hizx: 0,
  hizy: 0,
  zeminde: false,
  maxkalp: 5,
  kalp: 3,
};


// const levelPlatformlar = [
//   [
//     { x: 0,   y: 270, gen: 240, yuk: 90 },
//     { x: 315, y: 270, gen: 260, yuk: 90 },
//     { x: 650, y: 270, gen: 400, yuk: 90 },
//   ],
//   [
//     { x: 10,   y: 300, gen: 290, yuk: 90 },
//     { x: 315, y: 450, gen: 260, yuk: 90 },
//     { x: 650, y: 270, gen: 400, yuk: 90 },
//   ],
//   [
//     { x: 0,   y: 270, gen: 240, yuk: 90 },
//     { x: 315, y: 270, gen: 260, yuk: 90 },
//     { x: 650, y: 270, gen: 400, yuk: 90 },
//   ],
// ];
const levelPlatformlar = [
  [
    { x: 0,   y: 250, gen: 200, yuk: 90 },
    { x: 350, y: 250, gen: 200, yuk: 90 },
    { x: 700, y: 250, gen: 300, yuk: 90 }
  ],
  [
    { x: 0,   y: 200, gen: 150, yuk: 300 },
    { x: 320, y: 250, gen: 150, yuk: 300 },
    { x: 640, y: 250, gen: 150, yuk: 300 },
    { x: 820, y: 300, gen: 150, yuk: 300 },
    { x: 920, y: 150, gen: 300, yuk: 300 }
  ],
  [
    { x: 0,   y: 200, gen: 100, yuk: 200 },
    { x: 220, y: 200, gen: 80,  yuk: 200 },
    { x: 440, y: 200, gen: 80,  yuk: 200 },
    { x: 660, y: 300, gen: 300, yuk: 200 }
  ],
  [
    { x: 0,   y: 300, gen: 200, yuk: 50 },
    { x: 350, y: 250, gen: 150, yuk: 20 },
    { x: 650, y: 300, gen: 300, yuk: 50 }
  ],
  [
    { x: 0,   y: 350, gen: 120, yuk: 50 },
    { x: 250, y: 280, gen: 80,  yuk: 20 },
    { x: 450, y: 200, gen: 80,  yuk: 20 },
    { x: 700, y: 250, gen: 200, yuk: 50 }
  ]
];

let oyunSeviyesi = 0;

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
