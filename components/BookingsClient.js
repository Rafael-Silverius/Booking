"use client";

import { useMemo, useState } from "react";
import { splitBookings } from "@/services/utils/bookingUtils";
import EmptyState from "./EmptyState";
import BookingCard from "./BookingCard";

export default function BookingsClient({ bookings }) {
  const [tab, setTab] = useState("active");

  const { active, previous } = useMemo(
    () => splitBookings(bookings),
    [bookings]
  );

  const displayedBookings = tab === "active" ? active : previous;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("active")}
          className={`px-4 py-2 rounded-lg ${
            tab === "active" ? "bg-black text-white" : "bg-gray-100"
          }`}
        >
          Active ({active.length})
        </button>

        <button
          onClick={() => setTab("previous")}
          className={`px-4 py-2 rounded-lg ${
            tab === "previous" ? "bg-black text-white" : "bg-gray-100"
          }`}
        >
          Previous ({previous.length})
        </button>
      </div>

      {/* Empty State */}
      {displayedBookings.length === 0 ? (
        <EmptyState tab={tab} />
      ) : (
        <div className="grid gap-4">
          {displayedBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
}
