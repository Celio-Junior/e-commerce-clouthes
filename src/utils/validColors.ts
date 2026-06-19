export function isValidColor(color: string): boolean {
  if (typeof window === 'undefined') return false; // Evita erro no lado do servidor (SSR)
  return CSS.supports('color', color) && /^#[0-9A-F]{6}$/i.test(color);
}
