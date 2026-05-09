function carpisti(a, b) {
  return (
    a.x < b.x + b.gen &&
    a.x + a.gen > b.x &&
    a.y < b.y + b.yuk &&
    a.y + a.yuk > b.y
  );
}

function guncelle() {
  karakter.hizx = 0;
  if (tuslar['ArrowLeft'] || tuslar['KeyA']) karakter.hizx = -hiz;
  if (tuslar['ArrowRight'] || tuslar['KeyD']) karakter.hizx = hiz;

  if ((tuslar['Space'] || tuslar['ArrowUp'] || tuslar['KeyW']) && karakter.zeminde) {
    if (karakter.kalp > 0) {
      karakter.hizy = ziplaguc;
      karakter.zeminde = false;
      karakter.kalp--;
      tuslar['Space'] = false;
      tuslar['ArrowUp'] = false;
      tuslar['KeyW'] = false;
    }
  }

  karakter.hizy += yercekimi;
  karakter.x += karakter.hizx;
  if (karakter.x < 0) karakter.x = 0;
  karakter.y += karakter.hizy;

  karakter.zeminde = false;
  for (const p of platformlar) {
    if (carpisti(karakter, p)) {
      const alt = karakter.y + karakter.yuk;
      const oncekialt = alt - karakter.hizy;
      if (oncekialt <= p.y + 2) {
        karakter.y = p.y - karakter.yuk;
        karakter.hizy = 0;
        karakter.zeminde = true;
      }
    }
  }

  if (karakter.kalp <= 0) {
    oyundurum = durum.oldu;
    return;
  }

  if (karakter.y > canvas.height + 50) {
    oyundurum = durum.oldu;
  }

  if (carpisti(karakter, kapi)) {
    oyundurum = durum.kazandi;
  }

  const hedef = karakter.x - canvas.width / 3;
  kamerax += (hedef - kamerax) * 0.15;
  if (kamerax < 0) kamerax = 0;
}

function sifirla() {
  karakter.x = 80;
  karakter.y = 220;
  karakter.hizx = 0;
  karakter.hizy = 0;
  karakter.zeminde = false;
  karakter.kalp = karakter.maxkalp;
  kamerax = 0;
  oyundurum = durum.oynuyor;
  muzikbaslat();
}
