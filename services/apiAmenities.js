import supabase from "./supabase/supabase";

export async function getAmenities() {
  const { data, error } = await supabase.from("amenities").select("*");
  if (error) {
    console.log(error);
    throw error;
  }

  return data;
}

export async function updatePropertyAmenities(propertyId, amenityIds) {
  await supabase
    .from("property_amenities")
    .delete()
    .eq("property_id", propertyId);

  const rows = amenityIds.map((amenityId) => ({
    property_id: propertyId,
    amenity_id: amenityId,
  }));

  const { error } = await supabase.from("property_amenities").insert(rows);

  if (error) throw error;
}
