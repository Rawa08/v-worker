import { z } from 'zod';

const createVenueSchema = z.object({
  name: z.string(),
  phone: z.string().optional(),
  postalAddress: z.string().optional(),
  postalCode: z.number().int().optional(),
  city: z.string(),
  country: z.string(),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }).optional().nullable(),
  contactPersonId: z.string().uuid().optional().nullable(),
});

const updateVenueSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  postalAddress: z.string().optional(),
  postalCode: z.number().int().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }).optional(),
  contactPersonId: z.string().uuid().optional(),
});

type VenueSchema = typeof createVenueSchema;
type CreateVenueInput = z.infer<typeof createVenueSchema>;
type UpdateVenueInput = z.infer<typeof updateVenueSchema>;

export type { VenueSchema, CreateVenueInput, UpdateVenueInput };
export { createVenueSchema, updateVenueSchema };
