import { z } from "zod";

export const assignDevicePlaylistSchema = z.object({
  deviceId: z.string().uuid(),
  playlistId: z.string().uuid(),
});

type DPPSchema = typeof assignDevicePlaylistSchema;
type AssignDevicePlaylistInput = z.infer<typeof assignDevicePlaylistSchema>;

export type { DPPSchema, AssignDevicePlaylistInput };
