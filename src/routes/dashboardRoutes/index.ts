import { Router } from 'express';
import venueRoutes from './venues';
import adminRoutes from './admin';

const dashboardRouter = Router();

dashboardRouter.use('/users', venueRoutes);
dashboardRouter.use('/admin', adminRoutes);

export default dashboardRouter;
