import Link from "next/link";

export default function EmptyState({ tab }) {
  const isActive = tab === "active";

  return (
    <div className="text-center py-16 border rounded-2xl bg-gray-50">
      <div className="text-4xl mb-3">{isActive ? "📅" : "🧳"}</div>

      <h3 className="text-xl font-semibold">
        No {isActive ? "active" : "previous"} bookings
      </h3>

      <p className="text-gray-500 mt-2 mb-8 max-w-md mx-auto">
        {isActive
          ? "You don’t have any upcoming stays right now. When you book a place, it will appear here."
          : "Your past trips will show up here once you complete a stay."}
      </p>

      {isActive && (
        <Link
          className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          href="/"
        >
          Explore stays
        </Link>
      )}
    </div>
  );
}
