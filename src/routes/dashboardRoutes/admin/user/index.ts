import { Router } from 'express';
import { registerUser } from '@/controllers/userController';

const userAdminRouter = Router();

userAdminRouter.post('/register', registerUser);

export default userAdminRouter;
