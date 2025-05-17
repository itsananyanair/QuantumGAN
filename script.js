// script.js

// Global particle data
const particleTypes = ['Electron', 'Muon', 'Pion', 'Photon', 'Kaon', 'Proton', 'Neutrino'];

// Color map (optional, used for analytics & display)
const particleColors = {
  Electron: '#4ade80',
  Muon: '#22d3ee',
  Pion: '#facc15',
  Photon: '#f87171',
  Kaon: '#a78bfa',
  Proton: '#f472b6',
  Neutrino: '#9ca3af'
};

// DOM refs
const energyInput = document.getElementById('energyInputMain');
const generateBtn = document.getElementById('generateBtn');
const particlesList = document.getElementById('particlesList');
const analyticsPanel = document.getElementById('analyticsPanel');

// Stores current generated particles
let currentParticles = [];

// Generate synthetic particles based on energy input (TeV)
// Physics-aware: particle counts roughly scale with sqrt(energy), energies per particle random with limits
function generateCollisionParticles(energyTeV) {
  const nParticles = Math.floor(5 + Math.sqrt(energyTeV) * 15); // example scaling
  let particles = [];

  for (let i = 0; i < nParticles; i++) {
    // Random particle type weighted by physics-inspired rough abundance
    const type = weightedRandomParticle();

    // Energy per particle (GeV), constrained by total collision energy
    // Random fraction of collision energy scaled by some physics-inspired distribution
    const particleEnergy = randomParticleEnergy(type, energyTeV);

    // Generate particle object
    particles.push({
      id: i + 1,
      type,
      energy: particleEnergy,
      momentum: generateRandomMomentum(particleEnergy),
      eta: randRange(-3, 3),
      phi: randRange(-Math.PI, Math.PI)
    });
  }

  return particles;
}

// Weighted random particle type (rough LHC physics abundance)
function weightedRandomParticle() {
  const weights = {
    Electron: 10,
    Muon: 8,
    Pion: 40,
    Photon: 20,
    Kaon: 12,
    Proton: 5,
    Neutrino: 5
  };
  const sum = Object.values(weights).reduce((a,b)=>a+b, 0);
  let r = Math.random() * sum;
  for (const [type, w] of Object.entries(weights)) {
    if (r < w) return type;
    r -= w;
  }
  return 'Pion';
}

// Generate random momentum vector magnitude based on energy (simplified)
// Here momentum ≈ energy (in GeV) ignoring mass for simplicity
function generateRandomMomentum(energy) {
  const p = energy; // GeV/c
  return p;
}

// Generate random number in range [min, max]
function randRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Particle energy range by type and collision energy (TeV)
// Rough example limits, e.g. electrons tend to have lower energies, photons broader
function randomParticleEnergy(type, collisionEnergyTeV) {
  const maxGeV = collisionEnergyTeV * 1000; // Convert TeV to GeV
  switch(type) {
    case 'Electron': return randRange(1, Math.min(30, maxGeV * 0.05));
    case 'Muon': return randRange(1, Math.min(50, maxGeV * 0.1));
    case 'Pion': return randRange(0.5, Math.min(200, maxGeV * 0.2));
    case 'Photon': return randRange(0.1, Math.min(400, maxGeV * 0.3));
    case 'Kaon': return randRange(0.5, Math.min(150, maxGeV * 0.15));
    case 'Proton': return randRange(5, Math.min(500, maxGeV * 0.4));
    case 'Neutrino': return randRange(0.01, Math.min(10, maxGeV * 0.02));
    default: return randRange(1, Math.min(50, maxGeV * 0.1));
  }
}

// Update particles list UI
function renderParticles(particles) {
  if (!particles.length) {
    particlesList.innerHTML = '<i>No particles generated.</i>';
    return;
  }

  const html = particles.map(p => {
    return `<div class="particle" style="color:${particleColors[p.type] || '#aaa'};">
      <strong>Particle #${p.id}</strong>:
      ${p.type} | Energy: ${p.energy.toFixed(2)} GeV | Momentum: ${p
