import { prisma } from '@/services/prismaService';
import type { CreateVenueInput, UpdateVenueInput } from '@/models/venue.schema';

const getAllVenues = () => prisma.venue.findMany();

const getVenueById = (id: string) => prisma.venue.findUnique({ where: { id } });

const createVenue = (data: CreateVenueInput) => prisma.venue.create({ data });

const updateVenue = (id: string, data: UpdateVenueInput) =>
  prisma.venue.update({ where: { id }, data });

const deleteVenue = (id: string) => prisma.venue.delete({ where: { id } });

const getAllVenuesByManagerUid = (managerUid: string) => (prisma.venue.findMany({
  where: {
    venuePlaylistManagers: {
      some: {
        user: {
          firebaseUid: managerUid 
        }
      }
    }
  },
  select: {
    id: true,
    name: true,
    city: true,
    postalAddress: true,
    phone: true,
    venuePlaylistManagers: {
      select: {
        user: {
          select: { email: true }
        }
      }
    },
    _count: {
      select: { devices: true }
    },
    playlists: {
      select: {
        category: true,
        playlistImages: {
          select: {
            image: {
              select: { url: true }
            }
          }
        }
      }
    }
  },
  orderBy: { name: 'asc' }
}));

export type VenueForManager = Awaited<ReturnType<typeof getAllVenuesByManagerUid>>;

export { getAllVenues, getVenueById, createVenue, updateVenue, deleteVenue, getAllVenuesByManagerUid };
