import supabase from "./supabase";

export async function insertBooking({
  property_id,
  check_in,
  check_out,
  total_price,
  guests,
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("bookings")
    .insert([
      {
        property_id,
        guest_id: user.id,
        check_in,
        check_out,
        guests,
        total_price,
        status: "pending",
      },
    ])
    .select();

  if (error) {
    console.log(error);
    throw error;
  }

  return data;
}

export async function getBookingsByUserId({ user_id }) {
  if (!user_id) {
    throw new Error("user_id is required");
  }

  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
    *,
    property:properties (
      id,
      title,
      description,
      country,
      city,
      address,
      small_title,
      property_images (
        image_url
      )
    )
  `
    )
    .eq("guest_id", user_id)
    .order("check_in", { ascending: false });

  if (error) throw error;

  return data;
}

export async function getBookingsByPropertyId(property_id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("property_id", property_id);

  if (error) throw error;

  return data;
}

export async function getBookingsByOwnerId(owner_id) {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
      id,
      properties!inner(owner_id)
    `
    )
    .eq("properties.owner_id", owner_id);

  if (error) throw new Error(error.message);

  return data;
}

export async function updateStatusBooking(bookingId, status) {
  if (!bookingId) throw new Error("Missing bookingId");

  const allowedStatuses = ["pending", "confirmed", "cancelled", "completed"];

  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid status");
  }

  return supabase
    .from("bookings")
    .update({ status })
    .eq("id", bookingId)
    .select()
    .single();
}

export async function getBookingById(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
      *,
      profiles!guest_id (
        id,
        full_name,
        email,
        avatar_url
      ),
      properties (
        id,
        title,
        city,
        country,
        price_per_night,
        property_images (
          image_url
        )
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}
