const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const renkler = {
  arkaplan: '#f5a06a',
  siyah: '#000000',
  gri: '#808080',
  beyaz: '#ffffff',
  kalpbos: '#f5a06a',
  sapka: '#d7890a',
  sapkakoyu: '#ff0000',
  kazanan: '#ffdf00',
};

const durum = {
  baslamadi: 'baslamadi',
  oynuyor: 'oynuyor',
  oldu: 'oldu',
  kazandi: 'kazandi',
  bitti: 'bitti',
};

const yercekimi = 0.55;
const ziplaguc = -13;
const hiz = 3.5;


const karakter = {
  x: 80,
  y: 20,
  gen: 28,
  yuk: 38,
  hizx: 0,
  hizy: 0,
  zeminde: false,
  maxkalp: 3,
  kalp: 3,
};

const levelPlatformlar = [
  [
    { x: 0,   y: 270, gen: 200, yuk: 120 },
    { x: 315, y: 270, gen: 200, yuk: 120 },
    { x: 650, y: 250, gen: 300, yuk: 120 }
  ],
  [
    { x: 0,   y: 200, gen: 150, yuk: 300 },
    { x: 320, y: 250, gen: 400, yuk: 300 },
    { x: 640, y: 250, gen: 150, yuk: 300 },
    { x: 820, y: 300, gen: 150, yuk: 300 },
    { x: 920, y: 150, gen: 300, yuk: 300 }
  ],
  [
    { x: 0,   y: 200, gen: 100, yuk: 200 },
    { x: 220, y: 200, gen: 80,  yuk: 200 },
    { x: 440, y: 200, gen: 80,  yuk: 200 },
    { x: 600, y: 300, gen: 300, yuk: 200 }
  ],
  [
    { x: 0,   y: 250, gen: 200, yuk: 200 },
    { x: 350, y: 180, gen: 200, yuk: 20 },
    { x: 650, y: 300, gen: 300, yuk: 200 }
  ],
  [
    { x: 0,   y: 350, gen: 120, yuk: 50 },
    { x: 200, y: 280, gen: 120,  yuk: 20 },
    { x: 450, y: 200, gen: 80,  yuk: 20 },
    { x: 700, y: 250, gen: 200, yuk: 50 }
  ]
];

let oyunSeviyesi = 0;

// let random_y = 120 + parseInt(Math.random() * 50);
// let random_x = 1070 + parseInt(Math.random() * 20);

let random_y = 120 + parseInt(Math.random() * 50);
let random_x = 1070 + parseInt(Math.random() * 30);
let kapi = [
  {x: 850, y: 190, gen: 32, yuk: 60,},
  {x: 1120, y: 90, gen: 32, yuk: 60,},
  {x: 850, y: 240, gen: 32, yuk: 60,},
  {x: random_x, y: random_y, gen: 32, yuk: 60,},
  {x: 850, y: 190, gen: 32, yuk: 60,}

];
let fake_kapi = {
  x: 430,
  y: 30,
  gen: 32,
  yuk: 60,
  gizli: 0,
  mesaj: 0,
};

let kamerax = 0;
let oyundurum = durum.baslamadi;

const tuslar = {};
window.addEventListener('keydown', e => { tuslar[e.code] = true; });
window.addEventListener('keyup', e => { tuslar[e.code] = false; });


let timer = 0;
let deadline = 0;