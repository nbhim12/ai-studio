import type { GenerationResult, StyleOption } from "../types";

interface GenerateRequest {
  imageDataUrl: string;
  prompt: string;
  style: StyleOption;
}

export async function mockGenerateAPI(
  { imageDataUrl, prompt, style }: GenerateRequest,
  signal: AbortSignal
): Promise<GenerationResult> {
  return new Promise<GenerationResult>((resolve, reject) => {
    // abort immediately
    if (signal.aborted) {
      return reject(new DOMException("Aborted", "AbortError"));
    }

    const timeout = setTimeout(() => {
      // 20% chance to fail randomly
      if (Math.random() < 0.2) {
        reject(new Error("Model overloaded, please try again shortly."));
        return;
      }

      resolve({
        id: crypto.randomUUID(),
        imageUrl: imageDataUrl,
        prompt,
        style,
        createdAt: Date.now(),
      });
    }, 1500 + Math.random() * 1000); // 1.5–2.5s latency

    // Handle abort
    signal.addEventListener("abort", () => {
      clearTimeout(timeout);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}