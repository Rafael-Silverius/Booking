import { getBookingsByPropertyId } from "@/services/apiBookings";
import PropertyClient from "../../../components/PropertyClient";
import { getPropertyById } from "@/services/apiProperties";

export default async function Page({ params, searchParams }) {
  const { id } = await params;

  const property = await getPropertyById(id);
  const bookedDates = await getBookingsByPropertyId(id);

  return (
    <PropertyClient
      property={property}
      searchParams={searchParams}
      bookedDates={bookedDates}
      pricePerNight={property.price_per_night}
    />
  );
}
