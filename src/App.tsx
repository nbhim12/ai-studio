import UploadArea from './components/UploadArea';
import PromptInput from './components/PromptInput';
import StyleDropdown from './components/StyleSelect';
import PreviewPanel from './components/PreviewPanel';


export default function App() {
return (
    <main className="min-h-screen bg-white text-gray-900 p-6">
      <div id="main" className="max-w-2xl mx-auto flex flex-col gap-6">
        <h1 className="text-2xl font-bold">AI Studio Sim</h1>
        <UploadArea />
        <PromptInput />
        <StyleDropdown />
        <PreviewPanel />
      </div>
    </main>
  );
}