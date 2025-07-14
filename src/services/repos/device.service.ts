import { prisma } from "@/services/prismaService";
import type { Device } from '@/generated/prisma'
import type { UpdateDeviceInput } from '@/models/device.schema';

const getDeviceByAndroidId = async (androidId: string): Promise<Device | null> => {
  const device = await prisma.device.findUnique({ where: { androidId } });
  return device;
};

const createNewDevice = async (androidId: string | undefined): Promise<Device> => {
  const device = await prisma.device.create({ data: androidId ? { androidId } : {} });
  return device;
};

const getAllDevices = () => prisma.device.findMany();
const getDeviceById = (id: string) => prisma.device.findUnique({ where: { id } });
const updateDevice = (id: string, data: UpdateDeviceInput) =>
  prisma.device.update({ where: { id }, data });
const deleteDevice = (id: string) => prisma.device.delete({ where: { id } });

export { getAllDevices, getDeviceById, createNewDevice, updateDevice, deleteDevice, getDeviceByAndroidId };
