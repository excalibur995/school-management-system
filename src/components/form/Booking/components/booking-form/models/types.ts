import { Weeks } from "@/models/types";

export type DaySettings = Record<Weeks, { enabled: boolean; timeSlots: { startTime: string; endTime: string }[] }>;
