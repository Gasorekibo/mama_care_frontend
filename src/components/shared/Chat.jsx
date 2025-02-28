/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import { Send, Check, CheckCheck, Bird } from "lucide-react";

function Chat({ ourMessages, auth, sendMessage, handleReadMessage }) {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [ourMessages]);

  return (
    <div className="flex flex-col h-[600px] bg-gray-50">
      {!ourMessages?.length && (
        <p className="flex-1 flex items-center justify-center text-gray-400">
          No messages yet
          <div>
            <Bird size={45} className="text-blue-400 animate-bounce" />
          </div>
        </p>
      )}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {ourMessages?.map((message) => {
          const isOwnMessage = message.sender?.id === auth?.user?.id;
          return (
            <div
              key={message.id}
              className={`flex ${
                isOwnMessage ? "justify-end" : "justify-start"
              }`}
              onClick={() => !message.read && handleReadMessage(message.id)}
            >
              <div
                className={`relative max-w-[70%] px-4 py-2 rounded-2xl shadow-sm
                  ${
                    isOwnMessage
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                  }`}
              >
                <p className="text-sm">{message.content}</p>
                <div
                  className={`flex items-center justify-end gap-1 mt-1
                  ${isOwnMessage ? "text-blue-100" : "text-gray-400"}`}
                >
                  <span className="text-xs">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {isOwnMessage &&
                    (message.read ? (
                      <CheckCheck size={14} />
                    ) : (
                      <Check size={14} />
                    ))}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const content = e.target.message.value.trim();
            if (content) {
              sendMessage(content);
              e.target.reset();
            }
          }}
          className="flex items-center gap-2"
        >
          <input
            name="message"
            className="flex-1 p-3 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
