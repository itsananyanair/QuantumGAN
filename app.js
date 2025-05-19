// app.js
import { initCanvas, visualizeEvent } from './visualize.js';
import { generateParticlesForEvent } from './particles.js';

let currentEventType = 'higgs';
let showJets = true;
let showMuons = true;
let showPhotons = true;
let showElectrons = true;

function initApp() {
  initCanvas();
  setupUI();
  triggerEvent(currentEventType);
}

function setupUI() {
  document.getElementById('event-select').addEventListener('change', (e) => {
    currentEventType = e.target.value;
    triggerEvent(currentEventType);
  });

  document.querySelectorAll('input[type=checkbox]').forEach(cb => {
    cb.addEventListener('change', () => {
      showJets = document.getElementById('show-jets').checked;
      showMuons = document.getElementById('show-muons').checked;
      showPhotons = document.getElementById('show-photons').checked;
      showElectrons = document.getElementById('show-electrons').checked;
      triggerEvent(currentEventType);
    });
  });

  document.getElementById('regenerate').addEventListener('click', () => {
    triggerEvent(currentEventType);
  });
}

function triggerEvent(type) {
  const allParticles = generateParticlesForEvent(type);
  const filtered = allParticles.filter(p => {
    if (p.type === 'jet' && !showJets) return false;
    if (p.type === 'muon' && !showMuons) return false;
    if (p.type === 'photon' && !showPhotons) return false;
    if (p.type === 'electron' && !showElectrons) return false;
    return true;
  });
  visualizeEvent(filtered);
}

document.addEventListener('DOMContentLoaded', initApp);

