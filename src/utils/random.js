// Generate the 50 colors once
const generatePalette = (amount) => {
  return Array.from({ length: amount }, (_, i) => {
    return `hsl(${i * (360 / amount)}, 70%, 60%)`;
  });
};

const fiftyColors = generatePalette(50);

//INFO Export a function to pick one
export const getRandomPaletteColor = () => {
  const randomIndex = Math.floor(Math.random() * fiftyColors.length);
  return fiftyColors[randomIndex];
};

export const getRandomPos = () => Math.floor(Math.random() * 90);
