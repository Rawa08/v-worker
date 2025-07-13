import { Router } from 'express';
import multer from 'multer';
import { imageUploadController } from '@/controllers/imageUploadController';

const upload = multer({ storage: multer.memoryStorage() }); 

const imageRoutes = Router();

imageRoutes.post(
  '/imageUploads',
  upload.array('files'),
  imageUploadController
);

export default imageRoutes;
