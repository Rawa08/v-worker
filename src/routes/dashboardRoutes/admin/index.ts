import { Router } from 'express';
import userAdminRouter from './user';

const adminRouter = Router();

adminRouter.use('/user', userAdminRouter);

export default adminRouter
