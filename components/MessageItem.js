import { formatDateForMessages } from "@/helpers/help";

export default function MessageItem({ message, currentUserId, guest }) {
  const isMine = message.sender_id === currentUserId;

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"} mb-2`}>
      <div className="flex flex-col">
        {/* bubble */}
        <div
          className={`
        relative px-3 py-2 text-sm shadow-sm
        ${
          isMine
            ? "bg-green-500 text-white rounded-2xl rounded-br-sm"
            : "bg-white text-black border rounded-2xl rounded-bl-sm"
        }
      `}
        >
          {!isMine && (
            <p className="text-xs font-medium text-gray-500 mb-1">
              {guest.full_name}
            </p>
          )}

          <p className="break-words">{message.content}</p>
        </div>

        <p
          className={`text-[10px] text-gray-400 mt-1 ${
            isMine ? "text-right" : "text-left"
          }`}
        >
          {formatDateForMessages(message.created_at)}
        </p>
      </div>
    </div>
  );
}
