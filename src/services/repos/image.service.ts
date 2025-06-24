import { prisma } from '@/services/prismaService';
import type { CreateImageInput, UpdateImageInput } from '@/models/image.schema';

const getAllImages = () => prisma.image.findMany();
const getImageById = (id: string) => prisma.image.findUnique({ where: { id } });
const createImage = (data: CreateImageInput) => prisma.image.create({ data });
const updateImage = (id: string, data: UpdateImageInput) =>
  prisma.image.update({ where: { id }, data });
const deleteImage = (id: string) => prisma.image.delete({ where: { id } });

export { getAllImages, getImageById, createImage, updateImage, deleteImage };
