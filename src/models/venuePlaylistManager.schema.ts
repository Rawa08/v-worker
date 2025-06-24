import { z } from "zod";

export const assignVenueManagerSchema = z.object({
  userId: z.string().uuid(),
  venueId: z.string().uuid(),
});

type VPMSchema = typeof assignVenueManagerSchema;
type AssignVenueManagerInput = z.infer<typeof assignVenueManagerSchema>;

export type { VPMSchema, AssignVenueManagerInput };
