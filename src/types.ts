export type StyleOption = "Editorial" | "Streetwear" | "Vintage";

export interface GenerationResult {
  id: string;
  imageUrl: string;
  prompt: string;
  style: StyleOption;
  createdAt: number;
}