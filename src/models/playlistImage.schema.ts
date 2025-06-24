import { z } from "zod";

export const assignPlaylistImageSchema = z.object({
  playlistId: z.string().uuid(),
  imageId: z.string().uuid(),
});

type PISchema = typeof assignPlaylistImageSchema;
type AssignPlaylistImageInput = z.infer<typeof assignPlaylistImageSchema>;

export type { PISchema, AssignPlaylistImageInput };
