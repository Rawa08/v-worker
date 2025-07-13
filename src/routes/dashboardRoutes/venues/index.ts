import { Router } from 'express';
import { getVenueByIdController, getVenuesByManager } from '@/controllers/venueController';

const venueRoutes = Router();

venueRoutes.get(
  '/:userId/venues', getVenuesByManager
);

venueRoutes.get(
  '/venue/:venueId', getVenueByIdController
);

export default venueRoutes;
