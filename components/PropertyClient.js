"use client";

import PropertyAvailability from "@/components/PropertyAvailability";
import { useAuth } from "@/providers/AuthProvider";
import { insertBooking } from "@/services/apiBookings";
import { useRouter } from "next/navigation";

export default function PropertyClient({
  property,
  searchParams,
  bookedDates,
  pricePerNight,
}) {
  const { session } = useAuth();
  const router = useRouter();

  const checkin = searchParams.value?.checkin;
  const checkout = searchParams.value?.checkout;
  const guests = searchParams.value?.guests;

  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);

  const nights = (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24);
  const total_cost = nights * property.price_per_night;

  const hasSearchParams = checkin && checkout && guests;

  const handleReserve = async () => {
    if (!session) {
      const redirectUrl = encodeURIComponent(
        `/properties/${property.id}?checkin=${checkin}&checkout=${checkout}&guests=${guests}`
      );
      router.push(`/login?redirect=${redirectUrl}`);
      return;
    }

    try {
      await insertBooking({
        property_id: property.id,
        check_in: checkin,
        check_out: checkout,
        guests: guests,
        total_price: total_cost,
      });

      alert("Reserved successfully!");
    } catch (error) {
      if (error.code === "23P01") {
        alert("These dates are already booked");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="max-w-[1150px] mx-auto h-100% md:px-8">
      <div>
        <h1 className="font-medium py-10 text-3xl capitalize">
          {property.title}
        </h1>
        <div className="w-full h-115 rounded-3xl overflow-hidden shadow-lg grid grid-rows-2 grid-cols-4 mb-8 ">
          <div className="col-span-2 row-span-2 ">
            <img
              src={property.property_images[0]?.image_url}
              alt=""
              className="w-full h-full object-cover hover:scale-105 transition duration-400"
            />
          </div>
          {property.property_images?.slice(1, 5).map((img, index) => (
            <div key={index}>
              <img
                src={img.image_url}
                alt="asdf"
                className="w-full h-full object-cover hover:scale-105 transition duration-400"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-3/4 h-full overflow-y-auto pr-10">
          <h2 className="font-medium">{property.small_title}</h2>
          <div className="flex flex-row gap-2 text-sm font-light">
            <span>
              {property.guests} {property.guests == 1 ? " guest∘" : " guests∘"}
            </span>
            <span>
              {property.bedrooms}
              {property.bedrooms == 1 ? " bedroom∘" : " bedrooms∘"}
            </span>
            <span>
              {property.beds} {property.beds == 1 ? " bed∘" : " beds∘"}
            </span>
            <span className="">
              {property.bathrooms}
              {property.bathrooms == 1 ? " bath" : " baths"}
            </span>
          </div>
          <div className="w-full flex flex-row gap-4 items-center mt-6">
            <img
              src={property.profiles.avatar_url}
              alt=""
              className="h-[40px] w-[40px] rounded-full"
            />
            <div>
              <h2>Hosted by {property.profiles.full_name}</h2>
              <small>SuperHost ∘ Hosting for</small>
            </div>
          </div>
          <div className="border-t border-gray-200 my-8"></div>
          <div className="pr-20">
            <h1 className="font-bold text-xl pb-4">About this place</h1>
            <p className="text-gray-700 leading-6 whitespace-pre-line">
              {property.description}
            </p>
          </div>
          <div className="border-t border-gray-200 my-8"></div>
          <div className="pr-20">
            <h1 className="font-bold text-xl pb-4">What this place offers</h1>
            <ul className="text-gray-700 leading-6 whitespace-pre-line">
              {property.property_amenities.map((item) => (
                <li key={item.amenities.id}>{item.amenities.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-1/4 h-full sticky top-20 shadow-lg rounded-2xl bg-white">
          {!hasSearchParams ? (
            <PropertyAvailability
              property_id={property.id}
              bookedDates={bookedDates}
              pricePerNight={pricePerNight}
            />
          ) : (
            <>
              <h1 className="font-bold">
                {total_cost ? total_cost + "Є" : "Select dates"}
              </h1>
              <table>
                <tbody>
                  <tr className="flex gap-10">
                    <td>
                      Check-in: <br /> {checkin || "Not selected"}
                    </td>
                    <td>
                      Check-out: <br /> {checkout || "Not selected"}
                    </td>
                  </tr>
                  <tr>
                    <td>Guests: {guests || "Not selected"}</td>
                  </tr>
                </tbody>
              </table>
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
