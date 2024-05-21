"use client";

import BookingCalendar from "@/components/BookingCalendar";
import { BookingData } from "@/components/BookingCalendar/models/types";
import { useBookingFormStore } from "@/lib/store/useBookingStore";

import { useEffect, useState } from "react";

export default function Home() {
  const { data: bookingData } = useBookingFormStore();
  const [events, setEvents] = useState<BookingData>({
    allowVideoTour: false,
    dailySettings: {},
    duration: 0,
    slotsPerTime: 0,
  });

  useEffect(() => {
    // Initialize with data from Zustand store
    setEvents(bookingData);

    // Subscribe to store changes
    const unsubscribe = useBookingFormStore.subscribe((state) => {
      setEvents(state.data);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [bookingData]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <BookingCalendar bookingData={events} />
    </main>
  );
}
