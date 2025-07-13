import { Request, Response } from 'express';
import { createVenueSchema } from '@/models/venue.input.schema';
import { createVenue, getAllVenues, getAllVenuesByManagerUid } from '@/services/repos/venue.service';
import { getVenueById } from '@/services/repos/venue.service';
import { assignVenueManagerSchema } from '@/models/venuePlaylistManager.schema';
import { assignVenueManager } from '@/services/repos/venuePlaylistManager.service';
import { AuthenticatedRequest } from '@/middleware/authMiddleware';
import { parseVenuesData } from '@/utils/parsers/parseVenuesData';;

const getAllVenuesController = async (_Req: Request, res: Response) => {

    try {
        const venues = await getAllVenues();
        return res.status(201).json(venues);
    } catch (err: unknown) {
        console.error('Error creating venue:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const getVenueByIdController = async (req: Request, res: Response) => {
    const { venueId } = req.params;
    try {
        const venueData = await getVenueById(venueId);
        if (!venueData) {
            return res.status(404).json({ message: 'Venues not found', data: null });
        }

        return res.status(200).json({ data: venueData })
    } catch (err: unknown) {
        console.error('Error retriving venue data:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const addVenueManagerController = async (req: Request, res: Response) => {
    const result = assignVenueManagerSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            error: 'Invalid request data',
            details: result.error.format(),
        });
    }
    const { uid: firebaseUid } = (req as AuthenticatedRequest).user;

    if (!firebaseUid) {
        return res.status(404).json({ message: 'User not found' });
    }

    try {
        const managerData = await assignVenueManager(result.data);
        return res.status(201).json(managerData);
    } catch (err: unknown) {
        console.error('Error assigning manager to venue:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const addNewVenueController = async (req: Request, res: Response) => {
    const result = createVenueSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            error: 'Invalid request data',
            details: result.error.format(),
        });
    }
    const { uid: firebaseUid } = (req as AuthenticatedRequest).user;

    if (!firebaseUid) {
        return res.status(404).json({ message: 'User not found' });
    }

    try {
        const venue = await createVenue({ ...result.data, firebaseUid });
        return res.status(201).json(venue);
    } catch (err: unknown) {
        console.error('Error creating venue:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const getVenuesByManager = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { uid } = (req as AuthenticatedRequest).user;

    if (uid !== userId) {
        return res.status(403).json({ message: 'Access denied' });
    }

    const venuesData = await getAllVenuesByManagerUid(userId);
    if (venuesData.length === 0) {
        return res.status(404).json({ message: 'Venues not found', data: null });
    }

    const data = parseVenuesData(venuesData);

    return res.status(200).json({ data })
};
export { addNewVenueController, getAllVenuesController, getVenueByIdController, addVenueManagerController, getVenuesByManager };
