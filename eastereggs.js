window.addEventListener('keydown', (() => {
  let buffer = [];
  const konami = [38,38,40,40,37,37,39,39,66,65]; // ↑↑↓↓←←→→BA

  return (e) => {
    buffer.push(e.keyCode);
    buffer = buffer.slice(-konami.length);
    if (JSON.stringify(buffer) === JSON.stringify(konami)) {
      alert('🧪 Higgs Mode Activated!');
      console.log('🌟 You unlocked secret decay chains! Simulate high energies for surprise states.');
    }
  };
})());
