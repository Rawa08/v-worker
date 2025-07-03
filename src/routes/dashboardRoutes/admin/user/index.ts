import { Router } from 'express';
import { registerUser } from '@/controllers/userRegistrationControlle'

const userAdminRouter = Router();

userAdminRouter.post('/register', registerUser);

export default userAdminRouter;