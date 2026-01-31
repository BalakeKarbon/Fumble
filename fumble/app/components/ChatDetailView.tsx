"use client";

import { ChevronLeft, MoreHorizontal, BadgeCheck, SendHorizontal } from "lucide-react";

interface ChatDetailViewProps {
  chat: { id: number; name: string };
  onBack: () => void;
}

export default function ChatDetailView({ chat, onBack }: ChatDetailViewProps) {
  const messages = [
    { id: 1, text: "Hey! What do you usually do to unwind after work?", isMe: true },
    { id: 2, text: "Mostly music or a walk. You?", isMe: false },
    { id: 3, text: "Same! Walks + podcasts are my go-to.", isMe: true },
    { id: 4, text: "Nice. What kind of podcasts?", isMe: false },
    { id: 5, text: "A mix—true crime and random life stuff. You?", isMe: true },
    { id: 6, text: "Love that. I'm more into comedy and stories lately.", isMe: false },
  ];

  return (
    <div className="flex flex-col h-screen bg-white text-black font-sans z-50 fixed inset-0">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-zinc-100 bg-white">
        <button onClick={onBack} className="p-1 -ml-2">
          <ChevronLeft size={32} />
        </button>
        <div className="flex flex-col items-center">
          <span className="font-bold text-lg">{chat.name}</span>
        </div>
        <div className="w-8"></div> {/* Spacer for center alignment */}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-100 bg-white">
        <button className="flex-1 py-3 text-center border-b-2 border-black font-bold text-sm">
          Chat
        </button>
        <button className="flex-1 py-3 text-center text-zinc-400 font-bold text-sm">
          Profile
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-white">
        {messages.map((msg, index) => (
          <div key={msg.id} className={`flex w-full ${msg.isMe ? 'justify-end' : 'justify-start items-end gap-2'}`}>

            {/* Avatar for Their messages */}
            {!msg.isMe && (
              <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-500 shrink-0">
                {chat.name[0]}
              </div>
            )}

            <div
              className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed
                    ${msg.isMe
                  ? 'bg-black text-white rounded-2xl rounded-tr-sm'
                  : 'bg-zinc-100 text-black rounded-2xl rounded-tl-sm'
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 bg-white border-t border-zinc-100 pb-24">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-zinc-100 rounded-full h-12 flex items-center px-4">
            <input
              type="text"
              placeholder="Send a message"
              className="bg-transparent w-full outline-none text-sm placeholder-zinc-400"
            />
          </div>
          <button className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-black bg-white shadow-sm hover:bg-zinc-50 active:scale-95 transition-all">
            <SendHorizontal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
