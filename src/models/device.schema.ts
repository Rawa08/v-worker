import { z } from "zod";
import { DeviceStatus } from "@/generated/prisma"

const createDeviceSchema = z.object({
  androidId: z.string(),
  osVersion: z.string().optional(),
  venueId: z.string().uuid(),
  imageDisplayDurationMs: z.number().int().optional(),
  playlistDurationMs: z.number().int().optional(),
  syncIntervalMinutes: z.number().int().optional(),
  status: z.nativeEnum(DeviceStatus).optional(),
});

const updateDeviceSchema = z.object({
  androidId: z.string().optional(),
  osVersion: z.string().optional(),
  imageDisplayDurationMs: z.number().int().optional(),
  playlistDurationMs: z.number().int().optional(),
  syncIntervalMinutes: z.number().int().optional(),
  activatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }).optional(),
  status: z.nativeEnum(DeviceStatus).optional(),
});

type DeviceSchema = typeof createDeviceSchema;
type CreateDeviceInput = z.infer<typeof createDeviceSchema>;
type UpdateDeviceInput = z.infer<typeof updateDeviceSchema>;

export type { DeviceSchema, CreateDeviceInput, UpdateDeviceInput };
export { createDeviceSchema, updateDeviceSchema}