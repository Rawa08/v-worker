import { Router } from 'express';
import { registerDevice, getPlaylistsForDevice } from '@/controllers/androidDeviceControllers';

const androidRouter = Router();

androidRouter.post('/register-device', registerDevice);

androidRouter.get('/get-playlists/:deviceId', getPlaylistsForDevice);

export default androidRouter;
