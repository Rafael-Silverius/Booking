"use client";
import { updateStatusBooking } from "@/services/apiBookings";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function BookingActions({ bookingId, initialStatus }) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleUpdate(newStatus) {
    try {
      setLoading(true);
      await updateStatusBooking(bookingId, newStatus);
      router.refresh();

      setStatus(newStatus);

      toast.success(
        newStatus === "confirmed"
          ? "Reservation confirmed"
          : "Reservations rejected",
        {
          position: "top-center",
        }
      );
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-2 ml-2 ">
      <button
        disabled={loading}
        onClick={() => handleUpdate("confirmed")}
        className="text-green-600 text-sm px-3 py-1.5 rounded-full hover:bg-green-50 border-2"
      >
        Accept Reservation
      </button>

      <button
        disabled={loading}
        onClick={() => handleUpdate("cancelled")}
        className="text-red-600 text-sm px-3 py-1.5 rounded-full hover:bg-red-50 border-2"
      >
        Reject Reservation
      </button>
    </div>
  );
}
