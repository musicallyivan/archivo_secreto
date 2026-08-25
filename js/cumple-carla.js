const music = document.getElementById('music');
const playBtn = document.getElementById('playBtn');
const nextBtn = document.getElementById('nextBtn');
const musicState = document.getElementById('musicState');
const disc = document.getElementById('disc');
const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseText = document.getElementById('surpriseText');

const tracks = [
  { title: 'Blessings', file: 'assets/media/MUSICA 1.mp3' },
  { title: 'Tell Me', file: 'assets/media/MUSICA 2.mp3' },
  { title: 'Raindance', file: 'assets/media/MUSICA 4.mp3' },
  { title: 'Buenos Días', file: 'assets/media/MUSICA 5.mp3' }
];
let trackIndex = 0;

function loadTrack(index) {
  trackIndex = (index + tracks.length) % tracks.length;
  music.src = tracks[trackIndex].file;
  musicState.textContent = `Pista: ${tracks[trackIndex].title}`;
}

async function toggleMusic() {
  if (music.paused) {
    try {
      await music.play();
      playBtn.textContent = 'Ⅱ Pausar';
      musicState.textContent = `Reproduciendo: ${tracks[trackIndex].title}`;
      disc.classList.add('playing');
    } catch {
      musicState.textContent = 'Pulsa otra vez para iniciar la música.';
    }
  } else {
    music.pause();
    playBtn.textContent = '▶ Reproducir';
    musicState.textContent = `En pausa: ${tracks[trackIndex].title}`;
    disc.classList.remove('playing');
  }
}

playBtn.addEventListener('click', toggleMusic);
nextBtn.addEventListener('click', async () => {
  loadTrack(trackIndex + 1);
  try { await music.play(); disc.classList.add('playing'); playBtn.textContent = 'Ⅱ Pausar'; } catch {}
});
music.addEventListener('ended', () => { loadTrack(trackIndex + 1); music.play().catch(() => {}); });

surpriseBtn.addEventListener('click', () => {
  surpriseText.classList.toggle('hidden');
  surpriseBtn.textContent = surpriseText.classList.contains('hidden') ? 'Abrir sorpresa 💌' : 'Cerrar sorpresa';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

loadTrack(0);
