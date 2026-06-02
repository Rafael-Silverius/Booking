import { updateStatusBooking } from "@/services/apiBookings";

export function StatusBadge({ status }) {
  const styles = {
    confirmed: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-red-100 text-red-700",
    completed: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`px-3 py-1.5 inline-flex items-center justify-center rounded-full border text-xs  font-medium ${
        styles[status] || styles.pending
      }`}
    >
      {status}
    </span>
  );
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
export function formatDateForMessages(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return date.toLocaleDateString([], {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function confirmBooking(id) {
  return await updateStatusBooking(id, "confirmed");
}
export async function cancelBooking(id) {
  return await updateStatusBooking(id, "cancelled");
}
