// app.js

document.addEventListener("DOMContentLoaded", () => {
  const sliders = ["numParticles", "energyMin", "energyMax", "momentumSpread"];
  sliders.forEach(id => {
    const slider = document.getElementById(id);
    const label = document.getElementById(id + "Value");
    slider.addEventListener("input", () => {
      label.textContent = slider.value;
    });
  });

  document.getElementById("generateBtn").addEventListener("click", async () => {
    const params = {
      numParticles: +document.getElementById("numParticles").value,
      energyMin: +document.getElementById("energyMin").value,
      energyMax: +document.getElementById("energyMax").value,
      momentumSpread: +document.getElementById("momentumSpread").value,
    };

    const particles = await runGanModel(params);
    displayParticles(particles);
  });
});

// Display generated particles in output panel
function displayParticles(particles) {
  const div = document.getElementById("gan-output");
  const preview = particles.slice(0, 10).map((p, i) =>
    `#${i + 1}: ${p.type} | E=${p.energy.toFixed(2)} GeV | p=(${p.px.toFixed(2)}, ${p.py.toFixed(2)}, ${p.pz.toFixed(2)})`
  ).join('\n');

  div.textContent = `🎉 Generated Particles (${particles.length} total):\n\n${preview}\n\n...and more`;
}
