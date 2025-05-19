// physics.js — Core physics functions for QuantumGAN
// Ensures generated events obey fundamental conservation laws

/**
 * Calculates the invariant mass of a system of particles.
 * Input: array of particles with px, py, pz, and energy (E)
 * Formula: M² = (ΣE)² - |Σp⃗|²
 */
function computeInvariantMass(particles) {
  let totalE = 0, totalPx = 0, totalPy = 0, totalPz = 0;

  for (const p of particles) {
    totalE += p.energy;
    totalPx += p.px;
    totalPy += p.py;
    totalPz += p.pz;
  }

  const massSquared = totalE ** 2 - (totalPx ** 2 + totalPy ** 2 + totalPz ** 2);
  return massSquared > 0 ? Math.sqrt(massSquared) : 0;
}

/**
 * Checks momentum conservation in an event.
 * Returns true if total px, py, pz ≈ 0 (within epsilon threshold)
 */
function checkMomentumConservation(particles, epsilon = 1e-3) {
  const total = particles.reduce((acc, p) => {
    acc.px += p.px;
    acc.py += p.py;
    acc.pz += p.pz;
    return acc;
  }, { px: 0, py: 0, pz: 0 });

  return (
    Math.abs(total.px) < epsilon &&
    Math.abs(total.py) < epsilon &&
    Math.abs(total.pz) < epsilon
  );
}

/**
 * Estimate transverse momentum pT from px and py
 */
function computePT(px, py) {
  return Math.sqrt(px ** 2 + py ** 2);
}

/**
 * Estimate pseudo-rapidity (eta) from pz and p
 */
function computeEta(px, py, pz) {
  const p = Math.sqrt(px ** 2 + py ** 2 + pz ** 2);
  const theta = Math.acos(pz / p);
  return -Math.log(Math.tan(theta / 2));
}

/**
 * Compute phi angle from px and py
 */
function computePhi(px, py) {
  return Math.atan2(py, px);
}

/**
 * Convert 4-momentum components into particle record with physics metadata
 */
function createParticle(px, py, pz, energy, type = 'unknown') {
  const pt = computePT(px, py);
  const eta = computeEta(px, py, pz);
  const phi = computePhi(px, py);

  return {
    px,
    py,
    pz,
    energy,
    pT: pt,
    eta,
    phi,
    type,
  };
}
