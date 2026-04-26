"use client";

import { useState, useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Send } from "lucide-react";

type ClientThread = {
  clientId: string;
  clientName: string;
  clientEmail: string;
  unreadCount: number;
  lastMessage?: string;
};

type Message = {
  id: string;
  expediteur: string;
  contenu: string;
  created_at: string;
};

export default function AdminMessagesPage() {
  const [threads, setThreads] = useState<ClientThread[]>([]);
  const [selected, setSelected] = useState<ClientThread | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [contenu, setContenu] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/admin/messages")
      .then((r) => r.json())
      .then(setThreads)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!selected) return;
    fetch(`/api/admin/messages?clientId=${selected.clientId}`)
      .then((r) => r.json())
      .then(setMessages)
      .catch(() => {});
  }, [selected]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!contenu.trim() || !selected || sending) return;

    setSending(true);
    try {
      const res = await fetch("/api/admin/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId: selected.clientId, contenu: contenu.trim() }),
      });
      if (res.ok) {
        const msg = await res.json();
        setMessages((prev) => [...prev, msg]);
        setContenu("");
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Messages</h1>
      </div>

      <div className="card flex overflow-hidden" style={{ height: "calc(100vh - 180px)" }}>
        {/* Liste des conversations */}
        <div className="w-64 border-r border-gray-100 overflow-y-auto">
          {threads.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm px-4">Aucune conversation.</div>
          ) : (
            threads.map((thread) => (
              <button
                key={thread.clientId}
                onClick={() => setSelected(thread)}
                className={`w-full text-left px-4 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                  selected?.clientId === thread.clientId ? "bg-sky-50" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-gray-900 truncate">{thread.clientName}</span>
                  {thread.unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2 flex-shrink-0">
                      {thread.unreadCount}
                    </span>
                  )}
                </div>
                {thread.lastMessage && (
                  <p className="text-xs text-gray-400 truncate">{thread.lastMessage}</p>
                )}
              </button>
            ))
          )}
        </div>

        {/* Conversation */}
        <div className="flex-1 flex flex-col">
          {!selected ? (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <p className="text-sm">Sélectionnez une conversation</p>
            </div>
          ) : (
            <>
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="font-semibold text-gray-900">{selected.clientName}</div>
                <div className="text-xs text-gray-400">{selected.clientEmail}</div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => {
                  const isAdmin = msg.expediteur === "admin";
                  return (
                    <div key={msg.id} className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm ${
                        isAdmin
                          ? "bg-gradient-to-br from-sky-500 to-violet-500 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                      }`}>
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.contenu}</p>
                        <div className={`text-xs mt-1.5 ${isAdmin ? "text-white/60" : "text-gray-400"}`}>
                          {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true, locale: fr })}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={bottomRef} />
              </div>

              <form onSubmit={handleSend} className="p-4 border-t border-gray-100 flex gap-3">
                <input
                  type="text"
                  value={contenu}
                  onChange={(e) => setContenu(e.target.value)}
                  placeholder="Répondre..."
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                  disabled={sending}
                />
                <button
                  type="submit"
                  disabled={!contenu.trim() || sending}
                  className="btn-gradient px-4 disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
