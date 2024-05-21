import { BookingData } from "@/components/BookingCalendar/models/types";
import create from "zustand";
import { PersistOptions, persist } from "zustand/middleware";

interface BookingFormState {
  data: BookingData;
  updateData: (newData: Partial<BookingData>) => void;
}

type BookingFormPersist = (
  config: (set: any, get: any, api: any) => BookingFormState,
  options: PersistOptions<BookingFormState>
) => (set: any, get: any, api: any) => BookingFormState;

const bookingFormPersist: BookingFormPersist = persist;

export const useBookingFormStore = create<BookingFormState>()(
  bookingFormPersist(
    (set) => ({
      data: {
        allowVideoTour: false,
        dailySettings: {},
        duration: 0,
        slotsPerTime: 0,
      },
      updateData: (newData) => set((state: { data: BookingData }) => ({ data: { ...state.data, ...newData } })),
    }),
    {
      name: "booking-form-store", // name of the item in storage
    }
  )
);
