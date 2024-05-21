"use state";
import { useBookingFormStore } from "@/lib/store/useBookingStore";
import { useEffect, useState } from "react";
import { BookingData, EventInput } from "../models/types";

export default function useBookingCalendar() {
  const { data: bookingData } = useBookingFormStore();
  const [events, setEvents] = useState<BookingData>({
    allowVideoTour: false,
    dailySettings: {},
    duration: 0,
    slotsPerTime: 0,
  });

  useEffect(() => {
    setEvents(bookingData);

    const unsubscribe = useBookingFormStore.subscribe((state) => {
      setEvents(state.data);
    });

    return () => unsubscribe();
  }, [bookingData]);

  const generateEvents = (data: BookingData) => {
    const events: EventInput[] = [];
    for (const [day, settings] of Object.entries(data.dailySettings)) {
      if (settings.enabled) {
        settings.timeSlots.forEach((slot, index) => {
          const start = new Date(`2024-05-20T${slot.startTime}:00`);
          const end = new Date(`2024-05-20T${slot.endTime}:00`);
          start.setDate(start.getDate() + getDayIndex(day));
          end.setDate(end.getDate() + getDayIndex(day));
          events.push({
            title: `Slot ${index + 1}`,
            start,
            end,
          });
        });
      }
    }
    return events;
  };

  const getDayIndex = (day: string): number => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days.indexOf(day);
  };

  return {
    events: generateEvents(events),
  };
}
