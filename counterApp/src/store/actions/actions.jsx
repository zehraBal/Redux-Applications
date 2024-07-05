export const arttir = "arttir";
export const azalt = "azalt";
export const reset = "reset";
export const customArttir = "customArttir";

export function counterArttir() {
  return { type: arttir };
}
export function counterAzalt() {
  return { type: azalt };
}
export function counterReset() {
  return { type: reset };
}
export function counterCustom(k) {
  return { type: customArttir, payload: k };
}
