// gan.js — GAN core loop for QuantumGAN (in-browser simulation of particle events)

// Store trained “generator” behavior for demo purposes.
// In real usage, this could be improved using TensorFlow.js or a server backend.

// 👨‍🔬 Configurable GAN Parameters
const GAN_CONFIG = {
  noiseDim: 5,         // latent noise vector size
  batchSize: 10,       // how many events to generate per loop
  eventSize: 4,        // particles per event
};

// Generator: Create synthetic particle collision events from noise
function generator(noiseVector) {
  const event = [];

  // Create particles with pseudo-random momentum & energy
  for (let i = 0; i < GAN_CONFIG.eventSize; i++) {
    const px = randomInRange(-200, 200);
    const py = randomInRange(-200, 200);
    const pz = randomInRange(-500, 500);
    const mass = randomInRange(0, 2); // in GeV (light particles)
    const energy = Math.sqrt(px ** 2 + py ** 2 + pz ** 2 + mass ** 2);

    const particle = createParticle(px, py, pz, energy, `gen-${i}`);
    event.push(particle);
  }

  return event;
}

// Discriminator: Check if event follows physical plausibility (realistic filter)
function discriminator(event) {
  const momentumConserved = checkMomentumConservation(event);
  const invMass = computeInvariantMass(event);

  // Simple realism score: penalize broken momentum conservation
  const realismScore = momentumConserved ? 1 : 0;

  return {
    accepted: realismScore === 1,
    invariantMass: invMass.toFixed(2),
    realismScore
  };
}

// Run GAN loop: generate batch of fake events and evaluate them
function runGANSimulation() {
  const resultsContainer = document.getElementById('gan-output');
  resultsContainer.innerHTML = '';

  for (let i = 0; i < GAN_CONFIG.batchSize; i++) {
    const noise = Array.from({ length: GAN_CONFIG.noiseDim }, () => Math.random());
    const syntheticEvent = generator(noise);
    const evaluation = discriminator(syntheticEvent);

    const div = document.createElement('div');
    div.classList.add('event-card');
    div.innerHTML = `
      <h3>Event #${i + 1}</h3>
      <p><strong>Particles:</strong> ${syntheticEvent.length}</p>
      <p><strong>Invariant Mass:</strong> ${evaluation.invariantMass} GeV</p>
      <p><strong>Momentum Conserved:</strong> ${evaluation.accepted ? '✅' : '❌'}</p>
      <details>
        <summary>Details</summary>
        <pre>${JSON.stringify(syntheticEvent, null, 2)}</pre>
      </details>
    `;
    resultsContainer.appendChild(div);
  }
}
