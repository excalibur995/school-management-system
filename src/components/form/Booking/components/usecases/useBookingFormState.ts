import { BookingData } from "@/components/BookingCalendar/models/types";
import { useBookingFormStore } from "@/lib/store/useBookingStore";
import { Weeks } from "@/models/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { DEFAULT_VALUES } from "../booking-form/models/constant";
import settingsSchema from "../booking-form/models/schemat";
import { calculateEndTime } from "../booking-form/utils";

export default function useBookingFormState() {
  const { updateData } = useBookingFormStore();
  const form = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const [slotsAdded, setSlotsAdded] = useState(DEFAULT_VALUES.slotsPerTime);

  const watchDuration = useWatch({ control: form.control, name: "duration" });

  const watchslotsPerTime = useWatch({ control: form.control, name: "slotsPerTime" });

  const onSubmit = (data: BookingData) => {
    updateData(data);
  };

  const handleStartTimeChange = (day: Weeks, index: number, value: string) => {
    form.setValue(`dailySettings.${day}.timeSlots.${index}.startTime`, value);
    const endTime = calculateEndTime(value, watchDuration);
    form.setValue(`dailySettings.${day}.timeSlots.${index}.endTime`, endTime);
    const timeSlots = form.getValues(`dailySettings.${day}.timeSlots`);
    if (index < timeSlots.length - 1) {
      form.setValue(`dailySettings.${day}.timeSlots.${index + 1}.startTime`, endTime);
      form.setValue(`dailySettings.${day}.timeSlots.${index + 1}.endTime`, calculateEndTime(endTime, watchDuration));
    }
  };

  const handleAddSlot = (day: Weeks) => {
    const slots = form.getValues(`dailySettings.${day}.timeSlots`);
    if (slots.length < watchslotsPerTime) {
      const newSlot = { startTime: "07:00", endTime: calculateEndTime("07:00", watchDuration) };
      const num = `dailySettings.${day}.timeSlots[${slots.length}]`;
      form.setValue(num as any, newSlot);
      setSlotsAdded(slotsAdded + 1);
    }
  };

  const handleDeleteSlot = (day: Weeks, index: number) => {
    const newTimeSlots = form.getValues(`dailySettings.${day}.timeSlots`).filter((_, i) => i !== index);
    form.setValue(`dailySettings.${day}.timeSlots`, newTimeSlots);
    if (newTimeSlots.length === 0) {
      form.setValue(`dailySettings.${day}.enabled`, false);
    }
    setSlotsAdded(Math.max(slotsAdded - 1, 0));
  };
  return {
    form,
    onSubmit,
    handleStartTimeChange,
    handleAddSlot,
    handleDeleteSlot,
    watchDuration,
  };
}
