import type { Prisma } from '@/generated/prisma';

export type DeviceData = Prisma.DeviceGetPayload<{
  select: {
    imageDisplayDurationMs: true
    playlistDurationMs: true
    syncIntervalMinutes: true
    devicePlaylists: {
      select: {
        playlist: {
          select: {
            id: true
            playlistImages: {
              select: {
                image: {
                  select: {
                    id: true
                    url: true
                    isGif: true
                    order: true
                  }
                }
              }
              orderBy: { image: { order: 'asc' } }
            }
          }
        }
      }
    }
  }
}>


export interface DeviceConfig {
  imageDisplayDurationMs: number | null
  playlistDurationMs: number | null
  syncIntervalMinutes: number | null
}

export interface ImageItem {
  id: string
  url: string
  isGif: boolean
  order: number
}

export interface PlaylistItem {
  id: string
  images: ImageItem[]
}

export interface DevicePlaylistsResponse {
  config: DeviceConfig
  playlists: PlaylistItem[]
}
