import { getCityImage } from "@/helpers/help";
import PropertyCard from "./PropertyCard";
import { MapPin, Sparkles } from "lucide-react";
import Image from "next/image";

export default function GroupedProperties({ groupedProperties }) {
  return (
    <div className="space-y-20 max-w-6xl mx-auto px-4">
      {Object.entries(groupedProperties).map(([city, cityProperties]) => {
        if (!cityProperties.length) return null;

        return (
          <section key={city} className="space-y-5">
            {/* CITY HEADER WITH IMAGE */}
            <div className="relative rounded-2xl overflow-hidden h-40 shadow-md">
              {/* background image */}
              <Image
                src={getCityImage(city)}
                alt={city}
                fill
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* dark overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* content */}
              <div className="relative h-full flex flex-col justify-center px-6 text-white">
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <MapPin size={16} />
                  <span>Explore destination</span>
                </div>

                <h2 className="text-3xl font-bold mt-1">Stay in {city}</h2>

                <div className="flex items-center gap-2 text-sm mt-1 opacity-90">
                  <Sparkles size={16} />
                  <span>Curated homes & experiences</span>
                </div>
              </div>
            </div>

            {/* SCROLL CARDS */}
            <div className="relative">
              <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                {cityProperties.map((property) => (
                  <div
                    key={property.id}
                    className="min-w-70 max-w-70 shrink-0 snap-start"
                  >
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>

              {/* fade edges */}
              <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-linear-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-linear-to-l from-white to-transparent" />
            </div>
          </section>
        );
      })}
    </div>
  );
}
