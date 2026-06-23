import { describe, expect, it } from "vitest";

import {
  formatCoordinate,
  validateBitcoinAnswer,
  validateCssRule,
  validateSkyAnswer,
  validateTerminalCommand,
} from "@/src/utils/validators";

describe("validators", () => {
  it("validates the exact terminal command", () => {
    expect(validateTerminalCommand("npm run start --token=526")).toBe(true);
    expect(validateTerminalCommand("526")).toBe(false);
  });

  it("validates the full CSS rule only", () => {
    expect(validateCssRule(".paper { color: green; }")).toBe(true);
    expect(validateCssRule(".paper { color: #00ff00 }")).toBe(true);
    expect(validateCssRule("color: green")).toBe(false);
  });

  it("normalizes the sky answer and keeps the bitcoin answer strict", () => {
    expect(validateSkyAnswer(" sky ")).toBe(true);
    expect(validateSkyAnswer("moon")).toBe(false);
    expect(validateBitcoinAnswer("1.71")).toBe(true);
    expect(validateBitcoinAnswer("1.714")).toBe(false);
  });

  it("formats coordinates for the HUD", () => {
    expect(formatCoordinate({ lat: 33.545, lng: 36.315 })).toBe("33.5450, 36.3150");
    expect(formatCoordinate(null)).toBe("Unknown / encrypted");
  });
});
