"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useBookingFormState from "../usecases/useBookingFormState";
import { DAYS_OF_WEEK, DURATIONS } from "./models/constant";
import { calculateEndTime, getFilteredTimeOptions } from "./utils";

function BookingFormFields() {
  const { form, onSubmit, handleAddSlot, handleDeleteSlot, handleStartTimeChange, watchDuration } =
    useBookingFormState();

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a duration" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {DURATIONS.map((duration) => (
                    <SelectItem key={duration} value={duration.toString()}>
                      {duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slotsPerTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slots per Time</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  defaultValue={form.getValues("slotsPerTime")}
                  placeholder="Slots per Time"
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="allowVideoTour"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2 space-y-1">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <Label className="m-0 p-0">Allow video tour call</Label>
            </FormItem>
          )}
        />
        <section className="flex flex-col gap-2">
          <Label className="font-bold">Availability</Label>
          <Label>Set your weekly recurring schedule</Label>
        </section>

        <div className="flex flex-col gap-8">
          {DAYS_OF_WEEK.map((day, index) => (
            <section className="grid grid-cols-4" key={day}>
              <FormField
                name={`dailySettings.${day}.enabled`}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-4 space-y-1">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        onClick={() => handleDeleteSlot(day, index)}
                      />
                    </FormControl>
                    <Label className="m-0 p-0"> {day}</Label>
                  </FormItem>
                )}
              />
              {form.getValues(`dailySettings.${day}.enabled`) ? (
                <div className="flex flex-col gap-3">
                  {form.getValues(`dailySettings.${day}.timeSlots`).map((slot, index) => (
                    <section key={index} className="grid grid-cols-3 w-full gap-4">
                      <FormField
                        name={`dailySettings.${day}.timeSlots.${index}.startTime`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <Select onValueChange={(value) => handleStartTimeChange(day, index, value)}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a start time" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {getFilteredTimeOptions(
                                  index > 0
                                    ? form.watch(`dailySettings.${day}.timeSlots.${index - 1}.endTime`)
                                    : "07:00"
                                ).map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <section className="flex flex-col w-full ml-2">
                        <Select
                          disabled
                          defaultValue={calculateEndTime(
                            form.watch(`dailySettings.${day}.timeSlots.${index}.startTime`),
                            watchDuration
                          )}
                        >
                          <SelectTrigger>
                            <SelectValue>
                              {calculateEndTime(
                                form.watch(`dailySettings.${day}.timeSlots.${index}.startTime`),
                                watchDuration
                              )}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent></SelectContent>
                        </Select>
                      </section>
                      <Button variant="destructive" onClick={() => handleDeleteSlot(day, index)}>
                        Delete
                      </Button>
                    </section>
                  ))}
                  <Button onClick={() => handleAddSlot(day)}>Add</Button>
                </div>
              ) : (
                "Unavailable"
              )}
            </section>
          ))}
        </div>
        <section className="inline-flex items-center gap-4 justify-end">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <Button type="submit" variant="ghost">
              Submit
            </Button>
          </AlertDialogAction>
        </section>
      </form>
    </Form>
  );
}

export default BookingFormFields;
