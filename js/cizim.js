//arkaplan renk ve yukseklik ve genislik
function arkaplan() {
  ctx.fillStyle = renkler.arkaplan;                     
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
//platform renk ve yukseklik ve genislik  ve kamerayla haraketi
function platformCiz() {
  ctx.fillStyle = renkler.siyah;
  for (const p of levelPlatformlar[oyunSeviyesi]) {
    ctx.fillRect(p.x - kamerax, p.y, p.gen, p.yuk);
  }
}
//kapi renk ve yukseklik ve genislik  ve kamerayla haraketi
function kapiCiz() {
  const ex = kapi[oyunSeviyesi].x - kamerax;
  const ey = kapi[oyunSeviyesi].y;

  ctx.fillStyle = renkler.siyah;
  ctx.fillRect(ex, ey, kapi[oyunSeviyesi].gen, kapi[oyunSeviyesi].yuk);

  ctx.fillStyle = renkler.arkaplan;
  ctx.fillRect(ex + 4, ey + 4, kapi[oyunSeviyesi].gen - 8, kapi[oyunSeviyesi].yuk - 8);

  ctx.fillStyle = renkler.siyah;
  ctx.fillRect(ex + kapi[oyunSeviyesi].gen - 10, ey + kapi[oyunSeviyesi].yuk / 2 - 3, 6, 6);

  ctx.font = 'bold 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = renkler.siyah;
  ctx.fillText('EXIT', ex + kapi[oyunSeviyesi].gen / 2, ey - 6);
}
// bu sahteki kapi sahte kapi, oyun seviyesinde 3 oldugunda ortaya cikacak
function fake_kapiCiz() {
    if(oyunSeviyesi == 3 && fake_kapi.gizli == 0) {
      const ex = fake_kapi.x - kamerax;
      const ey = fake_kapi.y;

      ctx.fillStyle = renkler.gri;
      ctx.fillRect(ex, ey, fake_kapi.gen, fake_kapi.yuk);

      ctx.fillStyle = renkler.arkaplan;
      ctx.fillRect(ex + 4, ey + 4, fake_kapi.gen - 8, fake_kapi.yuk - 8);

      ctx.fillStyle = renkler.gri;
      ctx.fillRect(ex + fake_kapi.gen - 10, ey + fake_kapi.yuk / 2 - 3, 6, 6);

      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = renkler.gri;
      ctx.fillText('EXIT', ex + fake_kapi.gen / 2, ey - 6);
    }
}
// bu karakteri cizmek icin fonksiyon, kamerayla haraketi ve renkleri var, karakterin genisligi 16 ve yuksekligi 34 not e demek ekran :)
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
// kalp cizmek icin fonksiyon, kamerayla haraketi ve renkleri var, boyutu ve dolu mu bos mu oldugunu belirten parametreler var
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
// karakterin kalplerini yerlestirmek icin fonksiyon
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
// baslangic ekranini cizmek icin fonksiyon, oyun baslamadan once gosterilecek, oyun hakkinda bilgi verecek ve baslamak icin tusa basilmasini isteyecek
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
// oldugunda cikan ekran, karakterin kalpleri bittiginde gosterilecek, yeniden baslamak icin tusa basilmasi istenecek
function olduEkrani() {
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = renkler.beyaz;
  ctx.textAlign = 'center';
  ctx.font = 'bold 48px monospace';
  ctx.fillText('OLDUN!', canvas.width / 2, canvas.height / 2 - 20);
  ctx.font = '16px monospace';
  ctx.fillText('Yeniden baslamak icin herhangi bir tusa bas', canvas.width / 2, canvas.height / 2 + 20);
}
// kazandi ekraninda karakter kapiya ulastiginda gosterilecek, yeniden baslamak icin tusa basilmasi istenecek
function kazandiEkrani() {
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = renkler.beyaz;
  ctx.textAlign = 'center';
  ctx.font = 'bold 42px monospace';
  ctx.fillText('TESLIMAT TAMAM!', canvas.width / 2, canvas.height / 2 - 20);
  ctx.font = '16px monospace';
  ctx.fillText('Yeniden baslamak icin herhangi bir tusa bas', canvas.width / 2, canvas.height / 2 + 20);
}
// oyunun tum seviyelerini gecince cikan ekran, karakter tum seviyeleri gecip kapiya ulastiginda gosterilecek, yeniden baslamak icin tusa basilmasi istenecek
function oyunBittiEkrani() {
  ctx.fillStyle = renkler.siyah;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = renkler.kazanan; // Altın sarısı bir renk
  ctx.textAlign = 'center';
  ctx.font = 'bold 48px monospace';
  ctx.fillText('TEBRIKLER!', canvas.width / 2, canvas.height / 2 - 40);
  
  ctx.fillStyle = renkler.beyaz;
  ctx.font = 'bold 24px monospace';
  ctx.fillText('TUM SEVIYELERI GECTIN', canvas.width / 2, canvas.height / 2 + 10);
  
  ctx.font = '16px monospace';
  ctx.fillText('En bastan baslamak icin SPACE bas', canvas.width / 2, canvas.height / 2 + 60);
}

// oyun basinda hangi seviye oldugunu gosterir
function seviyeEkran() {
  const posX = 180;
  const posY = 100;
  
  // 2. Apply the camera offset! This makes it scroll away.
  const ekrandakiX = posX - kamerax; 

  ctx.font = 'bold 40px monospace';
  ctx.fillStyle = renkler.siyah;
  ctx.textAlign = 'center';
  
  // 3. Draw the text using the offset X coordinate
  ctx.fillText('Seviye ' + (oyunSeviyesi + 1), ekrandakiX, posY);
}
// tuzak kapi mesaji, ve sure(time) deadline
function fake_kapiMesaj() {
  if(fake_kapi.mesaj) {
    ctx.font = 'bold 20px monospace';
    ctx.fillStyle = renkler.gri;
    ctx.fillText("Yanlis Kapi", 490 - kamerax, 50);
    if(deadline == time) fake_kapi.mesaj = 0;
  }
}