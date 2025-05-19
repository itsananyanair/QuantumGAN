let canvas, ctx;

export function initCanvas() {
  canvas = document.getElementById('collision-canvas');
  if (!canvas) {
    console.error('Canvas element not found');
    return;
  }
  ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('2D context not available');
    return;
  }
  console.log('Canvas initialized:', canvas.width, canvas.height);
}

export function visualizeEvent(particles) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    const angle = p.phi;
    const length = Math.min(p.energy * 10, 200);
    const x = origin.x + length * Math.cos(angle);
    const y = origin.y + length * Math.sin(angle);
    ctx.strokeStyle = getColor(p.type);
    ctx.lineWidth = Math.max(1, p.energy / 10);
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function getColor(type) {
  switch (type) {
    case "jet": return "red";
    case "muon": return "blue";
    case "photon": return "green";
    case "electron": return "yellow";
    default: return "white";
  }
}
