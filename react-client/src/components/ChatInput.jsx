import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="p-4 border-t bg-white/60 backdrop-blur-md">
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask something..."
          className="flex-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={send}
          className="px-5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600
          text-white font-medium hover:opacity-90 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
