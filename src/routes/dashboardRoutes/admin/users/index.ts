import { Router } from 'express';
import { getAllVenueUsers } from '@/controllers/userController';

const usersAdminRouter = Router();

usersAdminRouter.get('/getAllusersusers', getAllVenueUsers);

export default usersAdminRouter;
