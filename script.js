// Theme toggle persistence
const themeSwitch = document.getElementById('themeSwitch');

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeSwitch.checked = true;
}

themeSwitch.addEventListener('change', () => {
  if (themeSwitch.checked) {
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
});

// DOM Elements
const energyInput = document.getElementById('energyInput');
const generateBtn = document.getElementById('generateBtn');
const particlesList = document.getElementById('particlesList');
const analyticsPanel = document.getElementById('analyticsPanel');

// Physics & GAN Simulation Constants
const PARTICLE_TYPES = ['photon', 'electron', 'muon', 'pion', 'kaon', 'proton', 'neutron', 'jet'];
const PARTICLE_MASSES = {
  photon: 0,
  electron: 0.000511, // GeV/c²
  muon: 0.1057,
  pion: 0.1396,
  kaon: 0.4937,
  proton: 0.9383,
  neutron: 0.9396,
  jet: 0.5 // approx, jet is a shower of particles so simplified
};

// Utility to generate random float between min and max
function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

// Generate a synthetic particle for a given collision energy
function generateParticle(energy) {
  // Weighted random choice for particle type (simplified physics plausibility)
  const weights = [0.25, 0.15, 0.10, 0.15, 0.10, 0.10, 0.05, 0.10];
  let cumulative = 0;
  const rnd = Math.random();
  let type = 'photon';

  for (let i = 0; i < PARTICLE_TYPES.length; i++) {
    cumulative += weights[i];
    if (rnd <= cumulative) {
      type = PARTICLE_TYPES[i];
      break;
    }
  }

  // Energy fraction this particle carries (simplified)
  const energyFraction = randomFloat(0.05, 0.4);
  const particleEnergy = energy * energyFraction;

  // Relativistic momentum magnitude approximation (p = sqrt(E^2 - m^2))
  const mass = PARTICLE_MASSES[type];
  const momentumMag = Math.sqrt(particleEnergy * particleEnergy - mass * mass);

  // Random direction: pseudorapidity (eta), azimuthal angle (phi)
  const eta = randomFloat(-2.5, 2.5);
  const phi = randomFloat(-Math.PI, Math.PI);

  return {
    type,
    energy: particleEnergy.toFixed(3),
    mass: mass,
    momentum: momentumMag.toFixed(3),
    eta: eta.toFixed(3),
    phi: phi.toFixed(3)
  };
}

// Generate synthetic collision event: array of particles
function generateCollisionEvent(energy) {
  // Number of particles increases with energy (simplified)
  const numParticles = Math.floor(randomFloat(5, 15));

  const particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push(generateParticle(energy));
  }
  return particles;
}

// Compute invariant mass of particle system (simplified)
function computeInvariantMass(particles) {
  let E_total = 0;
  let px_total = 0;
  let py_total = 0;
  let pz_total = 0;

  particles.forEach(({ energy, momentum, eta, phi }) => {
    const E = parseFloat(energy);
    const p = parseFloat(momentum);
    const etaF = parseFloat(eta);
    const phiF = parseFloat(phi);

    // Convert spherical coordinates to Cartesian momenta
    const px = p * Math.cos(phiF);
    const py = p * Math.sin(phiF);
    const pz = p * Math.sinh(etaF); // pseudorapidity to pz

    E_total += E;
    px_total += px;
    py_total += py;
    pz_total += pz;
  });

  const massSquared = E_total * E_total - (px_total * px_total + py_total * py_total + pz_total * pz_total);
  return massSquared > 0 ? Math.sqrt(massSquared).toFixed(3) : 'NaN';
}

// Check momentum conservation by vector sum of momenta (should be near zero)
function checkMomentumConservation(particles) {
  let px_total = 0;
  let py_total = 0;
  let pz_total = 0;

  particles.forEach(({ momentum, eta, phi }) => {
    const p = parseFloat(momentum);
    const etaF = parseFloat(eta);
    const phiF = parseFloat(phi);

    const px = p * Math.cos(phiF);
    const py = p * Math.sin(phiF);
    const pz = p * Math.sinh(etaF);

    px_total += px;
    py_total += py;
    pz_total += pz;
  });

  const residual = Math.sqrt(px_total * px_total + py_total * py_total + pz_total * pz_total);
  return residual.toFixed(3);
}

// Animate particle insertion (CSS handles actual animation)
function animateParticleInsertion(element) {
  element.classList.add('particle-item');
}

// Render particles in the list
function renderParticles(particles) {
  particlesList.innerHTML = '';
  particles.forEach((p, i) => {
    const div = document.createElement('div');
    div.textContent = `#${i + 1} | ${p.type.toUpperCase()} | E: ${p.energy} GeV | p: ${p.momentum} GeV/c | η: ${p.eta} | φ: ${p.phi}`;
    animateParticleInsertion(div);
    particlesList.appendChild(div);
  });
}

// Render analytics panel with physical checks
function renderAnalytics(particles) {
  const invariantMass = computeInvariantMass(particles);
  const momentumResidual = checkMomentumConservation(particles);

  analyticsPanel.textContent =
    `📊 Physical Plausibility Analysis\n\n` +
    `- Number of particles: ${particles.length}\n` +
    `- Invariant mass (GeV/c²): ${invariantMass}\n` +
    `- Total momentum residual (should ~0): ${momentumResidual} GeV/c\n\n` +
    `*Note: Residual momentum close to zero indicates approximate conservation.\n` +
    `Particles generated with simplified relativistic assumptions.`;
}

// Event listener for simulate button
generateBtn.addEventListener('click', () => {
  const energy = parseFloat(energyInput.value);
  if (isNaN(energy) || energy <= 0 || energy > 20) {
    alert('Please enter a valid collision energy between 0 and 20 TeV');
    return;
  }

  const particles = generateCollisionEvent(energy);
  renderParticles(particles);
  renderAnalytics(particles);
});
