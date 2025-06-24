import { z } from "zod";
import { Category } from "@/generated/prisma";

const createPlaylistSchema = z.object({
  category: z.nativeEnum(Category).optional(),
  isAdminOnly: z.boolean().optional().default(false),
  createdByUserId: z.string().uuid(),
  venueId: z.string().uuid(),
});

const updatePlaylistSchema = z.object({
  category: z.nativeEnum(Category).optional(),
  isAdminOnly: z.boolean().optional(),
});

type PlaylistSchema = typeof createPlaylistSchema;
type CreatePlaylistInput = z.infer<typeof createPlaylistSchema>;
type UpdatePlaylistInput = z.infer<typeof updatePlaylistSchema>;

export type {PlaylistSchema, CreatePlaylistInput, UpdatePlaylistInput };
export { createPlaylistSchema, updatePlaylistSchema };
