
// analytics.js

/**
 * Compute total invariant mass of all particles in the event.
 * Formula: M² = (ΣE)² - (Σpₓ)² - (Σpᵧ)² - (Σp_z)²
 * Returns invariant mass in GeV/c².
 */
export function computeInvariantMass(particles) {
  let totalE = 0;
  let totalPx = 0;
  let totalPy = 0;
  let totalPz = 0;

  particles.forEach(p => {
    const px = p.momentum * Math.cos(p.phi);
    const py = p.momentum * Math.sin(p.phi);
    const pz = p.momentum * Math.sinh(p.eta); // pseudorapidity approximation

    totalE += p.energy;
    totalPx += px;
    totalPy += py;
    totalPz += pz;
  });

  const invariantMassSquared =
    totalE ** 2 - totalPx ** 2 - totalPy ** 2 - totalPz ** 2;

  return invariantMassSquared >= 0
    ? Math.sqrt(invariantMassSquared).toFixed(3)
    : 'Non-physical';
}

/**
 * Check total momentum vector residual.
 * Useful for approximating conservation of momentum.
 * Returns residual in GeV/c.
 */
export function checkMomentumConservation(particles) {
  let totalPx = 0;
  let totalPy = 0;
  let totalPz = 0;

  particles.forEach(p => {
    totalPx += p.momentum * Math.cos(p.phi);
    totalPy += p.momentum * Math.sin(p.phi);
    totalPz += p.momentum * Math.sinh(p.eta);
  });

  const residual = Math.sqrt(totalPx ** 2 + totalPy ** 2 + totalPz ** 2);
  return residual.toFixed(3);
}

/**
 * Count and return number of particles by type.
 * Returns object: { e⁻: 2, μ⁺: 1, γ: 3, ... }
 */
export function particleTypeDistribution(particles) {
  const dist = {};
  particles.forEach(p => {
    if (!dist[p.type]) dist[p.type] = 0;
    dist[p.type]++;
  });
  return dist;
}
