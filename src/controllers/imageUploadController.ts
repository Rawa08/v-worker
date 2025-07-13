import { Request, Response } from 'express';
import { z } from 'zod';
import { AuthenticatedRequest } from '@/middleware/authMiddleware';
import { createImages } from '@/services/repos/image.service';
import { getUserByFuid } from '@/services/repos/user.service';
import uploadImages from '@/services/cloudinaryImageUpload';

type MulterRequest = Request & { files: Express.Multer.File[] };

const uploadSchema = z.object({
    playlistId: z.string().uuid(),
});

const imageUploadController = async (req: Request, res: Response) => {
    console.log('Upload controller called')
    const body = uploadSchema.safeParse(req.body);
    if (!body.success) {
        return res.status(400).json({ error: 'Invalid payload', details: body.error.format() });
    }
    const { playlistId } = body.data;

    const { files } = (req as MulterRequest);
    if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
    }

    const { uid: firebaseUid } = (req as AuthenticatedRequest).user;
    const user = await getUserByFuid(firebaseUid);

    if (!firebaseUid || !user) {
        return res.status(404).json({ message: 'User not found' });
    }

    try {

        const uploads = await uploadImages({
            files,
            folder: `playlists/${playlistId}`
        });

        const createData = uploads.map((u, idx) => ({
            url: u.url,
            isGif: u.format === 'gif',
            order: idx,
            uploadedById: user.id,
            playlistId,
        }));

        const created = await createImages(createData);

        return res.status(201).json({
            success: true,
            uploadedCount: created.length,
        });
    } catch (err) {
        console.error('Error in imageUploadController:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export  { imageUploadController };
