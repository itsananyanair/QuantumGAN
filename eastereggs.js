
// eastereggs.js — Secret Features for Nerds
// Handles hidden surprises, key triggers, and particle anomalies

const EasterEggs = (() => {
  let activated = false;

  // Konami Code for QuantumCat 🐱⚛️
  const konamiSequence = [
    'ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'
  ];

  let keyBuffer = [];

  function activateQuantumCat() {
    const cat = document.createElement('div');
    cat.className = 'quantum-cat';
    cat.innerHTML = '🐱 QuantumCat Activated!';
    document.body.appendChild(cat);
    cat.style.position = 'fixed';
    cat.style.top = '50%';
    cat.style.left = '50%';
    cat.style.transform = 'translate(-50%, -50%)';
    cat.style.padding = '1em';
    cat.style.border = '2px dashed #fff';
    cat.style.background = '#000';
    cat.style.zIndex = 10000;
    cat.style.fontSize = '2rem';

    setTimeout(() => cat.remove(), 5000);
  }

  document.addEventListener('keydown', (e) => {
    keyBuffer.push(e.key);
    if (keyBuffer.length > konamiSequence.length) keyBuffer.shift();
    if (konamiSequence.every((k, i) => keyBuffer[i] === k)) {
      activateQuantumCat();
    }
  });

  function triggerRareEvent() {
    if (Math.random() < 0.01) { // 1% chance
      alert("🧨 Rare Higgs-like event detected!");
    }
  }

  return {
    triggerRareEvent
  };
})();

