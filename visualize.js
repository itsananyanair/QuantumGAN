let canvas, ctx;
let centerX, centerY;
let animationFrame = 0;
const totalFrames = 60;
let particles = [];

export function initCanvas() {
  canvas = document.getElementById('collision-canvas');
  ctx = canvas.getContext('2d');
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;
}

export function setParticles(particleList) {
  particles = particleList;
}

function getColorForParticle(type) {
  switch (type) {
    case 'jet': return 'red';
    case 'muon': return 'blue';
    case 'photon': return 'green';
    case 'electron': return 'yellow';
    case 'neutrino': return 'gray';
    default: return 'white';
  }
}

function drawAnimatedTracks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  animationFrame++;

  particles.forEach(p => {
    const energy = Math.min(p.energy, 1000);
    const angle = Math.atan2(p.py, p.px);
    const maxLen = (energy / 1000) * 300;
    const currentLen = maxLen * (animationFrame / totalFrames);
    const lineWidth = Math.max(1, (energy / 1000) * 4);

    const endX = centerX + currentLen * Math.cos(angle);
    const endY = centerY + currentLen * Math.sin(angle);

    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = getColorForParticle(p.type);
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // Optional: draw label
    ctx.fillStyle = 'white';
    ctx.font = '12px monospace';
    ctx.fillText(p.type, endX + 5, endY + 5);
  });

  if (animationFrame < totalFrames) {
    requestAnimationFrame(drawAnimatedTracks);
  }
}

export function animateCollision() {
  animationFrame = 0;
  drawAnimatedTracks();
}
