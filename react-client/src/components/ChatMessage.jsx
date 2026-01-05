export default function ChatMessage({ message, isUser }) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed
        ${isUser
          ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-none shadow-md"
          : "bg-white/80 backdrop-blur text-gray-900 rounded-bl-none shadow"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
