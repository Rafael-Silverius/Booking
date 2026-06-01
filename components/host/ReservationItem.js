import { cancelBooking, confirmBooking, StatusBadge } from "@/helpers/help";
import { useState } from "react";

export default function ReservationItem({ property }) {
  const [tab, setTab] = useState("pending");
  const [bookings, setBookings] = useState(property.bookings || []);

  const updateBookingStatusLocal = (id, status) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const handleConfirm = async (id) => {
    const previous = bookings;

    // 1. optimistic UI update
    updateBookingStatusLocal(id, "confirmed");

    try {
      await confirmBooking(id);
    } catch (err) {
      // rollback if failed
      setBookings(previous);
      console.error(err);
    }
  };

  const handleCancel = async (id) => {
    const previous = bookings;

    updateBookingStatusLocal(id, "cancelled");

    try {
      await cancelBooking(id);
    } catch (err) {
      setBookings(previous);
      console.error(err);
    }
  };

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
            <div className="flex gap-2 bg-gray-100 p-1 rounded-xl mb-4">
              <button
                type="button"
                onClick={() => setTab("pending")}
                className={`flex-1 py-2 rounded-lg transition ${
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
                className={`flex-1 py-2 rounded-lg transition ${
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
                className={`flex-1 py-2 rounded-lg transition ${
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
                className={`flex-1 py-2 rounded-lg transition ${
                  tab === "cancelled"
                    ? "bg-white shadow font-semibold"
                    : "text-gray-600"
                }`}
              >
                Cancelled
              </button>
            </div>

            {/* Bookings list */}
            {bookings.filter((b) => b.status === tab).length ? (
              bookings
                .filter((b) => b.status === tab)
                .map((b) => (
                  <div
                    key={b.id}
                    className="flex justify-between border-t py-2 group"
                  >
                    <div>
                      <p>
                        {b.check_in} → {b.check_out}
                      </p>
                      <small className="text-gray-500">
                        Guest: {b.profiles.full_name}
                      </small>
                    </div>

                    <div className="flex items-center gap-2">
                      <StatusBadge status={b.status} />

                      {/* hidden actions */}
                      {b.status === "pending" && (
                        <div className="opacity-0 group-hover:opacity-100 transition flex gap-2 ml-2">
                          <button
                            className="text-green-600 text-sm px-3 py-1.5 rounded-full hover:bg-green-50"
                            onClick={() => handleConfirm(b.id)}
                          >
                            Accept
                          </button>

                          <button
                            className="text-red-600 text-sm px-3 py-1.5 rounded-full hover:bg-red-50"
                            onClick={() => handleCancel(b.id)}
                          >
                            Reject
                          </button>
                        </div>
                      )}
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
