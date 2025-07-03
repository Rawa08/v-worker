import { Router } from 'express';
import { getVenuesByManager } from '@/controllers/userVenueController';

const venueRoutes = Router();

venueRoutes.get(
  '/:userId/venues', getVenuesByManager
);

export default venueRoutes;
