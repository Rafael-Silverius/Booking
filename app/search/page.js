import PropertyCard from "@/components/PropertyCard";
import { getAvailableProperties } from "@/services/apiProperties";
import Map from "@/components/MapWrapper";

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;

  const location = params.location;
  const checkin = params.checkin;
  const checkout = params.checkout;

  const properties = await getAvailableProperties({
    location,
    checkin,
    checkout,
  });

  return (
    <div className="flex flex-row px-6 lg:px-20 py-10 h-[calc(100vh-80px)]">
      {/* LEFT */}
      <div className="w-full lg:w-1/2 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6 pr-4 h-fit">
        {properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <p>No available properties found.</p>
        )}
      </div>

      {/* RIGHT */}
      <div className="hidden lg:block w-1/2 h-full sticky top-0">
        {/* <Map properties={properties} /> */}
      </div>
    </div>
  );
}
