import { StatusBadge } from "@/helpers/help";

export default function ReservationItem({ property }) {
  return (
    <div className="bg-white rounded-xl p-4 mb-6 shadow">
      {/* PROPERTY HEADER */}
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-bold">{property.title}</h3>
          <p className="text-gray-500">
            {property.city}, {property.country}
          </p>
          <small className="text-gray-500">ID: {property.id}</small>
        </div>
      </div>
      {/* BOOKINGS */}
      <div className="mt-4">
        <h4 className="font-semibold mb-2">Bookings</h4>

        {property.bookings.length
          ? property.bookings.map((b) => (
              <div key={b.id} className="border-t py-2 flex justify-between">
                <span>
                  {b.check_in} → {b.check_out}
                </span>
                <StatusBadge status={b.status} />
              </div>
            ))
          : "No bookings for this property"}
      </div>
    </div>
  );
}
