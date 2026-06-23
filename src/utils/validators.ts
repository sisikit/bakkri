const cssValidationRegex =
  /^(\s*\.paper\s*\{\s*color\s*:\s*(green|#00ff00)\s*;?\s*\}\s*)$/i;

export function validateTerminalCommand(input: string) {
  return input === "npm run start --token=526";
}

export function validateCssRule(input: string) {
  return cssValidationRegex.test(input.trim());
}

export function validateSkyAnswer(input: string) {
  return input.trim().toLowerCase() === "sky";
}

export function validateBitcoinAnswer(input: string) {
  return input.trim() === "1.71";
}

export function formatCoordinate(
  coords: { lat: number; lng: number } | null,
): string {
  if (!coords) {
    return "Unknown / encrypted";
  }

  return `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`;
}
