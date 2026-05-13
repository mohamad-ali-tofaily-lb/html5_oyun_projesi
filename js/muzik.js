const backgroud_music = [
  new Audio('sound/music1.mp3'), 
  new Audio('sound/music2.mp3'), 
  new Audio('sound/music3.mp3'), 
  new Audio('sound/music4.mp3'), 
  new Audio('sound/music5.mp3'),
  new Audio('sound/winmusic.mp3'),
];

backgroud_music.forEach(muzik => {
  muzik.loop = true;
  muzik.volume = 0.4;
});

function muzikbaslat() {
  backgroud_music.forEach(muzik => {
    muzik.pause();
    muzik.currentTime = 0.4;
  });

  backgroud_music[oyunSeviyesi].play().catch(err => console.log('muzik calmiyor:', err));
}
function kazandiMuzikBaslat() {
  backgroud_music.forEach(muzik => {
    muzik.pause();
    muzik.currentTime = 0.4;
  });

  backgroud_music[5].play().catch(err => console.log('muzik calmiyor:', err));
}
function muzikDurdur() {
  backgroud_music.forEach(muzik => {
    muzik.pause();
    muzik.currentTime = 0.4;
  });
}


const zipla = new Audio('sound/jump.mp3');
zipla.volume = 0.4;
function ziplaSes() {
  zipla.play().catch(err => console.log('sessiz zipladin basarilar:', err));
}

const oldu = new Audio('sound/death.mp3');
function olduSes() {
  oldu.play().catch(err => console.log('sessiz zipladin basarilar:', err));
}