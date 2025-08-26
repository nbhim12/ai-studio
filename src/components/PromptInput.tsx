interface PromptInputProps {
  value: string;
  onChange: (val: string) => void;
}

export default function PromptInput({ value, onChange }: PromptInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="prompt" className="block font-medium">
        Prompt
      </label>
      <textarea
        id="prompt"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        placeholder="Enter a creative description..."
        className="w-full p-2 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p className="text-xs text-gray-500">
        Example: “A futuristic makeover in cyberpunk style.”
      </p>
    </div>
  );
}