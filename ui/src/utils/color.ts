/**
 * Converts a hex color string to a number.
 */
export const parseColorToNumber = (color: string): number => {
  const hexColor = color.replace('#', '');
  return parseInt(hexColor, 16);
};

/**
 * Converts string number to hex color string.
 */
export const parseNumberToHexColor = (color: number): string => {
  return `${`000000${color.toString(16)}`.slice(-6)}`;
};
