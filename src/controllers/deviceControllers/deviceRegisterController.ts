import { Request, Response } from "express";
import { getDeviceByAndroidId, createNewDevice } from '@/services/repos/device.service';
import { logger } from "@/utils/logger";

const registerDevice = async (req: Request, res: Response) => {
    const { androidId } = req.body;

    if (!androidId) {
        // Alert admin on this
        return res.status(400).json({ message: 'android id not provided' });
    }

    try {
        let device = await getDeviceByAndroidId(androidId);

        if (!device) {
            device = await createNewDevice(androidId);
        }

        return res.status(200).json({ deviceId: device.id });
    }
    catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        logger.error({ err }, `Failed to register device: ${msg}`);
        return res.status(500).json({ deviceId: null });
    }

}

export { registerDevice };
