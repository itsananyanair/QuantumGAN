// eastereggs.js

(function () {
  const secretCode = 'cernrocks';
  let inputBuffer = '';

  window.addEventListener('keydown', e => {
    inputBuffer += e.key.toLowerCase();

    if (inputBuffer.length > secretCode.length) {
      inputBuffer = inputBuffer.slice(-secretCode.length);
    }

    if (inputBuffer === secretCode) {
      alert('🎉 CERN Rocks! Keep smashing those protons! 🚀');
      // Bonus: add a confetti canvas or sound effect here.
      triggerConfetti();
      inputBuffer = '';
    }
  });

  function triggerConfetti() {
    // Simple confetti effect using canvas or DOM emojis
    const confettiCount = 100;
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.textContent = '✨';
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.top = Math.random() * window.innerHeight + 'px';
      confetti.style.fontSize = (Math.random() * 24 + 12) + 'px';
      confetti.style.opacity = '0.8';
      confetti.style.pointerEvents = 'none';
      confetti.style.userSelect = 'none';
      confetti.style.transition = 'top 2s ease-out, opacity 2s ease-out';
      document.body.appendChild(confetti);
      setTimeout(() => {
        confetti.style.top = (window.innerHeight + 50) + 'px';
        confetti.style.opacity = '0';
      }, 100);
      setTimeout(() => document.body.removeChild(confetti), 2200);
    }
  }
})();
