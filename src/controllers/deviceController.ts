import { Request, Response } from "express";
import { getAllDevices } from '@/services/repos/device.service';

const getAllDevicesController = async (_req: Request, res: Response) => {
    try {
        const allDevices = await getAllDevices();

        return res.status(200).json(allDevices);
    } catch (error: unknown) {
        if (error instanceof Error) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Unknown server error'
            return res.status(500).json({ error: message });
        }
    }

}

export { getAllDevicesController };
