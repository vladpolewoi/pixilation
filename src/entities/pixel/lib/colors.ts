export const catppuccinColorGrid = [
  // First row - Reds to Yellows
  ['none', 'bg-mocha-red', 'bg-mocha-maroon', 'bg-mocha-peach', 'bg-mocha-yellow', 'bg-mocha-rosewater', 'bg-mocha-flamingo', 'bg-mocha-pink'],
  // Second row - Blues to Purples
  ['bg-mocha-blue', 'bg-mocha-sapphire', 'bg-mocha-sky', 'bg-mocha-teal', 'bg-mocha-green', 'bg-mocha-lavender', 'bg-mocha-mauve'],
] as const;

export const catppuccinColors = catppuccinColorGrid.flat();

export function getRandomColor(excludeColor?: string | null): string {
  // Filter out 'none' and the excluded color
  const availableColors = catppuccinColors.filter(color => 
    color !== 'none' && color !== excludeColor
  );
  return availableColors[Math.floor(Math.random() * availableColors.length)];
} 