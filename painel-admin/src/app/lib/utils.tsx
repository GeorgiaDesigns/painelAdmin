export function getRandomRGBA() {
  const r = Math.floor(Math.random() * 256); // Random red: 0-255
  const g = Math.floor(Math.random() * 256); // Random green: 0-255
  const b = Math.floor(Math.random() * 256); // Random blue: 0-255
  const a = Math.random().toFixed(2); // Random alpha: 0.00-1.00

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
