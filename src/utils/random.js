// Generate the 50 colors once
const generatePalette = (amount) => {
  return Array.from({ length: amount }, () => {
    // Randomize hue (0-360)
    const hue = Math.floor(Math.random() * 360);
    // Keep Saturation high (80%) and Lightness visible (60%)
    return `hsl(${hue}, 80%, 60%)`;
  });
};

const colors = generatePalette(150);
//INFO Export a function to pick one
export const getRandomPaletteColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export const getRandomPos = () => Math.floor(Math.random() * 60) + 20;
