// Basic physics constants (GeV/c²)
const MASS = {
  'e⁻': 0.000511,
  'μ⁻': 0.105,
  'νₑ': 0,
  'ν_μ': 0,
  'u': 0.002,
  'd': 0.005,
  's': 0.095,
  'c': 1.27,
  'b': 4.18,
  't': 173,
  'Z⁰': 91.2,
  'W⁺': 80.4,
  'W⁻': 80.4,
  'γ': 0,
  'g': 0
};

// Converts η and φ to momentum vector components
function getMomentumVector(pT, eta, phiDeg) {
  const phi = (phiDeg * Math.PI) / 180;
  const px = pT * Math.cos(phi);
  const py = pT * Math.sin(phi);
  const pz = pT * Math.sinh(eta);
  return { px, py, pz };
}

// Compute total 4-vector from a list of particles
function computeTotal4Vector(particles) {
  let total = { px: 0, py: 0, pz: 0, E: 0 };
  for (const p of particles) {
    const { px, py, pz } = getMomentumVector(p.pT, p.eta, p.phi);
    total.px += px;
    total.py += py;
    total.pz += pz;
    total.E += p.energy;
  }
  return total;
}

// Compute invariant mass from total 4-vector
export function computeInvariantMass(particles) {
  const { px, py, pz, E } = computeTotal4Vector(particles);
  const massSquared = E * E - (px * px + py * py + pz * pz);
  return massSquared >= 0 ? Math.sqrt(massSquared) : NaN;
}

// Check momentum conservation (px, py, pz close to zero)
export function checkMomentumConservation(particles) {
  const { px, py, pz } = computeTotal4Vector(particles);
  const tolerance = 1e-3;
  return Math.abs(px) < tolerance && Math.abs(py) < tolerance && Math.abs(pz) < tolerance;
}

// Get distribution of particle types
export function getParticleTypeDistribution(particles) {
  const dist = {};
  for (const p of particles) {
    dist[p.type] = (dist[p.type] || 0) + 1;
  }
  return dist;
}

// Export mass lookup and helpers for external use if needed
export { MASS, getMomentumVector };
