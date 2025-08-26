import { test, expect } from "@playwright/test";
import { tinyPngBuffer, forceSuccess } from "./utils";

test.describe("AI Studio — essential flow", () => {
  test.beforeEach(async ({ page }) => {
    await forceSuccess(page);           // avoid random failures
    await page.goto("/");               // Vite dev server at 5173 by default
  });

  test("happy path: upload → prompt/style → generate → history entry", async ({ page }) => {
    // 1) Upload image
    await page.getByLabel(/upload image/i).setInputFiles({
      name: "tiny.png",
      mimeType: "image/png",
      buffer: tinyPngBuffer(),
    });

    // 2) Preview image visible
    await expect(page.getByRole("img", { name: /uploaded preview/i })).toBeVisible();

    // 3) Fill prompt
    await page.getByRole("textbox", { name: /prompt/i }).fill("hello world e2e");

    // 4) Choose style
    await page.getByRole("combobox", { name: /style/i }).selectOption("Editorial");

    // 5) Generate
    const generateBtn = page.getByRole("button", { name: /^generate$/i });
    await expect(generateBtn).toBeEnabled();
    await generateBtn.click();

    // Loading state
    await expect(page.getByRole("button", { name: /generating/i })).toBeVisible();

    // 6) History entry appears
    const historySection = page.getByRole("heading", { name: /history/i }).locator("..");
    await expect(
      historySection.locator("li", { hasText: /hello world e2e/i })
    ).toBeVisible({ timeout: 10_000 });

    // Back to idle
    await expect(page.getByRole("button", { name: /^generate$/i })).toBeVisible();

    // Summary image visible
    await expect(page.getByRole("img", { name: /summary preview/i })).toBeVisible();
  });

  test("abort: start generating then abort, no history entry created", async ({ page }) => {
    // Upload
    await page.getByLabel(/upload image/i).setInputFiles({
      name: "tiny.png",
      mimeType: "image/png",
      buffer: tinyPngBuffer(),
    });

    // Prompt + style
    await page.getByRole("textbox", { name: /prompt/i }).fill("should not complete");
    await page.getByRole("combobox", { name: /style/i }).selectOption("Editorial");

    // Start generating
    await page.getByRole("button", { name: /^generate$/i }).click();

    // Abort while loading
    await page.getByRole("button", { name: /abort/i }).click();

    // Back to idle
    await expect(page.getByRole("button", { name: /^generate$/i })).toBeVisible();

    const historySection = page.getByRole("heading", { name: /history/i }).locator("..");
    await expect(
      historySection.locator("li", { hasText: /should not complete/i })
    ).toHaveCount(0);
  });
});