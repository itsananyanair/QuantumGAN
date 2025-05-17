function computeInvariantMass(particles) {
  const totalE = particles.reduce((sum, p) => sum + p.energy, 0);
  const totalPx = particles.reduce((sum, p) => sum + p.px, 0);
  const totalPy = particles.reduce((sum, p) => sum + p.py, 0);
  const totalPz = particles.reduce((sum, p) => sum + p.pz, 0);
  const mass2 = totalE**2 - (totalPx**2 + totalPy**2 + totalPz**2);
  return Math.sqrt(Math.max(mass2, 0));
}

function sumMomentum(particles) {
  return {
    px: particles.reduce((sum, p) => sum + p.px, 0),
    py: particles.reduce((sum, p) => sum + p.py, 0),
    pz: particles.reduce((sum, p) => sum + p.pz, 0),
  };
}

function plotHistogram(canvasId, data, label, ylabel) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map((_, i) => i + 1),
      datasets: [{
        label: label,
        data: data,
        backgroundColor: '#2aa198',
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          title: { display: true, text: ylabel },
        }
      }
    }
  });
}

function plotMomentumChart(canvasId, vectors) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  const px = vectors.map(v => v.px);
  const py = vectors.map(v => v.py);

  new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Momentum Vectors (px, py)',
        data: px.map((val, i) => ({ x: val, y: py[i] })),
        backgroundColor: '#b58900'
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'px (GeV/c)' } },
        y: { title: { display: true, text: 'py (GeV/c)' } }
      }
    }
  });
}
