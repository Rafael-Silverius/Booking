"use client";

import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { differenceInCalendarDays } from "date-fns";
import { insertBooking } from "@/services/apiBookings";

export default function PropertyAvailability({
  property_id,
  bookedDates,
  pricePerNight,
}) {
  const [dateRange, setDateRange] = useState();
  const [guests, setGuests] = useState(1);

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
    if (!dateRange?.from || !dateRange?.to) {
      alert("Please select a check-in and check-out date");
      return;
    }
    try {
      await insertBooking({
        property_id: property_id,
        check_in: dateRange.from,
        check_out: dateRange.to,
        guests,
        total_price: totalPrice,
      });

      alert("Reserved successfully!");
    } catch (error) {
      console.log(error);

      if (error.code === "23P01") {
        alert("These dates are already booked");
      } else {
        alert("Something went wrong");
      }
    }
  }

  return (
    <div className="space-y-4 px-1 py-2">
      <div>
        <h3 className="mb-3 text-lg font-semibold">
          Select from available dates
        </h3>

        <Calendar
          mode="range"
          numberOfMonths={1}
          selected={dateRange}
          onSelect={setDateRange}
          className="rounded-xl border"
          disabled={[
            {
              before: new Date(),
            },
            ...disabledDays,
          ]}
        />
        <div className="mt-4 space-y-2">
          <label className="block text-sm font-medium">Number of guests</label>

          <input
            type="number"
            min={1}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-24 rounded-md border px-3 py-2"
          />
        </div>
      </div>

      {dateRange?.from && (
        <div className="rounded-md bg-muted p-4 text-sm space-y-2">
          <p>
            Check-in: <strong>{dateRange.from.toLocaleDateString()}</strong>
          </p>

          {dateRange?.to && (
            <>
              <p>
                Check-out: <strong>{dateRange.to.toLocaleDateString()}</strong>
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

          <p>
            Guests: <strong>{guests}</strong>
          </p>
        </div>
      )}

      <button
        onClick={handleReserve}
        className="rounded-lg bg-black px-4 py-2 text-white hover:bg-black/90"
      >
        Reserve
      </button>
    </div>
  );
}
