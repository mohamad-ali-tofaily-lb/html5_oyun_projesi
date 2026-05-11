const muzik = new Audio('sound/music.mp3');
muzik.loop = true;
muzik.volume = 0.4;

function muzikbaslat() {
  muzik.currentTime = 0;
  muzik.play().catch(err => console.log('muzik calmiyor:', err));
}
