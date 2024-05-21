import { Weeks } from "@/models/types";
import { DaySettings } from "./types";

export const DAYS_OF_WEEK: Weeks[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const DURATIONS = [15, 30, 45, 60, 90] as const;

export const DEFAULT_VALUES = {
  duration: 15,
  slotsPerTime: 1,
  allowVideoTour: false,
  dailySettings: DAYS_OF_WEEK.reduce((acc, day) => {
    acc[day] = { enabled: false, timeSlots: [] };
    return acc;
  }, {} as DaySettings),
};
