import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: process.env.NODE_ENV === 'production'
    ? path.resolve(process.cwd(), '.env')
    : path.resolve(process.cwd(), '.env.local'),
});

export const config = {
  port: Number(process.env.PORT) || 3000,
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  },
  
  databaseUrl: process.env.DATABASE_URL!,

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    apiSecret: process.env.CLOUDINARY_API_SECRET!,
  },
};