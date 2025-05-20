let secretSequence = [];
const konamiCode = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

function enableHiggsMode() {
  console.log('%c✨ Higgs Mode Activated ✨', 'color: #ff69b4; font-weight: bold; font-size: 14px;');
  document.body.classList.add('higgs-mode');

  const audio = new Audio('https://upload.wikimedia.org/wikipedia/commons/e/e8/Particle_collision_sound.ogg');
  audio.play();
}

// Secret commands in console
window.nerd = {
  help() {
    console.table({
      nerd: 'Access hidden debug commands',
      beamMeUp: 'Prints a teleport surprise',
      stats: 'Dumps internal simulation stats',
      quantumJoke: 'Gives you a particle pun'
    });
  },
  beamMeUp() {
    console.log("🌀 Initiating quantum teleportation... just kidding.");
  },
  stats() {
    console.log('🔬 No simulation running. Stats coming soon.');
  },
  quantumJoke() {
    console.log("Why did the tachyon leave the party early? Because it was already there.");
  }
};

// Konami Code listener
window.addEventListener('keydown', (e) => {
  secretSequence.push(e.key);
  if (secretSequence.length > konamiCode.length) secretSequence.shift();
  if (konamiCode.every((key, i) => key === secretSequence[i])) {
    enableHiggsMode();
    secretSequence = [];
  }
});
