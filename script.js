// Generates a synthetic proton-proton collision event
export function generateCollisionEvent(energyGeV) {
  const numParticles = Math.floor(Math.random() * 4) + 2;
  const particles = [];

  for (let i = 0; i < numParticles; i++) {
    const type = randomParticleType();
    const label = getParticleLabel(type);
    const pT = +(Math.random() * energyGeV * 0.1).toFixed(2);
    const eta = +(Math.random() * 5 - 2.5).toFixed(2); // pseudorapidity range
    const phi = +(Math.random() * 360).toFixed(2);
    const energy = +(pT * (1 + Math.abs(eta) * 0.1)).toFixed(2); // fake logic

    particles.push({ type, label, pT, eta, phi, energy });
  }

  return particles;
}

function randomParticleType() {
  const types = ['quark', 'lepton', 'gluon', 'boson'];
  return types[Math.floor(Math.random() * types.length)];
}

function getParticleLabel(type) {
  const labelMap = {
    quark: ['u', 'd', 's', 'c', 'b', 't'],
    lepton: ['e⁻', 'μ⁻', 'νₑ', 'ν_μ'],
    gluon: ['g'],
    boson: ['Z⁰', 'W⁺', 'W⁻', 'γ']
  };
  const options = labelMap[type];
  return options[Math.floor(Math.random() * options.length)];
}

// Optional: dark mode toggle logic
window.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
});
