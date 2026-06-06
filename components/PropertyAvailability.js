"use client";

import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { differenceInCalendarDays } from "date-fns";
import { insertBooking } from "@/services/apiBookings";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PropertyAvailability({
  property_id,
  bookedDates,
  pricePerNight,
}) {
  const [dateRange, setDateRange] = useState();
  const [guests, setGuests] = useState(1);
  const { session, loading } = useAuth();
  const router = useRouter();

  const disabledDays = bookedDates.map((booking) => ({
    from: new Date(booking.check_in),
    to: new Date(booking.check_out),
  }));

  const nights =
    dateRange?.from && dateRange?.to
      ? differenceInCalendarDays(dateRange.to, dateRange.from)
      : 0;
  const totalPrice = nights * pricePerNight;

  async function handleReserve() {
    if (loading) return;

    if (!session?.user) {
      const redirectUrl = encodeURIComponent(`/properties/${property_id}`);

      router.push(`/login?redirect=${redirectUrl}`);
      return;
    }

    if (!dateRange?.from || !dateRange?.to) {
      alert("Please select a check-in and check-out date");
      return;
    }
    try {
      const { error } = await insertBooking({
        property_id: property_id,
        check_in: dateRange.from,
        check_out: dateRange.to,
        guests,
        total_price: totalPrice,
      });

      if (error) throw error;

      toast.success("Successful Reservation!", { id: "booking" });

      router.push("/bookings");
    } catch (error) {
      if (error?.code === "23P01") {
        toast.error("These dates are already booked", { id: "booking" });
      } else {
        toast.error("Something went wrong", { id: "booking" });
      }
    }
  }

  return (
    <>
      <h2 className="text-2xl font-semibold pb-6">
        Select from available dates
      </h2>
      <div className="mb-10 flex flex-col items-center sm:flex-row sm:justify-evenly md:flex-col">
        <Calendar
          mode="range"
          numberOfMonths={1}
          selected={dateRange}
          onSelect={setDateRange}
          className="rounded-xl border "
          disabled={[
            {
              before: new Date(),
            },
            ...disabledDays,
          ]}
        />
        {dateRange?.from && (
          <>
            <div className="rounded-md bg-muted text-sm space-y-2">
              <p>
                Check-in: <strong>{dateRange.from.toLocaleDateString()}</strong>
              </p>

              {dateRange.to && (
                <>
                  <p>
                    Check-out:{" "}
                    <strong>{dateRange.to.toLocaleDateString()}</strong>
                  </p>

                  <p>
                    Nights: <strong>{nights}</strong>
                  </p>

                  <p>
                    €{pricePerNight} × {nights} nights
                  </p>

                  <p className="text-base font-bold">Total: €{totalPrice}</p>
                </>
              )}

              <div className="mt-4 space-y-2">
                <label className="block text-sm font-medium">
                  Number of guests
                </label>

                <input
                  type="number"
                  min={1}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-24 rounded-md border px-3 py-2"
                />
              </div>
              {dateRange?.from < dateRange?.to && (
                <button
                  onClick={handleReserve}
                  className="mt-4 w-full rounded-lg bg-black px-4 py-2 text-white hover:bg-black/90"
                >
                  Reserve
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
