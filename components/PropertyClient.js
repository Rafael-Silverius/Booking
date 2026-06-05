"use client";

import PropertyAvailability from "@/components/PropertyAvailability";
import { insertBooking } from "@/services/apiBookings";
import { useRouter, useSearchParams } from "next/navigation";
import PropertyAmenities from "./PropertyAmenities";
import { useMemo } from "react";
import { useAuth } from "@/providers/AuthProvider";

export default function PropertyClient({
  property,
  bookedDates,
  pricePerNight,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { session, loading } = useAuth();

  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");
  const guests = searchParams.get("guests");

  const hasSearchParams = checkin && checkout && guests;

  const nights = useMemo(() => {
    if (!checkin || !checkout) return 0;
    return (new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24);
  }, [checkin, checkout]);

  const total_cost = nights * pricePerNight;

  const handleReserve = async () => {
    if (loading) return;

    if (!session?.user) {
      const redirectUrl = encodeURIComponent(`/properties/${property.id}`);

      router.push(`/login?redirect=${redirectUrl}`);
      return;
    }

    try {
      const { error } = await insertBooking({
        property_id: property.id,
        check_in: checkin,
        check_out: checkout,
        guests,
        total_price: total_cost,
        guest_id: session.user.id, // IMPORTANT
      });

      if (error) throw error;

      alert("Reserved successfully!");
      router.refresh();
    } catch (error) {
      console.error(error);

      if (error?.code === "23P01") {
        alert("These dates are already booked");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="max-w-[1150px] mx-auto md:px-8">
      {/* TITLE */}
      <h1 className="font-medium py-10 text-3xl capitalize">
        {property.title}
      </h1>

      {/* IMAGES */}
      <div className="w-full h-115 rounded-3xl overflow-hidden shadow-lg grid grid-rows-2 grid-cols-4 mb-8">
        <div className="col-span-2 row-span-2">
          <img
            src={property.property_images[0]?.image_url}
            className="w-full h-full object-cover"
          />
        </div>

        {property.property_images?.slice(1, 5).map((img, i) => (
          <img
            key={i}
            src={img.image_url}
            className="w-full h-full object-cover"
          />
        ))}
      </div>

      {/* CONTENT */}
      <div className="flex gap-8">
        {/* LEFT */}
        <div className="w-3/4">
          <h2 className="font-medium">{property.small_title}</h2>

          <div className="flex gap-2 text-sm font-light">
            <span>{property.guests} guests</span>
            <span>{property.bedrooms} bedrooms</span>
            <span>{property.beds} beds</span>
            <span>{property.bathrooms} baths</span>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <img
              src={property.profiles.avatar_url}
              className="h-[40px] w-[40px] rounded-full"
            />
            <div>
              <h2>Hosted by {property.profiles.full_name}</h2>
            </div>
          </div>

          <div className="border-t my-8" />

          <p className="text-gray-700">{property.description}</p>

          <div className="border-t my-8" />

          <PropertyAmenities propertyAmenities={property.property_amenities} />
        </div>

        {/* RIGHT */}
        <div className="w-1/4 sticky top-20 bg-white shadow-lg rounded-2xl p-4">
          {!hasSearchParams ? (
            <PropertyAvailability
              property_id={property.id}
              bookedDates={bookedDates}
              pricePerNight={pricePerNight}
            />
          ) : (
            <>
              <h1 className="font-bold text-lg">
                €{total_cost || "Select dates"}
              </h1>

              <div className="text-sm mt-2 space-y-2">
                <p>Check-in: {checkin}</p>
                <p>Check-out: {checkout}</p>
                <p>Guests: {guests}</p>
              </div>

              <button
                onClick={handleReserve}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg"
              >
                Reserve
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
