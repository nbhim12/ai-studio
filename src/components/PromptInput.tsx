export default function PromptInput() {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="prompt" className="font-medium text-gray-700">
        Prompt
      </label>
      <input
        id="prompt"
        type="text"
        className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your prompt..."
      />
    </div>
  );
}