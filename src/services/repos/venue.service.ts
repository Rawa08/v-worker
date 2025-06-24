import { prisma } from '@/services/prismaService';
import type { CreateVenueInput, UpdateVenueInput } from '@/models/venue.schema';

const getAllVenues = () => prisma.venue.findMany();

const getVenueById = (id: string) => prisma.venue.findUnique({ where: { id } });

const createVenue = (data: CreateVenueInput) => prisma.venue.create({ data });

const updateVenue = (id: string, data: UpdateVenueInput) =>
  prisma.venue.update({ where: { id }, data });

const deleteVenue = (id: string) => prisma.venue.delete({ where: { id } });

export { getAllVenues, getVenueById, createVenue, updateVenue, deleteVenue };
