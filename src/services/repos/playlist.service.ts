import { prisma } from '@/services/prismaService';
import type { CreatePlaylistInput, UpdatePlaylistInput } from '@/models/playlist.schema';

const getAllPlaylists = () => prisma.playlist.findMany();
const getPlaylistById = (id: string) => prisma.playlist.findUnique({ where: { id } });
const createPlaylist = (data: CreatePlaylistInput) => prisma.playlist.create({ data });
const updatePlaylist = (id: string, data: UpdatePlaylistInput) =>
  prisma.playlist.update({ where: { id }, data });
const deletePlaylist = (id: string) => prisma.playlist.delete({ where: { id } });

export { getAllPlaylists, getPlaylistById, createPlaylist, updatePlaylist, deletePlaylist };
