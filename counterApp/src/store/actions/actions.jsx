export const arttir = "arttir";
export const azalt = "azalt";
export const reset = "reset";

export function counterArttir() {
  return { type: arttir };
}
export function counterAzalt() {
  return { type: azalt };
}
export function counterReset() {
  return { type: reset };
}
