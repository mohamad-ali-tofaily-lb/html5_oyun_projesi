window.addEventListener('keydown', e => {
  if (oyundurum === durum.baslamadi) {
    oyundurum = durum.oynuyor;
    muzikbaslat();
  }
  if (oyundurum === durum.kazandi) {
    // oyun kazandiginda seviyeyi otomatik olarak 1 artirir ve toplam seviye sayisini assa 0 yapar
    oyunSeviyesi++;
    if(oyunSeviyesi >= levelPlatformlar.length) oyunSeviyesi = 0;
    platformlar = levelPlatformlar[oyunSeviyesi];
    sifirla();
  } else if (oyundurum === durum.oldu) {
    // eger 3. levelde kaybettiyse kapinin pozisyonunu rastgele 1 daha degistirir
    if(oyunSeviyesi == 3) {
      kapi[oyunSeviyesi].y = 120 + parseInt(Math.random() * 50); //20
      kapi[oyunSeviyesi].x = 1070 + parseInt(Math.random() * 30); //30
    }
    sifirla();
  } else if (oyundurum === durum.bitti  && e.code === 'Space') { 
    oyunSeviyesi = 0;
    sifirla();
  }
  
});
function dongu() {

  arkaplan();

  if (oyundurum === durum.baslamadi) {
    platformCiz();
    kapiCiz();
    fake_kapiCiz();
    karakterCiz();
    kalplerCiz();
    basEkrani();
  } else if (oyundurum === durum.oynuyor) {
    guncelle();
    platformCiz();
    kapiCiz();
    fake_kapiCiz();
    seviyeEkran();
    karakterCiz();
    kalplerCiz();
    fake_kapiMesaj();
  } else if (oyundurum === durum.oldu) {
    platformCiz();
    kapiCiz();
    fake_kapiCiz();
    karakterCiz();
    olduEkrani();
  } else if (oyundurum === durum.bitti) {
    platformCiz();
    kapiCiz();
    fake_kapiCiz();
    karakterCiz();
    platformCiz();
    kapiCiz();
    fake_kapiCiz();
    karakterCiz();
    oyunBittiEkrani();
  } else if (oyundurum === durum.kazandi) {
    platformCiz();
    kapiCiz();
    fake_kapiCiz();
    karakterCiz();
    kazandiEkrani();
  }
  
  time++;
  requestAnimationFrame(dongu);
}


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
    ziplaSes();
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
  for (const p of levelPlatformlar[oyunSeviyesi]) {
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


  // karakterin sagdan ve soldan her hangi bir platforma carpip carpmadigini kontrol eder
  // eger carptiysa sagdan mi soldan mi kontrol eder ve ona gore hesaplayarak olmasi gereken konumu belirler
  // dongu ile tum platformu kontrol eder
  for (const p of levelPlatformlar[oyunSeviyesi]) {
    if (carpisti(karakter, p)) {
      if (karakter.hizx > 0) {
        karakter.x = p.x - karakter.gen;
      } else if (karakter.hizx < 0) {
        karakter.x = p.x + p.gen;
      }
      karakter.hizx = 0;
    }
  }
  
  // kaybettigi durumlar
  if (karakter.kalp <= 0) {
    oyundurum = durum.oldu;
    olduSes();
    return;
  }

  if (karakter.y > canvas.height + 50) {
    oyundurum = durum.oldu;
    olduSes();
  }

  // kazandigi durumlar, kapiyi carpip carpmadigini kontrol eder ve carptiysa oyun kazandi ya da bitti
  if (carpisti(karakter, kapi[oyunSeviyesi])) {
    kazandiMuzikBaslat();
    if(oyunSeviyesi == levelPlatformlar.length - 1) {
      oyundurum = durum.bitti;
    } else {
      oyundurum = durum.kazandi;
    }
  }
  // tuzak kapiyi carpip carpmadigini kontrol eder ve carptiysa, kapiyi gizler ve mesaj gonderir ve time deadline belirlenir
  if (oyunSeviyesi == 3 && carpisti(karakter, fake_kapi)) {
    fake_kapiSes();
    fake_kapi.gizli = 1;
    fake_kapi.mesaj = 1;
    deadline = time + 60;
  }

  const hedef = karakter.x - canvas.width / 3;
  kamerax += (hedef - kamerax) * 0.15;
  if (kamerax < 0) kamerax = 0;
}

function sifirla() {
  karakter.x = 80;
  karakter.y = 20;
  karakter.hizx = 0;
  karakter.hizy = 0;
  karakter.zeminde = false;
  karakter.kalp = karakter.maxkalp;
  kamerax = 0;
  fake_kapi.gizli = 0;
  fake_kapi.mesaj = 0;
  oyundurum = durum.oynuyor;
  muzikbaslat();
}
dongu();
