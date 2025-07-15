import type { DeviceData, DeviceConfig, PlaylistItem, DevicePlaylistsResponse } from '@/types/device';

const parseDeviceData = (deviceData: DeviceData): DevicePlaylistsResponse => {
    const config: DeviceConfig = {
        imageDisplayDurationMs: deviceData.imageDisplayDurationMs ?? 15000,
        playlistDurationMs: deviceData.playlistDurationMs ?? 60000,
        syncIntervalMinutes: 1
    };

    const playlists: PlaylistItem[] = deviceData.devicePlaylists.map(({ playlist }) => ({
        id: playlist.id,
        images: playlist.playlistImages.map(({ image }) => ({
            id: image.id,
            url: image.url,
            isGif: image.isGif,
            order: image.order
        }))
    }));

    return { config, playlists };
}

export default parseDeviceData;
