import BookingActions from "@/components/BookingActions";
import Chat from "@/components/Chat";
import GuestCard from "@/components/GuestCard";
import PropertyCard from "@/components/PropertyCard";
import { StatusBadge } from "@/helpers/help";
import { getBookingById } from "@/services/apiBookings";
import { getMessages } from "@/services/apiMessages";
import { createClient } from "@/services/supabase/server";

export default async function page({ params }) {
  const param = await params;
  const booking = await getBookingById(param.id);
  const messages = await getMessages(booking.id);
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  return (
    <div className="flex flex-col items-center  md:mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center m-5">
        <div className="flex gap-4">
          <h1 className="text-2xl font-bold">Booking Details</h1>
          <StatusBadge status={booking.status} />
        </div>
        <div className="pt-4">
          {booking.status === "pending" && (
            <BookingActions
              bookingId={booking.id}
              initialStatus={booking.status}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col md:grid lg:grid-cols-[400px_1fr] gap-6 ">
        {/* Left */}
        <div className="flex flex-col gap-4 ">
          <GuestCard guest={booking.profiles} />

          <div className="bg-white p-2 rounded-xl border flex justify-around">
            <div className="border px-1 rounded-xl">
              <h2 className="font-semibold mb-4">Stay Details</h2>

              <div className="flex flex-col text-sm h-full gap-1 ">
                <h2>
                  Check-in: <span>{booking.check_in}</span>
                </h2>

                <h2>
                  Check-out: <span>{booking.check_out}</span>
                </h2>

                <h2>
                  Guests: <span>{booking.guests}</span>
                </h2>

                <h2>
                  Total: <span>€{booking.total_price}</span>
                </h2>
              </div>
            </div>
            <div className="border px-1 rounded-xl">
              <h2 className="font-semibold mb-4">More details</h2>

              <div className="flex flex-col text-sm h-full gap-1 ">
                <h2>
                  Time of arrival: <span>{booking?.arriving || "Unknown"}</span>
                </h2>

                <h2>
                  Payment method: <span>{booking?.payment || "Unknown"}</span>
                </h2>

                <h2>
                  Requests: <span>{booking.requests || "Unknown"}</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="">
            <PropertyCard property={booking.properties} />
          </div>
        </div>
        {/* Right */}
        <div className="col-start-2 bg-white p-6 rounded-xl border h-full ">
          <h2 className="text-lg font-semibold mb-4">Reservation Chat</h2>
          <Chat
            booking={booking}
            initialMessages={messages}
            currentUserId={data.claims.user_metadata.sub}
            guest={booking.profiles}
          />
        </div>
      </div>
    </div>
  );
}
