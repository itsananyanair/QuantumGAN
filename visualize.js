// visualize.js

let canvas, ctx;
const origin = { x: 400, y: 400 }; // Center of canvas (collision point)

function initCanvas() {
  canvas = document.getElementById('collision-canvas');
  ctx = canvas.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  console.log('Canvas initialized:', canvas.width, canvas.height);
}

function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  origin.x = canvas.width / 2;
  origin.y = canvas.height / 2;
}

function clearCanvas() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawParticleTrack(particle, frame = 1) {
  const { x: dx, y: dy } = phiToDirection(particle.phi);
  const { length, thickness } = particle.getDisplayProps();
  const maxFrame = 30;
  const prog = Math.min(frame / maxFrame, 1);
  const x = origin.x;
  const y = origin.y;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + dx * length * prog, y + dy * length * prog);
  ctx.strokeStyle = particle.color;
  ctx.lineWidth = thickness;
  ctx.stroke();
}

function animateParticles(particles, frame = 1) {
  clearCanvas();
  for (const p of particles) {
    drawParticleTrack(p, frame);
  }
  if (frame < 30) {
    requestAnimationFrame(() => animateParticles(particles, frame + 1));
  }
}

function visualizeEvent(particles) {
  animateParticles(particles, 1);
}

export { initCanvas, visualizeEvent };
