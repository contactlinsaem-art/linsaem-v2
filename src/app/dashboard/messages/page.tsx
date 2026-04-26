"use client";

import { useState, useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Send } from "lucide-react";

type Message = {
  id: string;
  expediteur: string;
  contenu: string;
  created_at: string;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [contenu, setContenu] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  async function fetchMessages() {
    try {
      const res = await fetch("/api/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!contenu.trim() || sending) return;

    setSending(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contenu: contenu.trim() }),
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
        <p className="text-gray-500 mt-1">Échangez avec l&apos;équipe LINSAEM.</p>
      </div>

      <div className="card flex flex-col" style={{ height: "calc(100vh - 240px)" }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {loading ? (
            <div className="text-center text-gray-400 py-8">Chargement...</div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <div className="text-4xl mb-3">💬</div>
              <p className="text-sm">Envoyez votre premier message à l&apos;équipe LINSAEM.</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isClient = msg.expediteur === "client";
              return (
                <div key={msg.id} className={`flex ${isClient ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    isClient
                      ? "bg-gradient-to-br from-sky-500 to-violet-500 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}>
                    {!isClient && (
                      <div className="text-xs font-semibold mb-1 text-violet-600">Équipe LINSAEM</div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.contenu}</p>
                    <div className={`text-xs mt-1.5 ${isClient ? "text-white/60" : "text-gray-400"}`}>
                      {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true, locale: fr })}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={bottomRef} />
        </div>

        {/* Zone de saisie */}
        <form onSubmit={handleSend} className="p-4 border-t border-gray-100 flex gap-3">
          <input
            type="text"
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all"
            disabled={sending}
          />
          <button
            type="submit"
            disabled={!contenu.trim() || sending}
            className="btn-gradient px-4 py-3 disabled:opacity-50"
          >
            <Send size={17} />
          </button>
        </form>
      </div>
    </div>
  );
}
