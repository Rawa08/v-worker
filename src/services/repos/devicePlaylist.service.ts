import { prisma } from '@/services/prismaService';
import type { AssignDevicePlaylistInput } from '@/models/devicePlaylist.schema';

const assignPlaylistToDevice = (data: AssignDevicePlaylistInput) =>
  prisma.devicePlaylist.create({ data });
const removePlaylistFromDevice = (data: AssignDevicePlaylistInput) =>
  prisma.devicePlaylist.delete({ where: { deviceId_playlistId: data } });
const getPlaylistsByDevice = (deviceId: string) =>
  prisma.devicePlaylist.findMany({ where: { deviceId }, include: { playlist: true } });
const getDevicesByPlaylist = (playlistId: string) =>
  prisma.devicePlaylist.findMany({ where: { playlistId }, include: { device: true } });

export { assignPlaylistToDevice, removePlaylistFromDevice, getDevicesByPlaylist, getPlaylistsByDevice };
