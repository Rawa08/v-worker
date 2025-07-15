import { Router } from 'express';
import { addNewVenueController, getAllVenuesController, addVenueManagerController } from '@/controllers/venueController';
import { getAllDevicesController } from '@/controllers/deviceController';

const venueAdminRouter = Router();

venueAdminRouter.get('/getAllVenues', getAllVenuesController);
venueAdminRouter.get('/getAllDevices', getAllDevicesController);
venueAdminRouter.post('/createVenue', addNewVenueController);
venueAdminRouter.post('/addManager', addVenueManagerController);

export default venueAdminRouter;
