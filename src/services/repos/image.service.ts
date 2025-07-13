import { prisma } from '@/services/prismaService';
import type { CreateImageInput, UpdateImageInput } from '@/models/image.schema';

export interface CreateImageCustomInput {
  url: string;
  isGif: boolean;
  order: number;
  uploadedById: string;
  playlistId: string;
}

const getAllImages = () => prisma.image.findMany();
const getImageById = (id: string) => prisma.image.findUnique({ where: { id } });
const createImage = (data: CreateImageInput) => prisma.image.create({ data });

const createImages = async (items: CreateImageCustomInput[]) => {
  const created = await prisma.$transaction(
    items.map(item =>
      prisma.image.create({
        data: {
          url: item.url,
          isGif: item.isGif,
          order: item.order,
          uploadedById: item.uploadedById,
          playlistImages: {
            create: { playlistId: item.playlistId },
          },
        },
      })
    )
  );

  return created;
};

const updateImage = (id: string, data: UpdateImageInput) =>
  prisma.image.update({ where: { id }, data });
const deleteImage = (id: string) => prisma.image.delete({ where: { id } });

export { getAllImages, getImageById, createImage, updateImage, deleteImage, createImages };
