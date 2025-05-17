
// analytics.js

// Constants reused in multiple files - physics data
const PARTICLE_MASSES = {
  photon: 0,
  electron: 0.000511,
  muon: 0.1057,
  pion: 0.1396,
  kaon: 0.4937,
  proton: 0.9383,
  neutron: 0.9396,
  jet: 0.5
};

// Compute invariant mass (GeV/c²)
export function computeInvariantMass(particles) {
  let E = 0, px = 0, py = 0, pz = 0;
  particles.forEach(({energy, momentum, eta, phi}) => {
    const e = parseFloat(energy);
    const p = parseFloat(momentum);
    const et = parseFloat(eta);
    const ph = parseFloat(phi);

    E += e;
    px += p * Math.cos(ph);
    py += p * Math.sin(ph);
    pz += p * Math.sinh(et);
  });

  const mSq = E*E - (px*px + py*py + pz*pz);
  return mSq > 0 ? Math.sqrt(mSq).toFixed(3) : 'NaN';
}

// Check total momentum residual (ideally near zero)
export function checkMomentumConservation(particles) {
  let px = 0, py = 0, pz = 0;
  particles.forEach(({momentum, eta, phi}) => {
    const p = parseFloat(momentum);
    const et = parseFloat(eta);
    const ph = parseFloat(phi);
    px += p * Math.cos(ph);
    py += p * Math.sin(ph);
    pz += p * Math.sinh(et);
  });

  return Math.sqrt(px*px + py*py + pz*pz).toFixed(3);
}

// Summarize particle type distribution
export function particleTypeDistribution(particles) {
  const counts = {};
  particles.forEach(p => {
    counts[p.type] = (counts[p.type] || 0) + 1;
  });
  return counts;
}
