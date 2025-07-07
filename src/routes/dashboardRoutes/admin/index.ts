import { Router } from 'express';
import userAdminRouter from './user';
import venueAdminRouter from './venues';
import { requireAdmin } from '@/middleware/authMiddleware';

const adminRouter = Router();

adminRouter.use('/user', userAdminRouter);
adminRouter.use('/venues', requireAdmin, venueAdminRouter);

export default adminRouter
