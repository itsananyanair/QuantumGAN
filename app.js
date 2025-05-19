// app.js — Entry point for QuantumGAN UI logic and interactions

// Wait until DOM is fully loaded before initializing
document.addEventListener('DOMContentLoaded', () => {
  const runBtn = document.getElementById('run-simulation');
  const uploadInput = document.getElementById('upload-data');
  const statusBox = document.getElementById('status-box');

  runBtn.addEventListener('click', () => {
    statusBox.innerText = '🧠 Simulating proton-proton collisions...';
    runGANSimulation();
    statusBox.innerText = '✅ Simulation complete. See results below.';
  });

  uploadInput.addEventListener('change', handleFileUpload);
});

// Handle CSV file uploads to mimic real/synthetic CMS-like data
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    const parsedParticles = parseCSVToParticles(text);

    const div = document.getElementById('real-data-output');
    div.innerHTML = `
      <h3>📂 Uploaded Dataset (${parsedParticles.length} particles)</h3>
      <pre>${JSON.stringify(parsedParticles.slice(0, 5), null, 2)}\n...more</pre>
    `;
  };
}

// CSV Parser — expected format: px,py,pz,energy,type
function parseCSVToParticles(csvText) {
  const lines = csvText.trim().split('\n');
  const particles = [];

  for (const line of lines) {
    const [px, py, pz, energy, type] = line.split(',').map(v => v.trim());

    const particle = createParticle(
      parseFloat(px),
      parseFloat(py),
      parseFloat(pz),
      parseFloat(energy),
      type || 'csv'
    );
    particles.push(particle);
  }

  return particles;
}
