import { Router } from 'express';
import { addNewVenueController, getAllVenuesController, addVenueManagerController } from '@/controllers/venueController';

const venueAdminRouter = Router();

venueAdminRouter.get('/getAllVenues', getAllVenuesController);
venueAdminRouter.post('/createVenue', addNewVenueController);
venueAdminRouter.post('/addManager', addVenueManagerController);

export default venueAdminRouter;
