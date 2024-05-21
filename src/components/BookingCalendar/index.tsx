"use client";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import React from "react";
import { BookingCalendarProps, BookingData, EventInput } from "./models/types";

const BookingCalendar: React.FC<BookingCalendarProps> = ({ bookingData }) => {
  const generateEvents = (data: BookingData) => {
    const events: EventInput[] = [];
    for (const [day, settings] of Object.entries(data.dailySettings)) {
      if (settings.enabled) {
        settings.timeSlots.forEach((slot, index) => {
          const start = new Date(`2024-05-20T${slot.startTime}:00`); // Adjust date accordingly
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

  const events = generateEvents(bookingData);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView="timeGridWeek"
      events={events}
      slotDuration="00:15:00"
      allDaySlot={false}
      nowIndicator={true}
      height="auto"
    />
  );
};

export default BookingCalendar;
