// particles.js

// Particle class representing a visualizable physics object
class Particle {
  constructor({ type, energy, eta, phi }) {
    this.type = type;
    this.energy = energy;
    this.eta = eta;
    this.phi = phi;
    this.color = getParticleColor(type);
    this.vector = polarToCartesian(energy, eta, phi);
  }

  // Compute display properties (length, thickness) from energy
  getDisplayProps() {
    return {
      length: clamp(this.energy * 8, 10, 150),
      thickness: clamp(this.energy / 10, 1, 5),
    };
  }
}

// Generate synthetic particle events
function generateParticlesForEvent(type) {
  let particles = [];

  switch (type) {
    case 'higgs':
      // Higgs-like decay to 2 photons, 2 jets
      particles.push(...[
        new Particle({ type: 'photon', energy: randRange(40, 60), eta: randRange(-2, 2), phi: randRange(0, 2 * Math.PI) }),
        new Particle({ type: 'photon', energy: randRange(40, 60), eta: randRange(-2, 2), phi: randRange(0, 2 * Math.PI) }),
        new Particle({ type: 'jet', energy: randRange(50, 100), eta: randRange(-3, 3), phi: randRange(0, 2 * Math.PI) }),
        new Particle({ type: 'jet', energy: randRange(50, 100), eta: randRange(-3, 3), phi: randRange(0, 2 * Math.PI) }),
      ]);
      break;

    case 'drell-yan':
      // Drell-Yan: muon and antimuon
      particles.push(...[
        new Particle({ type: 'muon', energy: randRange(30, 70), eta: randRange(-2.5, 2.5), phi: randRange(0, 2 * Math.PI) }),
        new Particle({ type: 'muon', energy: randRange(30, 70), eta: randRange(-2.5, 2.5), phi: randRange(0, 2 * Math.PI) }),
      ]);
      break;

    case 'qcd':
    default:
      // QCD multijet: random 4-6 jets
      const jetCount = Math.floor(randRange(4, 7));
      for (let i = 0; i < jetCount; i++) {
        particles.push(
          new Particle({
            type: 'jet',
            energy: randRange(20, 100),
            eta: randRange(-3, 3),
            phi: randRange(0, 2 * Math.PI),
          })
        );
      }
      break;
  }

  return particles;
}
