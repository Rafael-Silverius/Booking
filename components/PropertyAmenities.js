import {
  Wifi,
  Car,
  UtensilsCrossed,
  Tv,
  Waves,
  Snowflake,
  Dumbbell,
  WashingMachine,
  Coffee,
  ShieldCheck,
  PawPrint,
  Trees,
} from "lucide-react";

export default function PropertyAmenities({ propertyAmenities }) {
  const amenityIcons = {
    Wifi: Wifi,
    "Free parking": Car,
    Kitchen: UtensilsCrossed,
    TV: Tv,
    Pool: Waves,
    "Air conditioning": Snowflake,
    Gym: Dumbbell,
    Washer: WashingMachine,
    Coffee: Coffee,
    Security: ShieldCheck,
    "Pets allowed": PawPrint,
    Garden: Trees,
  };
  return (
    <div className=" md:pr-20">
      <h2 className="text-2xl font-semibold mb-6">What this place offers</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {propertyAmenities.map((item) => {
          const Icon = amenityIcons[item.amenities.name];

          return (
            <div
              key={item.amenities.id}
              className="flex items-center gap-3 p-4 border rounded-xl hover:bg-gray-50 transition"
            >
              {Icon ? (
                <Icon size={20} className="shrink-0" />
              ) : (
                <span className="text-lg">✓</span>
              )}

              <span>{item.amenities.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
