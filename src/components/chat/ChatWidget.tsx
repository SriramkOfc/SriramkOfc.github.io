"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Face, { type Mood } from "./Face";
import Markdown from "./Markdown";

const API = process.env.NEXT_PUBLIC_ASK_API ?? "https://sriramkofc-ask-sriram.hf.space";
const STORE = "ask-sriram-chat-v1";
const MAX_CHARS = 800;

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content: "Hi, I'm Sriram's AI assistant. Ask me about his work, projects or how to get in touch.",
};

const SUGGESTIONS = ["What does he do at FinTalkr?", "What has he built recently?", "Why hire him?", "How do I reach him?"];

async function wake(): Promise<boolean> {
  try {
    const r = await fetch(`${API}/api/health`, { cache: "no-store" });
    return r.ok && (r.headers.get("content-type") ?? "").includes("json");
  } catch {
    return false;
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [happy, setHappy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Restore this tab's conversation; pre-wake the backend; show a one-time teaser.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORE);
      if (saved) {
        const parsed = JSON.parse(saved) as Msg[];
        if (Array.isArray(parsed) && parsed.length) queueMicrotask(() => setMsgs(parsed));
      }
    } catch {}
    const w = setTimeout(() => void wake(), 2500);
    const t = setTimeout(() => {
      if (!sessionStorage.getItem(`${STORE}-teased`)) setTeaser(true);
    }, 6000);
    return () => {
      clearTimeout(w);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORE, JSON.stringify(msgs.slice(-30)));
    } catch {}
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, busy]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 250);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const openChat = () => {
    setOpen(true);
    setTeaser(false);
    try {
      sessionStorage.setItem(`${STORE}-teased`, "1");
    } catch {}
  };

  const send = useCallback(
    async (text: string) => {
      const message = text.trim().slice(0, MAX_CHARS);
      if (!message || busy) return;
      const history = msgs.filter((m) => m !== GREETING).slice(-12);
      setMsgs((m) => [...m, { role: "user", content: message }]);
      setInput("");
      setBusy(true);
      setStatus(null);

      const started = Date.now();
      let reply: string | null = null;
      while (reply === null && Date.now() - started < 90_000) {
        try {
          const r = await fetch(`${API}/api/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message, history }),
          });
          const isJson = (r.headers.get("content-type") ?? "").includes("json");
          if (isJson) {
            const data = (await r.json()) as { reply?: string };
            reply = data.reply ?? "Sorry, I didn't catch that. Could you try again?";
          } else {
            setStatus("Waking up. This takes a few seconds the first time.");
            await wake();
            await new Promise((res) => setTimeout(res, 3000));
          }
        } catch {
          setStatus("Waking up. This takes a few seconds the first time.");
          await new Promise((res) => setTimeout(res, 3000));
        }
      }

      setStatus(null);
      setBusy(false);
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          content: reply ?? "I'm having trouble connecting right now. You can email Sriram at [sriramkofc@gmail.com](mailto:sriramkofc@gmail.com).",
        },
      ]);
      setHappy(true);
      setTimeout(() => setHappy(false), 1400);
    },
    [busy, msgs],
  );

  const mood: Mood = busy ? "thinking" : happy ? "happy" : hover ? "hover" : "idle";
  const fresh = msgs.length <= 1;

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end sm:bottom-6 sm:right-6">
      {/* Panel */}
      <div
        role="dialog"
        aria-label="Ask Sriram chat"
        aria-hidden={!open}
        className={`chat-panel mb-3 flex w-[calc(100vw-2rem)] origin-bottom-right flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_24px_70px_-20px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,0,0,0.05)] sm:w-[390px] ${
          open ? "chat-open" : "chat-closed"
        }`}
        style={{ height: "min(600px, calc(100svh - 7.5rem))" }}
      >
        <header className="flex items-center gap-3 border-b border-rule px-4 py-3">
          <Face size={36} mood={mood} track={open} />
          <div className="min-w-0 flex-1">
            <p className="font-display text-[15px] font-semibold leading-tight tracking-[-0.01em]">Ask Sriram</p>
            <p className="t-small !text-[12.5px]">{busy ? "Thinking..." : "AI assistant. Usually replies in seconds."}</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="grid h-9 w-9 place-items-center rounded-full text-grey transition-colors hover:bg-paper hover:text-ink"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
              <path d="M2 2l10 10M12 2 2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[14.5px] leading-[1.5] ${
                  m.role === "user" ? "rounded-br-md bg-ink text-white" : "rounded-bl-md bg-paper text-ink"
                }`}
              >
                {m.role === "assistant" ? <Markdown text={m.content} /> : m.content}
              </div>
            </div>
          ))}

          {busy && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-md bg-paper px-4 py-3">
                <span className="typing" aria-label="Assistant is typing">
                  <i />
                  <i />
                  <i />
                </span>
                {status && <p className="t-small mt-2 !text-[12.5px]">{status}</p>}
              </div>
            </div>
          )}

          {fresh && !busy && (
            <div className="flex flex-wrap gap-2 pt-1">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => void send(s)}
                  className="rounded-full border border-rule px-3 py-1.5 text-[13px] text-ink-2 transition-colors hover:border-ink hover:text-ink"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <form
          className="border-t border-rule p-3"
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
        >
          <div className="flex items-end gap-2 rounded-2xl bg-paper px-3 py-2 focus-within:ring-1 focus-within:ring-ink/20">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              maxLength={MAX_CHARS}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(input);
                }
              }}
              placeholder="Ask about Sriram..."
              aria-label="Your message"
              className="max-h-28 flex-1 resize-none bg-transparent py-1.5 text-[15px] outline-none placeholder:text-grey"
            />
            <button
              type="submit"
              disabled={!input.trim() || busy}
              aria-label="Send"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-white transition-opacity disabled:opacity-25"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <path d="M7 12V2M2.5 6.5 7 2l4.5 4.5" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <p className="t-small mt-2 px-1 !text-[11.5px]">AI can make mistakes. For anything important, email Sriram.</p>
        </form>
      </div>

      {/* Teaser bubble */}
      {teaser && !open && (
        <button
          type="button"
          onClick={openChat}
          className="teaser mb-3 mr-1 rounded-2xl rounded-br-md bg-white px-4 py-2.5 text-left text-[14px] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.3),0_0_0_1px_rgba(0,0,0,0.05)]"
        >
          <span className="font-medium">Hi there.</span> Ask me anything about Sriram.
        </button>
      )}

      {/* Launcher: the living cube */}
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openChat())}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-label={open ? "Close chat" : "Chat with Sriram's AI assistant"}
        aria-expanded={open}
        className="launcher rounded-[30%] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <Face size={60} mood={mood} />
      </button>
    </div>
  );
}
