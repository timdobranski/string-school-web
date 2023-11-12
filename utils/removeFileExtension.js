export default function removeFileExtension(filename) {
  // Find the last dot in the filename
  const lastDotIndex = filename.lastIndexOf('.');

  // If there's no dot, or it's the first character, return the filename as is
  if (lastDotIndex <= 0) return filename;

  // Return the substring before the last dot
  return filename.substring(0, lastDotIndex);
}