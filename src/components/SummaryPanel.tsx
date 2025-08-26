interface SummaryPanelProps {
  imageDataUrl: string | null;
  prompt: string;
  style: string;
}

export default function SummaryPanel({ imageDataUrl, prompt, style }: SummaryPanelProps) {
  return (
    <section
      aria-labelledby="summary-heading"
      className="border rounded-lg p-4 bg-gray-50 shadow-sm"
    >
      <h2 id="summary-heading" className="text-lg font-semibold mb-2">
        Summary
      </h2>

      <div className="space-y-3">
        {imageDataUrl ? (
          <img
            src={imageDataUrl}
            alt="Uploaded preview"
            className="w-48 h-auto rounded-md border"
          />
        ) : (
          <p className="text-sm text-gray-500">No image uploaded yet.</p>
        )}

        <div>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Prompt:</span>{" "}
            {prompt || <em className="text-gray-400">None</em>}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Style:</span>{" "}
            {style || <em className="text-gray-400">Not selected</em>}
          </p>
        </div>
      </div>
    </section>
  );
}