"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { chat, ChatMessage } from "@/ai/flows/chat-flow";

interface ProjectAiChatModalProps {
  project: {
    slug: string;
    title: string;
    image: string;
    description: string;
    longDescription: string;
  };
  open: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export function ProjectAiChatModal({
  project,
  open,
  onClose,
  initialPrompt,
}: ProjectAiChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const storageKey = `project-ai-chat-${project.slug}`;
  const descriptionId = `project-modal-desc-${project.slug}`;

  // Load chat history from localStorage
  useEffect(() => {
    if (open) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setMessages(JSON.parse(saved));
      } else if (initialPrompt) {
        // Kirim prompt awal otomatis
        handleSend(initialPrompt, true);
      } else {
        setMessages([]);
      }
    }
    // eslint-disable-next-line
  }, [open, project.slug]);

  // Save chat history to localStorage
  useEffect(() => {
    if (open) {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
    // eslint-disable-next-line
  }, [messages, open]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  async function handleSend(msg?: string, isInitial?: boolean) {
    const content = msg ?? input;
    if (!content.trim() || isLoading) return;
    const userMessage: ChatMessage = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    if (!isInitial) setInput("");
    setIsLoading(true);
    try {
      const context = `Project: ${project.title}\nDescription: ${project.longDescription}`;
      const payload = {
        messages: [
          { role: "system", content: context },
          ...messages,
          userMessage,
        ],
      };
      console.log("[ProjectAI] Sending chat request", payload);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log("[ProjectAI] Received chat response", data);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch (error) {
      console.error("[ProjectAI] Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-lg w-full p-0 overflow-hidden"
        aria-describedby={descriptionId}
      >
        <DialogHeader className="p-4 border-b border-border/50">
          <DialogTitle className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded overflow-hidden border border-border/50">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
            <span>{project.title}</span>
          </DialogTitle>
          <p id={descriptionId} className="text-xs text-muted-foreground mt-1">
            {project.description}
          </p>
        </DialogHeader>
        <div
          className="h-80 overflow-y-auto p-4 bg-background/80"
          ref={scrollRef}
        >
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground text-sm">
              Mulai tanya AI tentang proyek ini!
            </div>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-3 flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-secondary rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-muted-foreground text-xs text-center">
              AI is thinking...
            </div>
          )}
        </div>
        <form
          className="flex items-center gap-2 p-4 border-t border-border/50 bg-background"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about this project..."
            className="flex-1"
            disabled={isLoading}
            autoFocus
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            Send
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
