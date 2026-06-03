import supabase from "./supabase/supabase";

export async function getMessages(booking_id) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("booking_id", booking_id);
  if (error) throw error;

  return data;
}

export async function postMessage(booking_id, sender_id, content) {
  const { data, error } = await supabase
    .from("messages")
    .insert([
      {
        booking_id,
        sender_id,
        content,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error posting message:", error);
    throw new Error(error.message);
  }

  return data;
}
