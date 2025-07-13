import { Router } from 'express';
import venueRoutes from './venues';
import adminRoutes from './admin';
import imageRoutes from './images';

const dashboardRouter = Router();

dashboardRouter.use('/users', venueRoutes);
dashboardRouter.use('/admin', adminRoutes);
dashboardRouter.use('/images', imageRoutes);

export default dashboardRouter;
