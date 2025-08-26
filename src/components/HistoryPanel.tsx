import type { GenerationResult } from "../types";

interface HistoryPanelProps {
  history: GenerationResult[];
  onSelect: (item: GenerationResult) => void;
}

export default function HistoryPanel({ history, onSelect }: HistoryPanelProps) {
  if (!history.length) {
    return (
      <div className="rounded-xl border p-4 text-sm text-gray-500">
          No history yet. Generate something to see it here.
      </div>
    );
  }
  return (
    <aside className="mt-4">
      <h2 className="text-lg font-semibold mb-2">History</h2>
      <ul className="space-y-2">
        {history.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-3 cursor-pointer p-2 border rounded hover:bg-gray-100"
            onClick={() => onSelect(item)}
          >
            <img
              src={item.imageUrl}
              alt="History preview"
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <p className="text-sm font-medium">{item.prompt}</p>
              <p className="text-xs text-gray-500">{item.style}</p>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}