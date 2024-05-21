import { z } from "zod";

const timeSlotSchema = z.object({
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
});

const daySettingsSchema = z.object({
  enabled: z.boolean(),
  timeSlots: z.array(timeSlotSchema),
});

const settingsSchema = z.object({
  duration: z.number().int().min(15).max(90),
  slotsPerTime: z.number().int().min(1),
  allowVideoTour: z.boolean(),
  dailySettings: z.record(daySettingsSchema),
});

export default settingsSchema;
