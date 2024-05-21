import { BookingData } from "@/components/BookingCalendar/models/types";
import { LOCAL_STORAGE_KEY } from "@/models/constants";
import create from "zustand";
import { persist } from "zustand/middleware";
import { BookingFormPersist, BookingFormState } from "./models/types";

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
      updateData: (newData) =>
        set((state: { data: BookingData }) => ({
          data: {
            ...state.data,
            ...newData,
            dailySettings: {
              ...state.data.dailySettings,
              ...newData.dailySettings,
            },
          },
        })),
    }),
    {
      name: LOCAL_STORAGE_KEY,
    }
  )
);
