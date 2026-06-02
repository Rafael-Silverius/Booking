import Chat from "@/components/Chat";
import GuestCard from "@/components/GuestCard";
import PropertyCard from "@/components/PropertyCard";
import { StatusBadge } from "@/helpers/help";
import { getBookingById } from "@/services/apiBookings";
import { getMessages } from "@/services/apiMessages";
import { createClient } from "@/services/server";

export default async function page({ params }) {
  const param = await params;
  const booking = await getBookingById(param.id);
  const messages = await getMessages(booking.id);
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  return (
    <div>
      <div className="flex flex-col justify-center items-center p-8 gap-4">
        <div className="flex gap-4">
          <h1 className="text-2xl font-bold">Booking Details</h1>
          <StatusBadge status={booking.status} />
        </div>
        <div>
          {booking.status === "pending" && (
            <div className="flex gap-2 ml-2 ">
              <button
                className="text-green-600 text-sm px-3 py-1.5 rounded-full hover:bg-green-50 border-2"
                // onClick={() => handleConfirm(b.id)}
              >
                Accept Reservation
              </button>

              <button
                className="text-red-600 text-sm px-3 py-1.5 rounded-full hover:bg-red-50 border-2"
                // onClick={() => handleCancel(b.id)}
              >
                Reject Reservation
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 max-w-5xl mx-auto">
        <div className="col-span-2 row-start-1">
          <GuestCard guest={booking.profiles} />
        </div>

        <div className="col-start-1 row-start-2">
          <PropertyCard property={booking.properties} />
        </div>

        <div className="col-start-2 row-start-2">
          <div className="bg-white p-6 rounded-xl border">
            <h2 className="font-semibold mb-4">Stay Details</h2>

            <div className="grid grid-cols-2 text-sm ">
              <h2>Check-in</h2>
              <h2>{booking.check_in}</h2>

              <h2>Check-out</h2>
              <h2>{booking.check_out}</h2>

              <h2>Guests</h2>
              <h2>{booking.guests}</h2>

              <h2>Total</h2>
              <h2>€{booking.total_price}</h2>
            </div>
          </div>
        </div>

        <div className="col-span-2 row-span-2 col-start-3 row-start-1">
          <div className="bg-white p-6 rounded-xl border h-full">
            <Chat
              booking={booking}
              initialMessages={messages}
              currentUserId={data.claims.user_metadata.sub}
              guest={booking.profiles}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
