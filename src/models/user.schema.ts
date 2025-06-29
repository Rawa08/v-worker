import { z } from 'zod';

const createUserSchema = z.object({
    firebaseUid: z.string().min(1, "firebaseUid is required"),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email(),
    phone: z.string().optional(),
    country: z.string().optional(),
    isAdmin: z.boolean().default(false),
});

const updateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  country: z.string().optional(),
  isAdmin: z.boolean().optional(),
});

type UserSchema = typeof createUserSchema;
type CreateUserInput = z.infer<typeof createUserSchema>;
type UpdateUserInput = z.infer<typeof updateUserSchema>;

export type { UserSchema, CreateUserInput, UpdateUserInput };
export { createUserSchema, updateUserSchema };
