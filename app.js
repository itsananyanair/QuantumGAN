import { initCanvas, setParticles, animateCollision } from './visualize.js';
import { generateParticlesForEvent } from './particles.js';

document.addEventListener('DOMContentLoaded', () => {
  initCanvas();

  const eventSelect = document.getElementById('event-select');
  const generateButton = document.getElementById('generate-event');

  generateButton.addEventListener('click', () => {
    const selectedType = eventSelect.value;
    const particles = generateParticlesForEvent(selectedType);
    setParticles(particles);
    animateCollision();
  });

  // Trigger default event on load
  const defaultParticles = generateParticlesForEvent(eventSelect.value);
  setParticles(defaultParticles);
  animateCollision();
});
