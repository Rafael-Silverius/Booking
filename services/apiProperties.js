import supabase from "./supabase";

export async function getAvailableProperties({ location, checkin, checkout }) {
  // 1. Find overlapping bookings
  const { data: bookedProperties, error: bookingError } = await supabase
    .from("bookings")
    .select("property_id")
    .lte("check_in", checkout)
    .gte("check_out", checkin);

  if (bookingError) {
    console.error(bookingError);
    return [];
  }

  const bookedIds = [...new Set(bookedProperties.map((b) => b.property_id))];

  // 2. Fetch available properties
  let query = supabase.from("properties").select(`
      *,
      property_images (
        image_url
      )
    `);

  // Exclude booked properties
  if (bookedIds.length > 0) {
    query = query.not("id", "in", `(${bookedIds.join(",")})`);
  }

  // Location filter
  if (location) {
    query = query.ilike("city", `%${location}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function getPropertyById(id) {
  if (!id) throw new Error("Missing id");

  const { data, error } = await supabase
    .from("properties")
    .select(
      `*,
      profiles(
        id,
        full_name,
        avatar_url
      ),
      property_images (
      image_url
      ),
      property_amenities (
      amenities (
        id,
        name
      )
    )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.log("Supabase error:", error);
    throw error;
  }

  return data;
}

export async function getAllProperties() {
  const { data, error } = await supabase.from("properties").select(`*,
      property_images (
      image_url
      )`);

  if (error) {
    throw new Error("Properties could not be loaded");
  }

  return data;
}

export async function getPropertiesByOwnerId(owner_id) {
  const { data, error } = await supabase
    .from("properties")
    .select(
      `
      *,
      property_images (
        image_url
      ),
      property_amenities (
        amenities (
          id,
          name
        )
      ),
      bookings (
        id,
        check_in,
        check_out,
        status,
        guest_id,
        profiles:guest_id (
          full_name
        )

    )

    `
    )
    .eq("owner_id", owner_id);

  if (error) {
    console.log("Supabase error:", error);
    throw error;
  }

  return data;
}

export async function createProperty(property) {
  const { data, error } = await supabase
    .from("properties")
    .insert([property])
    .select()
    .single();

  if (error) {
    console.error("Supabase error:", error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function updateProperty(property_id, payload) {
  console.log(payload);
  const { data, error } = await supabase
    .from("properties")
    .update(payload)
    .eq("id", property_id)
    .select()
    .single();

  if (error) {
    console.error("Update property error:", error);
    throw new Error(error.message);
  }

  return data;
}
export async function deleteProperty(property_id) {
  const { error } = await supabase
    .from("properties")
    .delete()
    .eq("id", property_id);

  if (error) {
    console.error("Deleting property error:", error);
    throw new Error(error.message);
  }
}
