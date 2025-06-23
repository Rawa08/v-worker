import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

export enum PlayListNameEnum {
    SPORTS = 'SPORTS',
    EVENTS = 'EVENTS',
    SPECIALS = 'SPECIALS',
    MENU = 'MENU',
}

const ImageSchema = z.object({
    id: z.string().uuid().default(() => uuidv4()),
    playListId: z.string().uuid(),
    url: z.string().url(),
    venueId: z.string().uuid(),
    createdAt: z.date().default(() => new Date()),
    createdByUserId: z.string().email(),
});

const PlayListSchema = z.object({
  category: z.nativeEnum(PlayListNameEnum),
  id: z.string().uuid().default(() => uuidv4()),
  images: z.array(ImageSchema).default([]),
  createdAt: z.date().default(() => new Date()),
  createdByUserId: z.string().email(),
});

const VenueSchema = z.object({
  id: z.string().uuid().default(() => uuidv4()),
  name: z.string().min(1),
  city: z.string().min(1),
  address: z.string().min(1),
  phone: z.string().min(1),
  devices: z.number().int().nonnegative(),
  managerEmail: z.array(z.string().email()),
  playLists: z.record(z.nativeEnum(PlayListNameEnum), PlayListSchema).default({}),
});


type PlayList = z.infer<typeof PlayListSchema>;
type Image = z.infer<typeof ImageSchema>;
type Venue = z.infer<typeof VenueSchema>;

export { ImageSchema, PlayListSchema, VenueSchema };
export type { Image, PlayList, Venue };;
