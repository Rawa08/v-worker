import { Router } from 'express';
import { registerDevice } from '@/controllers/deviceControllers/deviceRegisterController';

const androidRouter = Router();

androidRouter.post('/register-device', registerDevice);

export default androidRouter;
