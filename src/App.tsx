import { useCallback, useEffect, useState, Suspense, lazy } from "react";
import UploadArea from "./components/UploadArea";
import PromptInput from "./components/PromptInput";
import StyleDropdown from "./components/StyleSelect";
import GenerateButton from "./components/GenerateButton";
import type { GenerationResult, StyleOption } from "./types";

const PreviewPanel = lazy(() => import("./components/PreviewPanel"));
const SummaryPanel = lazy(() => import("./components/SummaryPanel"));
const HistoryPanel = lazy(() => import("./components/HistoryPanel"));


function App() {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<StyleOption>("Editorial");
  const [history, setHistory] = useState<GenerationResult[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("history");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const handleResult = useCallback((result: GenerationResult, addToHistory = true) => {
    if (addToHistory) {
      const newHistory = [result, ...history].slice(0, 5);
      setHistory(newHistory);
      localStorage.setItem("history", JSON.stringify(newHistory));
    }
    setImageDataUrl(result.imageUrl);
    setPrompt(result.prompt);
    setStyle(result.style);
  }, []);

  return (
    <main id="main" className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto p-4 space-y-6 max-w-3xl ">
        <h1 className="text-3xl font-bold mb-4">AI Studio</h1>
        <UploadArea onImageChange={setImageDataUrl} />
        <Suspense fallback={<div className="rounded-xl border p-4 text-sm">Loading preview…</div>}>
          <PreviewPanel imageDataUrl={imageDataUrl} />
        </Suspense>
        <PromptInput value={prompt} onChange={setPrompt} />
        <StyleDropdown value={style} onChange={setStyle} />
        <Suspense fallback={<div className="rounded-xl border p-4 text-sm">Loading summary…</div>}>
          <SummaryPanel imageDataUrl={imageDataUrl} prompt={prompt} style={style} />
        </Suspense>
        <GenerateButton
          imageDataUrl={imageDataUrl}
          prompt={prompt}
          style={style}
          onSuccess={handleResult}
        />
        <Suspense fallback={<div className="rounded-xl border p-4 text-sm">Loading history…</div>}>
          <HistoryPanel history={history} onSelect={(item) => handleResult(item, false)} />
        </Suspense>
      </div>
    </main>
  );
}

export default App;