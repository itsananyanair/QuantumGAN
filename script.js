const PARTICLE_TYPES = ['muon', 'electron', 'photon', 'pion', 'kaon'];

function generateEvent(totalEnergy) {
  const numParticles = Math.floor(Math.random() * 3) + 2; // 2 to 4
  const particles = [];
  let pxTotal = 0, pyTotal = 0, pzTotal = 0;

  for (let i = 0; i < numParticles; i++) {
    // Distribute momentum
    const px = (Math.random() - 0.5) * totalEnergy / 10;
    const py = (Math.random() - 0.5) * totalEnergy / 10;
    const pz = (Math.random() - 0.5) * totalEnergy / 10;
    const p2 = px**2 + py**2 + pz**2;
    const mass = Math.random() * 0.5 + 0.1; // rest mass in GeV
    const energy = Math.sqrt(p2 + mass**2);

    pxTotal += px;
    pyTotal += py;
    pzTotal += pz;

    particles.push({ px, py, pz, energy, type: randomType() });
  }

  return { particles, pxTotal, pyTotal, pzTotal };
}

function randomType() {
  return PARTICLE_TYPES[Math.floor(Math.random() * PARTICLE_TYPES.length)];
}

function invariantMass(particles) {
  const E = particles.reduce((sum, p) => sum + p.energy, 0);
  const px = particles.reduce((sum, p) => sum + p.px, 0);
  const py = particles.reduce((sum, p) => sum + p.py, 0);
  const pz = particles.reduce((sum, p) => sum + p.pz, 0);
  return Math.sqrt(Math.max(0, E**2 - px**2 - py**2 - pz**2));
}

function plotCharts(events) {
  const masses = events.map(e => invariantMass(e.particles));
  const momentumXY = events.map(e => ({ x: e.pxTotal, y: e.pyTotal }));

  const ctx1 = document.getElementById('massChart').getContext('2d');
  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: masses.map((_, i) => `Event ${i + 1}`),
      datasets: [{
        label: 'Invariant Mass (GeV)',
        data: masses,
        backgroundColor: 'rgba(88,166,255,0.8)'
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });

  const ctx2 = document.getElementById('momentumChart').getContext('2d');
  new Chart(ctx2, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Momentum Balance (px vs py)',
        data: momentumXY,
        backgroundColor: 'rgba(35,134,54,0.8)'
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'px Total (GeV)' } },
        y: { title: { display: true, text: 'py Total (GeV)' } }
      }
    }
  });
}

document.getElementById('collisionForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const energy = parseFloat(document.getElementById('energyInput').value);
  const count = parseInt(document.getElementById('eventCount').value);
  const events = [];

  for (let i = 0; i < count; i++) {
    events.push(generateEvent(energy));
  }

  plotCharts(events);
});

