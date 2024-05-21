"use client";

import BookingForm from "@/components/form/Booking/Lazy";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed inset-0 border-b dark:border-b-zinc-700 h-16 z-30 dark:bg-[#212529] bg-[#f8f8f8]">
      <nav className="mx-auto max-w-5xl h-full my-auto flex items-center justify-between transition-all">
        <Link className="font-bold" href="/">
          School Managment System
        </Link>
        <BookingForm />
      </nav>
    </header>
  );
}
