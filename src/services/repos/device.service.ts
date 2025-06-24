import { prisma } from "@/services/prismaService";
import type { CreateDeviceInput, UpdateDeviceInput } from '@/models/device.schema';

const getAllDevices = () => prisma.device.findMany();
const getDeviceById = (id: string) => prisma.device.findUnique({ where: { id } });
const createDevice = (data: CreateDeviceInput) => prisma.device.create({ data });
const updateDevice = (id: string, data: UpdateDeviceInput) =>
  prisma.device.update({ where: { id }, data });
const deleteDevice = (id: string) => prisma.device.delete({ where: { id } });

export { getAllDevices, getDeviceById, createDevice, updateDevice, deleteDevice };
