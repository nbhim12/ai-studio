export function tinyPngBuffer() {
  return Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAuMB9o6h4c0AAAAASUVORK5CYII=",
    "base64"
  );
}

// Ensure the 20% failure never triggers during E2E
export async function forceSuccess(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    (Math.random as unknown) = () => 0.9; // >= 0.2 ⇒ success path
  });
}