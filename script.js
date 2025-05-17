import { computeInvariantMass, checkMomentumConservation, particleTypeDistribution } from './analytics.js';

// HTML element references
const energyInput = document.getElementById('energy');
const generateBtn = document.getElementById('generate');
const particlesList = document.getElementById('particles-list');
const analyticsPanel = document.getElementById('analytics');

// Constants
const PARTICLE_TYPES = ['e⁻', 'e⁺', 'μ⁻', 'μ⁺', 'π⁻', 'π⁺', 'K⁻', 'K⁺', 'γ', 'ν'];
const PARTICLE_MASSES = {
  'e⁻': 0.000511, 'e⁺': 0.000511,
  'μ⁻': 0.105, 'μ⁺': 0.105,
  'π⁻': 0.140, 'π⁺': 0.140,
  'K⁻': 0.494, 'K⁺': 0.494,
  'γ': 0.0, 'ν': 0.0
};

// Utility functions
function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateParticle(energy) {
  const type = randomChoice(PARTICLE_TYPES);
  const mass = PARTICLE_MASSES[type];

  // Energy (between mass and a fraction of collision energy)
  const e = Math.max(energy * randomFloat(0.1, 0.8), mass);
  const p = Math.sqrt(e * e - mass * mass);

  const phi = randomFloat(0, 2 * Math.PI); // azimuthal angle
  const eta = randomFloat(-3, 3);          // pseudorapidity

  return {
    type,
    energy: parseFloat(e.toFixed(3)),
    momentum: parseFloat(p.toFixed(3)),
    mass: parseFloat(mass.toFixed(3)),
    phi,
    eta
  };
}

function generateEvent(energyTeV, count = 10) {
  const energyGeV = energyTeV * 1000;
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(generateParticle(energyGeV));
  }
  return particles;
}

function renderParticles(particles) {
  particlesList.innerHTML = '';
  particles.forEach(p => {
    const div = document.createElement('div');
    div.textContent = `${p.type} | Energy: ${p.energy} GeV | Momentum: ${p.momentum} GeV/c | Mass: ${p.mass} GeV/c²`;
    particlesList.appendChild(div);
  });
}

function renderAnalytics(particles) {
  const invariantMass = computeInvariantMass(particles);
  const momentumResidual = checkMomentumConservation(particles);
  const distribution = particleTypeDistribution(particles);

  let distStr = '';
  for (const [type, count] of Object.entries(distribution)) {
    distStr += `${type}: ${count}  `;
  }

  analyticsPanel.innerHTML = `
    <h3>Collision Analytics</h3>
    <p><strong>Invariant Mass:</strong> ${invariantMass} GeV/c²</p>
    <p><strong>Momentum Residual:</strong> ${momentumResidual} GeV/c</p>
    <p><strong>Particle Distribution:</strong> ${distStr}</p>
  `;
}

// Generate button handler
generateBtn.addEventListener('click', () => {
  const energy = parseFloat(energyInput.value);
  if (isNaN(energy) || energy < 0.1 || energy > 20) {
    alert('Please enter a collision energy between 0.1 and 20 TeV');
    return;
  }
  const particles = generateEvent(energy, 15);
  renderParticles(particles);
  renderAnalytics(particles);
});

