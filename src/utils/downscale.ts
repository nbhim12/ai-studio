export async function downscale(
  imageDataUrl: string,
  maxSize = 1920
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const { width, height } = img;

      // already within bounds
      if (width <= maxSize && height <= maxSize) {
        resolve(imageDataUrl);
        return;
      }

      // proportional scale
      const scale = Math.min(maxSize / width, maxSize / height);
      const newW = Math.round(width * scale);
      const newH = Math.round(height * scale);

      const canvas = document.createElement("canvas");
      canvas.width = newW;
      canvas.height = newH;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas 2D context not available"));
        return;
      }
      ctx.drawImage(img, 0, 0, newW, newH);

      // preserve original mime if possible
      const mimeMatch = imageDataUrl.match(/^data:(image\/[a-zA-Z+.-]+);/);
      const mime = mimeMatch ? mimeMatch[1] : "image/png";

      resolve(canvas.toDataURL(mime));
    };
    img.onerror = () => reject(new Error("Failed to load image for downscaling"));
    img.src = imageDataUrl;
  });
}