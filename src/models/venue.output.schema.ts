import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

export enum PlayListNameEnum {
  SPORTS = 'SPORTS',
  EVENTS = 'EVENTS',
  SPECIALS = 'SPECIALS',
  MENU = 'MENU',
  ADMIN_ONLY = 'ADMIN_ONLY',
}

const ImageSchema = z.object({
  id: z.string().uuid().default(() => uuidv4()),
  url: z.string().url(),
  isGif: z.boolean().default(false),
  order: z.number().int().default(0),
  uploadedById: z.string().uuid(),
});

const PlayListSchema = z.object({
  category: z.nativeEnum(PlayListNameEnum),
  id: z.string().uuid().default(() => uuidv4()),
  isAdminOnly: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
  createdByUserId: z.string().uuid(),
  images: z.array(ImageSchema).default([]),
});

const VenueSchema = z.object({
  id: z.string().uuid().default(() => uuidv4()),
  name: z.string().min(1),
  phone: z.string().optional(),
  postalAddress: z.string().optional(),
  postalCode: z.number().int().optional(),
  city: z.string().min(1),
  country: z.string().min(1),
  startDate: z.date(),
  contactPersonId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  devices: z.number().int().nonnegative(),
  managerEmail: z.array(z.string().email()).default([]),
  playLists: z.record(
    z.nativeEnum(PlayListNameEnum),
    z.array(z.string().url())
  ).default({})
});

export type Image = z.infer<typeof ImageSchema>;
export type PlayList = z.infer<typeof PlayListSchema>;
export type Venue = z.infer<typeof VenueSchema>;

export { ImageSchema, PlayListSchema, VenueSchema };
