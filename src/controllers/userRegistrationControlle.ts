import { Prisma } from '@/generated/prisma';
import { Request, Response } from 'express';
import { createUserSchema } from '@/models/user.schema';
import { createUser } from '@/services/repos/user.service';

export const registerUser = async (req: Request, res: Response) => {

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
