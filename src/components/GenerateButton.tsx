import { useCallback, useState } from "react";
import { mockGenerateAPI } from "../utils/api";
import type { GenerationResult, StyleOption } from "../types";


interface GenerateButtonProps {
  imageDataUrl: string | null;
  prompt: string;
  style: StyleOption;
  onSuccess: (result: GenerationResult) => void;
}

export default function GenerateButton({
  imageDataUrl,
  prompt,
  style,
  onSuccess,
}: GenerateButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [controller, setController] = useState<AbortController | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!imageDataUrl || !prompt || !style) return;
    setLoading(true);
    setError(null);

    const abortCtrl = new AbortController();
    setController(abortCtrl);

    let attempt = 0;
    let success = false;

    while (attempt < 3 && !success && !abortCtrl.signal.aborted) {
      try {
        const result = await mockGenerateAPI(
          { imageDataUrl, prompt, style },
          abortCtrl.signal
        );
        onSuccess(result);
        success = true;
      } catch (err: any) {
        if (abortCtrl.signal.aborted) {
          setError("Aborted");
          break;
        }
        attempt++;
        if (attempt < 3) {
          await new Promise((res) => setTimeout(res, 500 * 2 ** (attempt - 1)));
        } else {
          setError(err.message || "Failed to generate");
        }
      }
    }

    setLoading(false);
    setController(null);
  }, [imageDataUrl, prompt, style])

  function handleAbort() {
    controller?.abort();
  }

  return (
    <div className="mt-4 flex items-center gap-3">
      <button
        onClick={handleGenerate}
        disabled={loading || !imageDataUrl || !prompt || !style}
        className="px-4 py-2 rounded-xl font-medium bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center gap-2"
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-blue-200 border-t-transparent rounded-full animate-spin"></span>
        )}
        {loading ? "Generating..." : "Generate"}
      </button>

      {loading && (
        <button
          onClick={handleAbort}
          className="rounded-xl border border-red-500 bg-white px-4 py-2 text-red-600 shadow-sm hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          Abort
        </button>
      )}

      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
}