import Link from "next/link";
import PropertyCard from "./PropertyCard";

export default function GroupedProperties({ groupedProperties }) {
  return (
    <div className="space-y-14">
      {Object.entries(groupedProperties).map(([city, cityProperties]) => {
        // skip empty cities
        if (!cityProperties.length) return null;

        return (
          <section key={city}>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Stay in {city}</h2>

                <p className="text-sm text-muted-foreground">
                  Explore top-rated properties
                </p>
              </div>

              <Link
                href={`/cities/${city.toLowerCase()}`}
                className="text-sm font-medium hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="scrollbar-hide flex snap-x gap-5 overflow-x-auto pb-4">
              {cityProperties.map((property) => (
                <div
                  key={property.id}
                  className="w-[300px] flex-shrink-0 snap-start"
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
