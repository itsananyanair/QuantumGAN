import { simulateEvent } from './statsEngine.js';
import { computeInvariantMass, checkConservation } from './analytics.js';
import './eastereggs.js';

const energyInput = document.getElementById('energyInput');
const simulateBtn = document.getElementById('simulateBtn');
const particleContainer = document.getElementById('particleContainer');
const consolePanel = document.getElementById('console');
const themeToggle = document.getElementById('themeToggle');
const nerdModeToggle = document.getElementById('nerdModeToggle');

let nerdMode = false;

themeToggle.onclick = () => document.body.classList.toggle('dark');
nerdModeToggle.onclick = () => nerdMode = !nerdMode;

simulateBtn.onclick = () => {
  const energy = parseFloat(energyInput.value);
  const event = simulateEvent(energy);

  particleContainer.innerHTML = '';
  consolePanel.innerHTML = '';

  event.particles.forEach(p => {
    const card = document.createElement('div');
    card.className = 'particle-card';
    card.innerHTML = `
      <strong>${p.type}</strong><br/>
      E = ${p.energy.toFixed(2)} GeV<br/>
      |p| = ${p.momentum.toFixed(2)} GeV/c<br/>
      η = ${p.eta.toFixed(2)}, φ = ${p.phi.toFixed(2)} rad
      ${nerdMode ? `<pre>${JSON.stringify(p.vector, null, 1)}</pre>` : ''}
    `;
    particleContainer.appendChild(card);
  });

  const invMass = computeInvariantMass(event.particles);
  const conserved = checkConservation(event.particles);
  log(`Invariant Mass: ${invMass.toFixed(3)} GeV/c²`);
  log(`Momentum Conservation: ${conserved ? 'OK' : '⚠️ Violated'}`);
};

function log(msg) {
  const line = document.createElement('div');
  line.textContent = msg;
  consolePanel.appendChild(line);
}
