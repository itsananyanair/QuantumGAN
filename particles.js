export function generateParticlesForEvent(type) {
  const count = 10 + Math.floor(Math.random() * 10);
  const particles = [];
  for (let i = 0; i < count; i++) {
    const energy = Math.random() * 100 + 10;
    const phi = Math.random() * 2 * Math.PI;
    const ptype = ["jet", "muon", "photon", "electron"][Math.floor(Math.random() * 4)];
    particles.push({ energy, phi, type: ptype });
  }
  return particles;
}

