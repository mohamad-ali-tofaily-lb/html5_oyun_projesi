function arkaplan() {
  ctx.fillStyle = renkler.arkaplan;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function platformCiz() {
  ctx.fillStyle = renkler.siyah;
  for (const p of levelPlatformlar[oyunSeviyesi]) {
    ctx.fillRect(p.x - kamerax, p.y, p.gen, p.yuk);
  }
}

function kapiCiz() {
  const ex = kapi.x - kamerax;
  const ey = kapi.y;

  ctx.fillStyle = renkler.siyah;
  ctx.fillRect(ex, ey, kapi.gen, kapi.yuk);

  ctx.fillStyle = renkler.arkaplan;
  ctx.fillRect(ex + 4, ey + 4, kapi.gen - 8, kapi.yuk - 8);

  ctx.fillStyle = renkler.siyah;
  ctx.fillRect(ex + kapi.gen - 10, ey + kapi.yuk / 2 - 3, 6, 6);

  ctx.font = 'bold 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = renkler.siyah;
  ctx.fillText('EXIT', ex + kapi.gen / 2, ey - 6);
}

function karakterCiz() {
  const ex = karakter.x - kamerax;
  const ey = karakter.y;

  ctx.fillStyle = renkler.sapka;
  ctx.fillRect(ex - 8, ey - 8, karakter.gen + 16, 5);// genis agiz
  ctx.fillRect(ex + 4, ey - 20, karakter.gen - 8, 14);// sapka tepesi

  ctx.fillStyle = renkler.sapkakoyu;
  ctx.fillRect(ex + 4, ey - 10, karakter.gen - 8, 3);// sapka band

  ctx.fillStyle = renkler.siyah;
  ctx.fillRect(ex + 6, ey, 16, 14);// kafa

  ctx.fillStyle = renkler.arkaplan;
  ctx.fillRect(ex + 9, ey + 3, 4, 4);// gozler1
  ctx.fillRect(ex + 18, ey + 3, 4, 4);// gozler2

  ctx.fillStyle = renkler.siyah;
  ctx.fillRect(ex + 4, ey + 14, 20, 20);//mid
  ctx.fillRect(ex, ey + 15, 5, 12);//kol
  ctx.fillRect(ex + 23, ey + 15, 5, 12);//kol
  ctx.fillRect(ex + 6, ey + 34, 7, 4);//bbacak
  ctx.fillRect(ex + 15, ey + 34, 7, 4);//bacak
}

function kalpCiz(x, y, boyut, dolu) {
  ctx.save();
  ctx.beginPath();
  const cx = x + boyut / 2;
  const cy = y + boyut / 2;
  const r = boyut / 2;
  ctx.moveTo(cx, cy + r * 0.6);
  ctx.bezierCurveTo(cx - r * 1.2, cy, cx - r * 1.2, cy - r * 0.9, cx, cy - r * 0.3);
  ctx.bezierCurveTo(cx + r * 1.2, cy - r * 0.9, cx + r * 1.2, cy, cx, cy + r * 0.6);
  if (dolu) {
    ctx.fillStyle = renkler.siyah;
    ctx.fill();
  } else {
    ctx.strokeStyle = renkler.siyah;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  ctx.restore();
}

function kalplerCiz() {
  const ex = karakter.x - kamerax;
  const ey = karakter.y;
  const boyut = 10;
  const bosluk = 4;
  const toplam = karakter.maxkalp * (boyut + bosluk) - bosluk;
  const basx = ex + karakter.gen / 2 - toplam / 2;

  for (let i = 0; i < karakter.maxkalp; i++) {
    const kx = basx + i * (boyut + bosluk);
    const ky = ey - 32; // sapka ustunde olsun
    kalpCiz(kx, ky, boyut, i < karakter.kalp);
  }
}

function basEkrani() {
  ctx.fillStyle = 'rgba(0,0,0,0.55)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = renkler.beyaz;
  ctx.textAlign = 'center';
  ctx.font = 'bold 42px monospace';
  ctx.fillText('OIL JUMP', canvas.width / 2, canvas.height / 2 - 40);
  ctx.font = '16px monospace';
  ctx.fillText('Her ziplamada 1 kalp kaybedersin!', canvas.width / 2, canvas.height / 2 + 5);
  ctx.fillText('Kapiyaulas, ama dikkatli zipla.', canvas.width / 2, canvas.height / 2 + 30);
  ctx.font = 'bold 14px monospace';
  ctx.fillText('Baslamak icin herhangi bir tusa bas', canvas.width / 2, canvas.height / 2 + 70);
}

function olduEkrani() {
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = renkler.beyaz;
  ctx.textAlign = 'center';
  ctx.font = 'bold 48px monospace';
  ctx.fillText('OLDUN!', canvas.width / 2, canvas.height / 2 - 20);
  ctx.font = '16px monospace';
  ctx.fillText('Yeniden baslamak icin SPACE bas', canvas.width / 2, canvas.height / 2 + 20);
}

function kazandiEkrani() {
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = renkler.beyaz;
  ctx.textAlign = 'center';
  ctx.font = 'bold 42px monospace';
  ctx.fillText('TESLIMAT TAMAM!', canvas.width / 2, canvas.height / 2 - 20);
  ctx.font = '16px monospace';
  ctx.fillText('Yeniden baslamak icin SPACE bas', canvas.width / 2, canvas.height / 2 + 20);
}
