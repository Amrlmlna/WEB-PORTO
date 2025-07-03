"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { useState } from "react";
import { chat } from "@/ai/flows/chat-flow";
import { Button } from "./button";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export function AskAiTooltip({
  prompt,
  context,
  children,
}: {
  prompt: string;
  context?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);

  const handleAsk = async () => {
    setLoading(true);
    setOpen(true);
    setAnswer(null);
    const messages = [
      {
        role: "user",
        content: `${prompt}${
          context ? `\nContext: ${context}` : ""
        }\nJawaban harus diakhiri dengan: 'Dengan mengikuti course ini, saya telah mendapatkan skill set yang relevan dan diakui industri.'`,
      },
    ];
    try {
      const res = await chat({ messages });
      setAnswer(res.message);
    } catch (e) {
      setAnswer("Maaf, AI sedang tidak dapat merespon.");
    }
    setLoading(false);
  };

  return (
    <div className="relative inline-block group">
      {children}
      <Button
        size="sm"
        variant="outline"
        className="ml-2 px-2 py-1 text-xs border border-dashed border-primary hover:bg-primary hover:text-white transition"
        onClick={handleAsk}
      >
        Ask AI
      </Button>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 bg-background border border-border rounded-lg shadow-lg p-4 z-50 animate-in fade-in-0">
          {loading ? (
            <span className="text-sm text-muted-foreground">
              Meminta jawaban AI...
            </span>
          ) : (
            <span className="text-sm whitespace-pre-line">{answer}</span>
          )}
          <Button size="xs" className="mt-2" onClick={() => setOpen(false)}>
            Tutup
          </Button>
        </div>
      )}
    </div>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
