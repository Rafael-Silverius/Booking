"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { getBookingsByUserId } from "@/services/apiBookings";
import BookingsClient from "@/components/BookingsClient";

export default function Page() {
  const { session } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBookings() {
      if (!session?.user) return;

      const data = await getBookingsByUserId({
        user_id: session.user.id,
      });

      setBookings(data);
      setLoading(false);
    }

    loadBookings();
  }, [session]);

  if (!session?.user) {
    return <div>Please log in to view your bookings.</div>;
  }

  if (loading) {
    return <div>Loading bookings...</div>;
  }
  console.log(bookings);
  return <BookingsClient bookings={bookings} />;
}
