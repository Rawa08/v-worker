import { prisma } from '@/services/prismaService';
import type { AssignVenueManagerInput } from '@/models/venuePlaylistManager.schema';

const assignVenueManager = async (data: AssignVenueManagerInput) => {
  const managerData = await prisma.venuePlaylistManager.create({ data });
  return managerData;
}

const removeVenueManager = (data: AssignVenueManagerInput) =>
  prisma.venuePlaylistManager.delete({ where: { userId_venueId: data } });

const getManagersByVenue = (venueId: string) =>
  prisma.venuePlaylistManager.findMany({ where: { venueId }, include: { user: true } });

const getVenuesByManager = (userId: string) =>
  prisma.venuePlaylistManager.findMany({ where: { userId }, include: { venue: true } });

export { assignVenueManager, removeVenueManager, getManagersByVenue, getVenuesByManager };
