import { useState, useRef, useEffect } from "react";
import api from "./api/axios";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";

const STORAGE_KEY = "spring-ai-chat-history";

// 🔹 Load messages from localStorage directly
const getInitialMessages = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

export default function App() {
  const [messages, setMessages] = useState(getInitialMessages); // <- Important fix
  const bottomRef = useRef(null);

  // 🔹 Save messages on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const time = Date.now();

    // User message
    setMessages(prev => [...prev, { text, isUser: true, time }]);

    try {
      const res = await api.post("/chat", { prompt: text });

      // AI message
      setMessages(prev => [...prev, { text: res.data.response, isUser: false, time: Date.now() }]);

    } catch (error) {
      setMessages(prev => [...prev, { text: "❌ Error: Could not contact AI server.", isUser: false, time: Date.now() }]);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center">
      <div className="w-full max-w-2xl h-[85vh] bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col">

        {/* Header */}
        <div className="p-5 text-lg font-semibold text-white border-b border-white/20 flex justify-between items-center">
          <span>🤖 Spring AI Chat</span>
          <button
            onClick={clearChat}
            className="px-4 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium text-sm transition"
          >
            Clear Chat
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5">
          {messages.map((msg, i) => (
            <ChatMessage key={i} message={msg.text} isUser={msg.isUser} />
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
}
