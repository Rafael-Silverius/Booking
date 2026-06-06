import { cancelBooking, confirmBooking, StatusBadge } from "@/helpers/help";
import Link from "next/link";
import { useState } from "react";

export default function ReservationItem({ property }) {
  const [tab, setTab] = useState("pending");

  return (
    <div className="bg-white rounded-xl p-4 mb-6 shadow">
      {/* PROPERTY HEADER */}
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-bold">{property.title}</h3>
          <p className="text-gray-500 ">
            {property.city}, {property.country}
          </p>
          <small className="text-gray-500 underline">
            Apartment Id: {property.id}
          </small>
        </div>
      </div>
      {/* BOOKINGS */}
      <div className="mt-4">
        <h4 className="font-semibold mb-2">Bookings</h4>

        {property?.bookings?.length ? (
          <>
            {/* Tabs */}
            <div className="flex flex-col sm:flex-row gap-2 bg-gray-100 p-1 rounded-xl mb-4">
              <button
                type="button"
                onClick={() => setTab("pending")}
                className={`flex-1 py-2 text-sm rounded-lg transition ${
                  tab === "pending"
                    ? "bg-white shadow font-semibold"
                    : "text-gray-600"
                }`}
              >
                Pending
              </button>

              <button
                type="button"
                onClick={() => setTab("confirmed")}
                className={`flex-1 py-2 text-sm rounded-lg transition ${
                  tab === "confirmed"
                    ? "bg-white shadow font-semibold"
                    : "text-gray-600"
                }`}
              >
                Confirmed
              </button>

              <button
                type="button"
                onClick={() => setTab("completed")}
                className={`flex-1 py-2 text-sm rounded-lg transition ${
                  tab === "completed"
                    ? "bg-white shadow font-semibold"
                    : "text-gray-600"
                }`}
              >
                Completed
              </button>

              <button
                type="button"
                onClick={() => setTab("cancelled")}
                className={`flex-1 py-2 text-sm rounded-lg transition ${
                  tab === "cancelled"
                    ? "bg-white shadow font-semibold"
                    : "text-gray-600"
                }`}
              >
                Cancelled
              </button>
            </div>

            {/* Bookings list */}
            {property?.bookings?.filter((b) => b.status === tab).length ? (
              property?.bookings
                ?.filter((b) => b.status === tab)
                .map((b) => (
                  <div
                    key={b.id}
                    className="flex justify-between border-t py-2 group"
                  >
                    <div>
                      <p className="text-sm sm:text-[14px]">{b.check_in} - </p>
                      <p className="text-sm sm:text-[14px]">{b.check_out}</p>
                      <small className="text-gray-500">
                        Guest: {b.profiles.full_name}
                      </small>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <Link
                        href={`/host/bookings/${b.id}`}
                        className="px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-50 transition sm:text-[14px]"
                      >
                        View Booking
                      </Link>

                      <StatusBadge status={b.status} />
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-gray-500">No {tab} bookings</p>
            )}
          </>
        ) : (
          <p className="text-gray-500">No bookings for this property</p>
        )}
      </div>
    </div>
  );
}
