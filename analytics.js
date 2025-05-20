// Compute invariant mass from 4-momentum vectors
export function computeInvariantMass(particles) {
  const total = particles.reduce((acc, p) => {
    acc.E += p.vector[0];
    acc.px += p.vector[1];
    acc.py += p.vector[2];
    acc.pz += p.vector[3];
    return acc;
  }, { E: 0, px: 0, py: 0, pz: 0 });

  const mass2 = total.E**2 - (total.px**2 + total.py**2 + total.pz**2);
  return mass2 >= 0 ? Math.sqrt(mass2) : NaN;
}

export function checkConservation(particles) {
  const totalP = particles.reduce((acc, p) => {
    acc.px += p.vector[1];
    acc.py += p.vector[2];
    acc.pz += p.vector[3];
    return acc;
  }, { px: 0, py: 0, pz: 0 });

  const tol = 1e-2;
  return Math.abs(totalP.px) < tol && Math.abs(totalP.py) < tol && Math.abs(totalP.pz) < tol;
}
