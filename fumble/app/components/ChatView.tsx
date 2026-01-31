"use client";

import { MessageCircle } from "lucide-react";

interface ChatViewProps {
  onSelectChat?: (chat: { id: number; name: string }) => void;
}

export default function ChatView({ onSelectChat }: ChatViewProps) {
  const chats = [
    { id: 1, name: "Sarah", message: "Hey! How's your weekend going?", time: "2m" },
    { id: 2, name: "Mike", message: "That hike looks amazing!", time: "1h" },
    { id: 3, name: "Jessica", message: "Haha, totally agree.", time: "3h" },
    { id: 4, name: "Alex", message: "When are you free?", time: "1d" },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f4f4f5] pb-24">
      {/* Header */}
      <div className="p-4 bg-white shadow-sm border-b border-zinc-200">
        <h1 className="text-xl font-bold">Messages</h1>
      </div>

      {/* Chat List */}
      <div className="flex flex-col">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat && onSelectChat(chat)}
            className="p-4 bg-white border-b border-zinc-100 flex items-center gap-4 hover:bg-zinc-50 active:bg-zinc-100 transition-colors cursor-pointer"
          >
            {/* Avatar Placeholder */}
            <div className="w-12 h-12 bg-zinc-200 rounded-full flex items-center justify-center shrink-0">
              <span className="font-bold text-zinc-400">{chat.name[0]}</span>
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-md truncate">{chat.name}</h3>
                <span className="text-xs text-zinc-400">{chat.time}</span>
              </div>
              <p className="text-zinc-500 text-sm truncate">{chat.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-zinc-400 opacity-50">
        <MessageCircle size={48} className="mb-2" />
        <p>Keep swiping to match!</p>
      </div>
    </div>
  );
}
