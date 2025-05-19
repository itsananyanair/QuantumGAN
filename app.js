import { initCanvas, visualizeEvent } from "./visualize.js";
import { generateParticlesForEvent } from "./particles.js";

let currentParticles = [];
let visibleTypes = {
  jet: true,
  muon: true,
  photon: true,
  electron: true,
};

function updateParticles() {
  const eventType = document.getElementById("event-select").value;
  currentParticles = generateParticlesForEvent(eventType);
  draw();
}

function draw() {
  const filtered = currentParticles.filter(p => visibleTypes[p.type]);
  visualizeEvent(filtered);
}

document.getElementById("regenerate").addEventListener("click", updateParticles);
["jet", "muon", "photon", "electron"].forEach(type => {
  document.getElementById(`show-${type}s`).addEventListener("change", e => {
    visibleTypes[type] = e.target.checked;
    draw();
  });
});

window.addEventListener("load", () => {
  initCanvas();
  updateParticles();
});
