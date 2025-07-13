import { Request, Response } from 'express';
import { getAllUsers, createUser } from "@/services/repos/user.service";
import { Prisma } from '@/generated/prisma';
import { createUserSchema } from '@/models/user.schema';

const getAllVenueUsers = async (_Req: Request, res: Response) => {

    try {
        const users = await getAllUsers({withAdmin: false});
        return res.status(200).json(users);
    } catch (err: unknown) {
        console.error('Error creating venue:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const registerUser = async (req: Request, res: Response) => {

  const result = createUserSchema.safeParse({ ...req.body, phone: req.body.phoneNumber });

  if (!result.success) {
    return res.status(400).json({
      error: 'Invalid request data',
      details: result.error.format(),
    });
  }

  const data = result.data;

  try {
    const user = await createUser(data);
    return res.status(201).json(user);
  } catch (err: unknown) {


    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2002' &&
      Array.isArray(err.meta?.target)
    ) {
      return res.status(409).json({
        error: `A record with the same ${err.meta.target.join(
          ', ',
        )} already exists.`,
      });
    }


    if (err instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({ error: err.message });
    }

    if (err instanceof Error) {
      // console.error('Error creating user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // console.error('Unknown error:', err);
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

export { getAllVenueUsers, registerUser };
