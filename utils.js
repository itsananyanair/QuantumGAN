// utils.js

// Returns a random float between min and max
function randRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Returns a random item from an array
function randChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Converts polar (energy, eta, phi) to Cartesian (px, py, pz)
function polarToCartesian(energy, eta, phi) {
  const theta = 2 * Math.atan(Math.exp(-eta));
  const p = energy; // assume massless particle approximation
  return {
    px: p * Math.cos(phi),
    py: p * Math.sin(phi),
    pz: p / Math.tan(theta),
  };
}

// Map particle type to color
function getParticleColor(type) {
  const colorMap = {
    jet: 'red',
    muon: 'blue',
    photon: 'green',
    electron: 'yellow',
    default: 'white',
  };
  return colorMap[type] || colorMap.default;
}

// Normalize a vector
function normalize(vec) {
  const mag = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
  return mag === 0 ? { x: 0, y: 0 } : { x: vec.x / mag, y: vec.y / mag };
}

// Converts phi to 2D canvas x, y directions
function phiToDirection(phi) {
  return {
    x: Math.cos(phi),
    y: Math.sin(phi),
  };
}

// Clamp a value between min and max
function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}
