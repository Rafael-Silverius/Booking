// utils/bookingUtils.js

export function splitBookings(bookings) {
  const today = new Date();

  const active = [];
  const previous = [];

  bookings.forEach((booking) => {
    const endDate = new Date(booking.endDate);

    const isPast = endDate < today;

    if (
      booking.status === "cancelled" ||
      booking.status === "completed" ||
      isPast
    ) {
      previous.push(booking);
    } else {
      active.push(booking);
    }
  });

  return { active, previous };
}
