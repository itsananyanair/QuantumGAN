document.getElementById('simulate-btn').addEventListener('click', async () => {
  const file = document.getElementById('file-input').files[0];
  if (!file) return alert('Please upload a dataset JSON file.');

  const text = await file.text();
  const data = JSON.parse(text);
  const syntheticEvents = generateSyntheticEvents(data);

  const masses = syntheticEvents.map(evt => computeInvariantMass(evt.particles));
  const totalMomentums = syntheticEvents.map(evt => sumMomentum(evt.particles));

  plotHistogram('invariantMassChart', masses, 'Invariant Mass (GeV/c²)', 'Events');
  plotMomentumChart('momentumChart', totalMomentums);
});

// Fake-GAN inspired synthetic event generator
function generateSyntheticEvents(realData) {
  const synthetic = [];

  for (let i = 0; i < 100; i++) {
    const base = realData[Math.floor(Math.random() * realData.length)];
    const jitteredParticles = base.particles.map(p => ({
      px: p.px * (0.95 + Math.random() * 0.1),
      py: p.py * (0.95 + Math.random() * 0.1),
      pz: p.pz * (0.95 + Math.random() * 0.1),
      energy: p.energy * (0.9 + Math.random() * 0.2),
      type: p.type,
    }));
    synthetic.push({ particles: jitteredParticles });
  }

  return synthetic;
}
