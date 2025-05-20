import { getMomentumVector } from './analytics.js';

// Generates a pseudorapidity vs. φ scatter dataset
export function getEtaPhiScatterData(particles) {
  return particles.map(p => ({
    eta: p.eta,
    phi: p.phi,
    label: p.label,
    type: p.type
  }));
}

// Compute average transverse momentum
export function getAveragePT(particles) {
  if (!particles.length) return 0;
  const total = particles.reduce((sum, p) => sum + p.pT, 0);
  return total / particles.length;
}

// Generate radial speed metric (energy / total vector magnitude)
export function getRadialMetric(particles) {
  return particles.map(p => {
    const vec = getMomentumVector(p.pT, p.eta, p.phi);
    const magnitude = Math.sqrt(vec.px ** 2 + vec.py ** 2 + vec.pz ** 2);
    return {
      label: p.label,
      speedRatio: p.energy / magnitude || 0
    };
  });
}

// Detect suspicious particles (e.g. energy too low or complex mass)
export function detectUnphysicalResults(particles) {
  const flags = [];
  for (const p of particles) {
    const vec = getMomentumVector(p.pT, p.eta, p.phi);
    const mag = Math.sqrt(vec.px ** 2 + vec.py ** 2 + vec.pz ** 2);
    if (p.energy < mag) {
      flags.push(`⚠️ ${p.label} has E < |p| (${p.energy.toFixed(2)} < ${mag.toFixed(2)})`);
    }
  }
  return flags;
}

// Draw detector structure with concentric rings
export function drawDetectorShells(container, numShells = 4) {
  const radius = container.clientWidth / 2 - 10;
  for (let i = 1; i <= numShells; i++) {
    const ring = document.createElement('div');
    ring.className = 'detector-shell';
    const r = (i / numShells) * radius;
    ring.style.width = `${2 * r}px`;
    ring.style.height = `${2 * r}px`;
    ring.style.left = `${(container.clientWidth - 2 * r) / 2}px`;
    ring.style.top = `${(container.clientHeight - 2 * r) / 2}px`;
    container.appendChild(ring);
  }
}
