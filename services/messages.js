import supabase from "./supabase/supabase";

export async function getMessages(conversationId) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId);
  if (error) throw error;

  return data;
}
