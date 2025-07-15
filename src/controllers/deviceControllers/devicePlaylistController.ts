import { Request, Response } from "express";
import { getDevicePlayList } from '@/services/repos/device.service';
import parseDeviceData from '@/utils/parsers/parseDeviceData';
import type { DevicePlaylistsResponse } from '@/types/device'

const getPlaylistsForDevice = async (req: Request, res: Response<DevicePlaylistsResponse | { error: string }>) => {
    const { deviceId } = req.params;

    if (!deviceId) {
        return res.status(400).json({ error: 'device id not found' });
    }

    try {
        const deviceData = await getDevicePlayList(deviceId);

        if (!deviceData) {
            return res.status(404).json({ error: 'Device not found' });
        }

        const { config, playlists } = parseDeviceData(deviceData);

        return res.status(200).json({ config, playlists });
    } catch (error: unknown) {
        const message =
            error instanceof Error
                ? error.message
                : 'Unknown server error'
        return res.status(500).json({ error: message });
    }

}

export { getPlaylistsForDevice };
