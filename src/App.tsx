import { useState } from "react";
import UploadArea from "./components/UploadArea";
import PreviewPanel from "./components/PreviewPanel";
import PromptInput from "./components/PromptInput";
import StyleDropdown, { type StyleOption } from "./components/StyleSelect";
import SummaryPanel from "./components/SummaryPanel";


function App() {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<StyleOption>("Editorial");

  return (
    <main id="main" className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto p-4 space-y-6 max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">AI Studio</h1>
        <UploadArea onImageChange={setImageDataUrl} />
        <PreviewPanel imageDataUrl={imageDataUrl} />
        <PromptInput value={prompt} onChange={setPrompt} />
        <StyleDropdown value={style} onChange={setStyle} />
        <SummaryPanel imageDataUrl={imageDataUrl} prompt={prompt} style={style} />
      </div>
    </main>
  );
}

export default App;