export function simulateEvent(energy) {
  const particleTypes = ['muon', 'electron', 'pion', 'kaon', 'photon'];
  const particles = [];

  for (let i = 0; i < 4; i++) {
    const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
    const E = Math.random() * (energy / 4);
    const theta = Math.random() * Math.PI;
    const phi = Math.random() * 2 * Math.PI;
    const p = E;
    const px = p * Math.sin(theta) * Math.cos(phi);
    const py = p * Math.sin(theta) * Math.sin(phi);
    const pz = p * Math.cos(theta);
    const eta = -Math.log(Math.tan(theta / 2));

    particles.push({
      type,
      energy: E,
      momentum: p,
      eta,
      phi,
      vector: [E, px, py, pz]
    });
  }

  return { particles };
}

