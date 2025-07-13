import { prisma } from '@/services/prismaService';
import type { User } from '@/generated/prisma'
import type { CreateUserInput, UpdateUserInput } from '@/models/user.schema';


type GetAllUsersOptions = { withAdmin?: boolean };

const getAllUsers = async (
  { withAdmin = false }: GetAllUsersOptions
): Promise<User[]> => {
  return prisma.user.findMany({
    where: withAdmin ? {} : { isAdmin: false },
  });
};

const getUserById = (id: string) => prisma.user.findUnique({ where: { id } });

const getUserByFuid = async (firebaseUid: string) => {
  const user = await prisma.user.findUnique({ where: { firebaseUid } });
  return user;
};

const createUser = (data: CreateUserInput) => prisma.user.create({ data });

const updateUser = (id: string, data: UpdateUserInput) =>
  prisma.user.update({ where: { id }, data });

const deleteUser = (id: string) => prisma.user.delete({ where: { id } });

export { getAllUsers, getUserById, getUserByFuid, createUser, updateUser, deleteUser };
