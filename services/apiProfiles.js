import supabase from "./supabase/supabase";

export async function fetchProfile(userId) {
  if (!userId) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("full_name, avatar_url, role")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error.message);
    return null;
  }

  return data;
}
