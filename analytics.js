
const ParticleAnalytics = (() => {
  let stats = {
    total: 0,
    types: {},
    maxEnergy: 0,
    histogram: []
  };

  function logParticle(particle) {
    stats.total++;
    const type = particle.type;
    const e = particle.energy || 0;
    if (!stats.types[type]) stats.types[type] = 0;
    stats.types[type]++;
    if (e > stats.maxEnergy) stats.maxEnergy = e;
    stats.histogram.push(e);
    updateDashboard();
  }

  function updateDashboard() {
    const panel = document.getElementById('analytics-panel');
    if (!panel) return;

    panel.innerHTML = `
      <h3>📊 Analytics</h3>
      <p><strong>Total Particles:</strong> ${stats.total}</p>
      <p><strong>Max Energy:</strong> ${stats.maxEnergy.toFixed(2)} GeV</p>
      <ul>
        ${Object.entries(stats.types).map(([type, count]) => `<li>${type}: ${count}</li>`).join('')}
      </ul>
    `;
  }

  function reset() {
    stats = { total: 0, types: {}, maxEnergy: 0, histogram: [] };
    updateDashboard();
  }

  return {
    logParticle,
    reset,
    getStats: () => stats
  };
})();
