"use client";

import PropertyAvailability from "@/components/PropertyAvailability";
import { insertBooking } from "@/services/apiBookings";
import { useRouter, useSearchParams } from "next/navigation";
import PropertyAmenities from "./PropertyAmenities";
import { useMemo } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { toast } from "sonner";
import Image from "next/image";
import { User } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

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
        guest_id: session.user.id,
      });

      if (error) throw error;

      toast.success("Successful Reservation!", { id: "booking" });

      router.push("/bookings");
    } catch (error) {
      console.error(error);

      if (error?.code === "23P01") {
        toast.error("These dates are already booked", { id: "booking" });
      } else {
        toast.error("Something went wrong", { id: "booking" });
      }
    }
  };

  return (
    <div className="max-w-[1150px] mx-auto px-6 md:px-8">
      {/* TITLE */}
      <h1 className="sticky top-20 z-20 bg-white/80 backdrop-blur-md border-b font-medium pt-4 pb-4 text-3xl capitalize">
        {property.title}
      </h1>
      <h2 className="font-medium">{property.small_title}</h2>

      <div className="flex gap-2 text-sm font-light pb-4">
        <span>{property.guests} guests</span>
        <span>{property.bedrooms} bedrooms</span>
        <span>{property.beds} beds</span>
        <span>{property.bathrooms} baths</span>
      </div>

      {/* IMAGES */}
      {/* MOBILE CAROUSEL */}
      <div className="md:hidden mb-8">
        <Carousel className="w-full">
          <CarouselContent>
            {property.property_images?.map((img, i) => (
              <CarouselItem key={i}>
                <div className="relative h-80 w-full overflow-hidden rounded-2xl">
                  <Image
                    src={img.image_url}
                    alt={`Property image ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md" />
          <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md" />
        </Carousel>
      </div>

      {/* DESKTOP GALLERY */}
      <div className="hidden md:grid w-full h-115 rounded-3xl overflow-hidden shadow-lg grid-cols-4 grid-rows-2 gap-2 mb-8">
        <div className="col-span-2 row-span-2 relative">
          <Image
            src={property.property_images[0]?.image_url}
            alt="property image"
            fill
            className="object-cover"
          />
        </div>

        {property.property_images?.slice(1, 5).map((img, i) => (
          <div key={i} className="relative w-full h-full">
            <Image
              src={img.image_url}
              alt={`Property image ${i + 2}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* LEFT */}
        <div className="md:w-3/4">
          <div className="flex items-center gap-4 mt-6">
            {property.profiles.avatar_url ? (
              <img
                src={property?.profiles?.avatar_url}
                className="h-[40px] w-[40px] rounded-full"
                alt="Avatar"
              />
            ) : (
              <User />
            )}
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
        <div className="w-full mx-auto md:w-1/3 bg-white shadow-lg rounded-2xl ">
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
