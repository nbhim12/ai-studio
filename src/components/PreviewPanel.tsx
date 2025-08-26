interface PreviewPanelProps {
  imageDataUrl: string | null;
}

export default function PreviewPanel({ imageDataUrl }: PreviewPanelProps) {
  if (!imageDataUrl) {
    return <div className="text-sm text-gray-500">No image uploaded yet.</div>;
  }

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Image Preview</h2>
      <img
        src={imageDataUrl}
        alt="Uploaded preview"
        className="w-[200px] rounded shadow"
      />
    </div>
  );
}
