import { BookingData } from "@/components/BookingCalendar/models/types";
import { PersistOptions } from "zustand/middleware";

export interface BookingFormState {
  data: BookingData;
  updateData: (newData: Partial<BookingData>) => void;
}

export type BookingFormPersist = (
  config: (set: any, get: any, api: any) => BookingFormState,
  options: PersistOptions<BookingFormState>
) => (set: any, get: any, api: any) => BookingFormState;
