export function formatPrice(price: number): string {
  return Math.round(price).toLocaleString("hu-HU");
}
