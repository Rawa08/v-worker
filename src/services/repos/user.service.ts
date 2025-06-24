import { prisma } from '@/services/prismaService';
import type { CreateUserInput, UpdateUserInput } from '@/models/user.schema';

const getAllUsers = () => prisma.user.findMany();

const getUserById = (id: string) => prisma.user.findUnique({ where: { id } });

const getUserByFuid = (firebaseUid: string) => prisma.user.findUnique({ where: { firebaseUid } });

const createUser = (data: CreateUserInput) => prisma.user.create({ data });

const updateUser = (id: string, data: UpdateUserInput) =>
  prisma.user.update({ where: { id }, data });

const deleteUser = (id: string) => prisma.user.delete({ where: { id } });

export { getAllUsers, getUserById, getUserByFuid, createUser, updateUser, deleteUser };
