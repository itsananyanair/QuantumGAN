let canvas, ctx;
let origin = { x: 400, y: 400 }; // Center of 800x800 canvas

export function initCanvas() {
  canvas = document.getElementById("collision-canvas");
  ctx = canvas.getContext("2d");
  console.log("Canvas loaded:", canvas.width, canvas.height);
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
