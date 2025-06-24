import { z } from "zod";

const createImageSchema = z.object({
  url: z.string().url(),
  isGif: z.boolean().optional().default(false),
  order: z.number().int().optional().default(0),
  uploadedById: z.string().uuid(),
});

const updateImageSchema = z.object({
  url: z.string().url().optional(),
  isGif: z.boolean().optional(),
  order: z.number().int().optional(),
});

type ImageSchema = typeof createImageSchema;
type CreateImageInput = z.infer<typeof createImageSchema>;
type UpdateImageInput = z.infer<typeof updateImageSchema>;

export type { ImageSchema, CreateImageInput, UpdateImageInput };
export { createImageSchema, updateImageSchema };
