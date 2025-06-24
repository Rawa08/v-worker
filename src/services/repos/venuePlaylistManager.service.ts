import { prisma } from '@/services/prismaService';
import type { AssignVenueManagerInput } from '@/models/venuePlaylistManager.schema';

const assignVenueManager = (data: AssignVenueManagerInput) =>
  prisma.venuePlaylistManager.create({ data });

const removeVenueManager = (data: AssignVenueManagerInput) =>
  prisma.venuePlaylistManager.delete({ where: { userId_venueId: data } });

const getManagersByVenue = (venueId: string) =>
  prisma.venuePlaylistManager.findMany({ where: { venueId }, include: { user: true } });

const getVenuesByManager = (userId: string) =>
  prisma.venuePlaylistManager.findMany({ where: { userId }, include: { venue: true } });

export { assignVenueManager, removeVenueManager, getManagersByVenue, getVenuesByManager };
