import { Request, Response } from 'express';
import { AuthenticatedRequest } from '@/middleware/authMiddleware';
import { getAllVenuesByManagerUid } from '@/services/repos/venue.service';
import { parseVenuesData } from '@/utils/parsers/parseVenuesData';;

export const getVenuesByManager = async (req: Request, res: Response) => {
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
