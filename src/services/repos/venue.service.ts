import { prisma } from '@/services/prismaService';
import { Category } from '@/generated/prisma';
import type { CreateVenueInput, UpdateVenueInput } from '@/models/venue.input.schema';

const getAllVenues = () => (prisma.venue.findMany({
  select: {
    id: true,
    name: true,
    city: true,
    postalAddress: true,
    postalCode: true,
    phone: true,
    startDate: true,
    contactPersonId: true,
    createdAt: true,
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
  orderBy: { createdAt: 'desc' }
}));

const getVenueById = async (id: string) => (await prisma.venue.findUnique(
  { 
    where: { id },
    include: {
    venuePlaylistManagers: {
      select: {
        user: {
          select: { email: true, id: true, firstName: true, lastName: true, phone: true }
        }
      }
    },
    _count: {
      select: { devices: true }
    },
    devices: true,
    playlists: {
      select: {
        id: true,
        category: true,
        playlistImages: {
          select: {
            image: {
              select: { url: true, id: true }
            }
          }
        }
      }
    }
  },
},
));

const createVenue = async (data: CreateVenueInput & { firebaseUid: string }) => {
  const {
    name,
    phone,
    postalAddress,
    postalCode,
    city,
    country,
    startDate,
    contactPersonId,
    firebaseUid,
  } = data;


  const user = await prisma.user.findFirst({
    where: { firebaseUid, isAdmin: true }
  });
  
  if (!user) {
    throw new Error('User not found or not admin');
  }

  const venueData = {
    name,
    phone,
    postalAddress,
    postalCode,
    city,
    country,
    ...(startDate != null && { startDate: new Date(startDate) }),
    ...(contactPersonId && { contactPerson: { connect: { id: contactPersonId } } }),
    playlists: {
      create: [
        { category: Category.SPORTS, isAdminOnly: false, createdByUserId: user.id },
        { category: Category.EVENTS, isAdminOnly: false, createdByUserId: user.id },
        { category: Category.SPECIALS, isAdminOnly: false, createdByUserId: user.id },
        { category: Category.MENU, isAdminOnly: false, createdByUserId: user.id },
        { category: Category.ADMIN_ONLY, isAdminOnly: true, createdByUserId: user.id },
      ],
    },
  };


  const venue = await prisma.venue.create({
    data: venueData
  });

  return venue;
};

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
          select: { email: true, id: true }
        }
      }
    },
    _count: {
      select: { devices: true }
    },
    playlists: {
      select: {
        id: true,
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
