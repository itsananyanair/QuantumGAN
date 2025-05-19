// utils.js

// Generate a random float between min and max
function randomFloat(min, max) {
  return min + Math.random() * (max - min);
}

// Generate a random 3D vector with given spread
function randomMomentum(spread) {
  return {
    px: randomFloat(-spread, spread),
    py: randomFloat(-spread, spread),
    pz: randomFloat(-spread, spread)
  };
}

// Clamp a value between min and max
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// Generate a UUID (if needed for IDs or tagging)
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

