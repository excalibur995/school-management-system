"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import BookingFormFields from "./components/booking-form/Lazy";

function BookingForm() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" /> Add New Event
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="!w-screen">
        <AlertDialogHeader>
          <AlertDialogTitle>Booking Form</AlertDialogTitle>
        </AlertDialogHeader>
        <BookingFormFields />
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default BookingForm;
