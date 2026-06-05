import supabase from "./supabase/supabase";

const { data } = supabase.storage
  .from("property-images")
  .getPublicUrl(fileName);

const imageUrl = data.publicUrl;
