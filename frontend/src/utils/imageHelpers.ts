/**
 * Helpers for handling images in base64 format
 */

/**
 * Converts a base64 string to a data URI if it's not already formatted
 * @param base64String - The base64 string from the database
 * @param mimeType - The MIME type of the image (default: image/jpeg)
 * @returns A properly formatted data URI or null if the string is invalid
 */
export const formatBase64Image = (
  base64String?: string,
  mimeType: string = "image/jpeg"
): string | null => {
  if (!base64String) {
    return null;
  }

  // If it's already a data URI, return as is
  if (base64String.startsWith("data:")) {
    return base64String;
  }

  // If it's a regular URL (http/https), return as is
  if (
    base64String.startsWith("http://") ||
    base64String.startsWith("https://")
  ) {
    return base64String;
  }

  // Otherwise, assume it's a raw base64 string and add the data URI prefix
  return `data:${mimeType};base64,${base64String}`;
};

/**
 * Validates if a string is a valid base64 string
 * @param str - The string to validate
 * @returns true if valid base64, false otherwise
 */
export const isValidBase64 = (str: string): boolean => {
  if (!str || str.length === 0) {
    return false;
  }

  // Remove data URI prefix if present
  const base64Data = str.replace(/^data:image\/\w+;base64,/, "");

  // Check if it's a valid base64 string
  const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;
  return base64Regex.test(base64Data);
};

/**
 * Gets the MIME type from a data URI
 * @param dataUri - The data URI string
 * @returns The MIME type or null if not found
 */
export const getMimeTypeFromDataUri = (dataUri: string): string | null => {
  const match = dataUri.match(/^data:([^;]+);base64,/);
  return match ? match[1] : null;
};

/**
 * Placeholder image URL for when no image is available
 */
export const PLACEHOLDER_IMAGE =
  "https://via.placeholder.com/400x300?text=No+Image";
export const PLACEHOLDER_IMAGE_LARGE =
  "https://via.placeholder.com/800x600?text=No+Image";
