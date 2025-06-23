import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import { config } from '@/config';

if(!admin.apps.length){
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: config.firebase.projectId,
            clientEmail: config.firebase.clientEmail,
            privateKey: config.firebase.privateKey
        }),
    });
}

export interface AuthenticatedRequest extends Request {
  user: admin.auth.DecodedIdToken;
}

export const verifyFirebaseToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { authorization } = req.headers;
    if(!authorization || !authorization?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Invalid Authorization header' });
    }

    const idToken = authorization.split(' ')[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        (req as AuthenticatedRequest).user = decodedToken;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Unauthorized' })
    }
};
