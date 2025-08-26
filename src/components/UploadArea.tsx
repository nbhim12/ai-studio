import { useState } from "react";
interface UploadAreaProps {
  onImageChange: (imageDataUrl: string | null) => void;
}

export default function UploadArea({ onImageChange }: UploadAreaProps) {
  const [error, setError] = useState<string | null>(null);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only PNG and JPG images are allowed.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File must be ≤ 10MB.");
      return;
    }

    setError(null);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onImageChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor="file-upload"
        className="block text-sm font-medium text-gray-700"
      >
        Upload Image
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 
        file:rounded-full file:border-0 file:text-sm file:font-semibold 
        file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}