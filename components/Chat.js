"use client";

import { useEffect, useState } from "react";
import MessageItem from "./MessageItem";
import { postMessage } from "@/services/apiMessages";
import supabase from "@/services/supabase/supabase";

export default function Chat({
  booking,
  initialMessages,
  currentUserId,
  guest,
}) {
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState(initialMessages);

  const handlePost = async () => {
    if (!content.trim()) return;

    try {
      const saved = await postMessage(booking.id, currentUserId, content);
    } catch (err) {
      throw err;
    } finally {
      setContent("");
    }
  };

  useEffect(() => {
    const channel = supabase
      .channel("messages-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `booking_id=eq.${booking.id}`,
        },
        (payload) => {
          const newMessage = payload.new;

          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [booking.id]);

  return (
    <div className="flex flex-col h-full">
      {/* messages */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-2 p-2 h-full">
        {messages?.map((msg) => (
          <MessageItem
            key={msg.id}
            message={msg}
            currentUserId={currentUserId}
            guest={guest}
          />
        ))}
      </div>

      {/* input */}
      <div className="border-t flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 text-sm focus:outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handlePost();
          }}
        />

        <button
          className="bg-black text-white px-4 py-2 rounded-full text-sm"
          onClick={handlePost}
        >
          Send
        </button>
      </div>
    </div>
  );
}
