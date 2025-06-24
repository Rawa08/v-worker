import { prisma } from '@/services/prismaService';
import type { AssignPlaylistImageInput } from '@/models/playlistImage.schema';

const assignImageToPlaylist = (data: AssignPlaylistImageInput) =>
  prisma.playlistImage.create({ data });
const removeImageFromPlaylist = (data: AssignPlaylistImageInput) =>
  prisma.playlistImage.delete({ where: { playlistId_imageId: data } });
const getImagesByPlaylist = (playlistId: string) =>
  prisma.playlistImage.findMany({ where: { playlistId }, include: { image: true } });
const getPlaylistsByImage = (imageId: string) =>
  prisma.playlistImage.findMany({ where: { imageId }, include: { playlist: true } });

export { assignImageToPlaylist, removeImageFromPlaylist, getImagesByPlaylist, getPlaylistsByImage };
