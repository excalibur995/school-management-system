"use client";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import useBookingCalendar from "./usecases/useBookingCalendar";

const BookingCalendar = () => {
  const { events } = useBookingCalendar();

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
