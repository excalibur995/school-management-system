export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface DailySettings {
  enabled: boolean;
  timeSlots: TimeSlot[];
}

export interface BookingData {
  duration: number;
  slotsPerTime: number;
  allowVideoTour: boolean;
  dailySettings: Record<string, DailySettings>;
}

export interface BookingCalendarProps {
  bookingData: BookingData;
}

export interface EventInput {
  title: string;
  start: Date;
  end: Date;
}
