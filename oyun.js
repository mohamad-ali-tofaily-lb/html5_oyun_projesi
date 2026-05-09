window.addEventListener('keydown', e => {
  if (oyundurum === durum.baslamadi) {
    oyundurum = durum.oynuyor;
    muzikbaslat();
  }
  if ((oyundurum === durum.oldu || oyundurum === durum.kazandi) && e.code === 'Space') {
    sifirla();
  }
});

function dongu() {
  arkaplan();

  if (oyundurum === durum.baslamadi) {
    platformciz();
    kapiciz();
    karakterciz();
    kalplerciz();
    basekrani();
  } else if (oyundurum === durum.oynuyor) {
    guncelle();
    platformciz();
    kapiciz();
    karakterciz();
    kalplerciz();
  } else if (oyundurum === durum.oldu) {
    platformciz();
    kapiciz();
    karakterciz();
    oldekrani();
  } else if (oyundurum === durum.kazandi) {
    platformciz();
    kapiciz();
    karakterciz();
    kazandiekrani();
  }

  requestAnimationFrame(dongu);
}

dongu();
