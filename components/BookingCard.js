import { formatDate, StatusBadge } from "@/helpers/help";
import Link from "next/link";

export default function BookingCard({ booking }) {
  const property = booking.property;
  return (
    <div className="border rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <img
          src={property?.property_images[0]?.image_url || "/placeholder.jpg"}
          alt={property?.title}
          className="w-full md:w-64 h-48 object-cover"
        />

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          {/* Top */}
          <div>
            <div className="flex justify-between items-start gap-2">
              <div>
                <h2 className="text-lg font-semibold">{property?.title}</h2>

                <p className="text-sm text-gray-500">
                  {property?.city} {property?.country}
                </p>
              </div>

              <StatusBadge status={booking.status} />
            </div>

            <div className="mt-3 text-sm text-gray-600">
              <p>
                {formatDate(booking.check_in)} → {formatDate(booking.check_out)}
              </p>

              <p className="mt-1 font-medium text-black">
                €{booking.total_price}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex gap-2 flex-wrap">
            <Link
              href={`/properties/${property.id}`}
              className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              View details
            </Link>

            {booking.status === "completed" && (
              <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 transition">
                Leave review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
