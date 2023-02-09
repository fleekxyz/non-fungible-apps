//TODO create env variable
const DEFAULT_MAX_FILE_SIZE = 10; // in KB

// The file size must be capped to a size that the contract can handle
export const validateFileSize = (
  file: File,
  maxSize = DEFAULT_MAX_FILE_SIZE
): boolean => {
  return file.size <= 1024 * maxSize;
};

/**
 * Converts the File from the input to a base64 string.
 */
export const fileToBase64 = (file: File): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || '');
    reader.onerror = reject;
  });

/**
 * Converts a hex color string to a number.
 */
export const parseColorToNumber = (color: string): number => {
  const hexColor = color.replace('#', '');
  return parseInt(hexColor, 16);
};
