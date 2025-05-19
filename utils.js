// utils.js — Shared utility functions for QuantumGAN
// These functions help with data handling, parsing, and math

/**
 * Read a JSON file from an input element and parse it.
 * @param {File} file - File object from input[type=file]
 * @returns {Promise<Object>} - Parsed JSON data
 */
function readJSONFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = event => {
      try {
        const json = JSON.parse(event.target.result);
        resolve(json);
      } catch (e) {
        reject('Invalid JSON file.');
      }
    };
    reader.onerror = () => reject('File reading failed.');
    reader.readAsText(file);
  });
}

/**
 * Generate a random float within a range
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Shuffle an array in-place using Fisher-Yates
 * @param {Array} array 
 * @returns {Array}
 */
function shuffleArray(array) {
  let currentIndex = array.length;
  let temp, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex--);
    temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

/**
 * Convert polar coordinates (pT, eta, phi) to 3D momentum components
 * Useful for physics checks and 3D modeling later
 */
function polarToCartesian(pT, eta, phi) {
  const px = pT * Math.cos(phi);
  const py = pT * Math.sin(phi);
  const pz = pT * Math.sinh(eta);
  return { px, py, pz };
}

/**
 * Clamp a number within a range
 */
function clamp(x, min, max) {
  return Math.max(min, Math.min(max, x));
}
