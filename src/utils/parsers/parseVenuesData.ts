import type { Category } from '@/generated/prisma';
import type { VenueForManager } from '@/services/repos/venue.service'

export interface ParsedPlaylist {
  category: Category;
  images: string[];
}

export type SimpleUser = {
  user: {
    email: string;
    id: string;
  }

}

export interface ParsedVenue {
  id: string;
  name: string;
  city: string;
  postalAddress: string | null;
  phone: string | null;
  venuePlaylistManagers: SimpleUser[];
  deviceCount: number;
  playlists: ParsedPlaylist[];
}


export const parseVenuesData = (
  venuesData: VenueForManager
): ParsedVenue[] => {
  return venuesData.map((venue) => ({
    id: venue.id,
    name: venue.name,
    city: venue.city,
    postalAddress: venue.postalAddress ?? null,
    phone: venue.phone ?? null,
    venuePlaylistManagers: venue.venuePlaylistManagers,
    deviceCount: venue._count.devices,
    playlists: venue.playlists.map((pl) => ({
      category: pl.category,
      images: pl.playlistImages.map((pi) => pi.image.url),
    })),
  }));
};
