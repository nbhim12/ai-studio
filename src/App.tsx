import { useEffect, useState } from "react";
import UploadArea from "./components/UploadArea";
import PreviewPanel from "./components/PreviewPanel";
import PromptInput from "./components/PromptInput";
import StyleDropdown from "./components/StyleSelect";
import SummaryPanel from "./components/SummaryPanel";
import GenerateButton from "./components/GenerateButton";
import HistoryPanel from "./components/HistoryPanel";
import type { GenerationResult, StyleOption } from "./types";


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

  const handleResult = (result: GenerationResult, addToHistory = true) => {
    if (addToHistory) {
      const newHistory = [result, ...history].slice(0, 5);
      setHistory(newHistory);
      localStorage.setItem("history", JSON.stringify(newHistory));
    }
    setImageDataUrl(result.imageUrl);
    setPrompt(result.prompt);
    setStyle(result.style);
  };

  return (
    <main id="main" className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto p-4 space-y-6 max-w-3xl ">
        <h1 className="text-3xl font-bold mb-4">AI Studio</h1>
        <UploadArea onImageChange={setImageDataUrl} />
        <PreviewPanel imageDataUrl={imageDataUrl} />
        <PromptInput value={prompt} onChange={setPrompt} />
        <StyleDropdown value={style} onChange={setStyle} />
        <SummaryPanel imageDataUrl={imageDataUrl} prompt={prompt} style={style} />
        <GenerateButton
          imageDataUrl={imageDataUrl}
          prompt={prompt}
          style={style}
          onSuccess={handleResult}
        />
        <HistoryPanel history={history} onSelect={(item) => handleResult(item, false)} />
      </div>
    </main>
  );
}

export default App;