"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PropertyCard({ property }) {
  const searchParams = useSearchParams();

  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");
  const guests = searchParams.get("guests");
  return (
    <Link
      href={{
        pathname: `/properties/${property.id}`,
        query: {
          checkin,
          checkout,
          guests,
        },
      }}
    >
      <div className="flex flex-col gap-4 rounded-xl border-2 pb-4 cursor-pointer hover:shadow-lg transition">
        <img
          src={property.property_images[0]?.image_url}
          alt="Property Image"
          className="h-50 w-full border-2 rounded-xl"
        />
        <div className="px-4 flex flex-col gap-1">
          <div className="flex flex-row items-center justify-between">
            <h2>{property.title}</h2>
            <span className="text-sm text-gray-500">Rating</span>
          </div>
          <div className="text-sm text-gray-500">
            <p>{property.small_title}</p>
            {/* <p>Property Amenities</p> */}
          </div>
          <p className="underline font-bold text-sm">
            {property.price_per_night} € (per-night)
          </p>
        </div>
      </div>
    </Link>
  );
}
