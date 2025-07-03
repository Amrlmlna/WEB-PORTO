"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chat, ChatMessage } from '@/ai/flows/chat-flow';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const examplePrompts = [
    "What technologies does Amirul use?",
    "Tell me about the Quantum Entangler project.",
    "What's Amirul's most recent work experience?",
    "Can you summarize Amirul's skills?",
];

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setIsLoading(true);
            setTimeout(() => {
                 setMessages([{role: 'assistant', content: "My name is Amirul Maulana. What can I help you with?"}]);
                 setIsLoading(false);
            }, 1000)
        }
    }, [isOpen]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPromptIndex((prevIndex) => (prevIndex + 1) % examplePrompts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };
    
    const scrollToBottom = () => {
        if(scrollAreaRef.current) {
            setTimeout(() => {
                const scrollableView = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
                if (scrollableView) {
                   scrollableView.scrollTo({ top: scrollableView.scrollHeight, behavior: 'smooth' });
                }
            }, 100);
        }
    };
    
    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await chat({ messages: [...messages, userMessage] });
            setMessages((prev) => [...prev, { role: 'assistant', content: response.message }]);
        } catch (error) {
            console.error("Chatbot error:", error);
            setMessages((prev) => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handlePromptClick = (prompt: string) => {
        setInput(prompt);
        // Focus the input after setting the value
        const inputElement = document.querySelector('input[placeholder="Ask me anything..."]');
        if (inputElement) {
            (inputElement as HTMLInputElement).focus();
        }
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="default"
                    size="lg"
                    className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-primary-foreground hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                >
                    <AnimatePresence>
                    {isOpen ? (
                        <motion.div key="close" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}>
                            <X className="h-8 w-8" />
                        </motion.div>
                    ) : (
                        <motion.div key="open" initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -90 }}>
                            <MessageSquare className="h-8 w-8" />
                        </motion.div>
                    )}
                    </AnimatePresence>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                side="top"
                align="end"
                className="w-[380px] h-[600px] mr-4 mb-2 flex flex-col p-0 border-border/50 bg-background/80 backdrop-blur-md shadow-2xl rounded-xl"
            >
                <div className="p-4 border-b border-border/50">
                    <h3 className="font-headline text-lg font-semibold">Chat with Amirul</h3>
                    <p className="text-sm text-muted-foreground">Your friendly portfolio assistant</p>
                </div>
                <ScrollArea className="flex-grow" ref={scrollAreaRef}>
                    <div className="space-y-4 p-4">
                        {messages.map((message, index) => (
                            <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : 'justify-start')}>
                                {message.role === 'assistant' && (
                                     <Avatar className="h-8 w-8 border border-border/50">
                                         <AvatarImage src="https://placehold.co/40x40.png" alt="Amirul" data-ai-hint="robot face" />
                                         <AvatarFallback>AI</AvatarFallback>
                                     </Avatar>
                                )}
                                <div className={cn("max-w-[80%] rounded-lg px-4 py-2 text-sm", message.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary rounded-bl-none')}>
                                    {message.content.split('\\n').map((line, i) => <p key={i}>{line}</p>)}
                                </div>
                            </div>
                        ))}
                         {isLoading && (
                            <div className="flex items-start gap-3 justify-start">
                                <Avatar className="h-8 w-8 border border-border/50">
                                     <AvatarImage src="https://placehold.co/40x40.png" alt="Amirul" data-ai-hint="robot face" />
                                     <AvatarFallback>AI</AvatarFallback>
                                </Avatar>
                                <div className="bg-secondary rounded-lg rounded-bl-none px-4 py-3 text-sm flex items-center">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
                <div className="p-4 border-t border-border/50 space-y-3">
                     <div className="h-8 overflow-hidden relative">
                         <AnimatePresence mode="wait">
                             <motion.div
                                 key={currentPromptIndex}
                                 initial={{ y: 20, opacity: 0 }}
                                 animate={{ y: 0, opacity: 1 }}
                                 exit={{ y: -20, opacity: 0 }}
                                 transition={{ duration: 0.3, ease: 'easeInOut' }}
                                 className="absolute inset-0"
                             >
                                 <Button variant="outline" size="sm" className="w-full text-muted-foreground" onClick={() => handlePromptClick(examplePrompts[currentPromptIndex])}>
                                     {examplePrompts[currentPromptIndex]}
                                 </Button>
                             </motion.div>
                         </AnimatePresence>
                     </div>
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <Input
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Ask me anything..."
                            className="flex-grow"
                            disabled={isLoading && messages.length > 0}
                        />
                        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        </Button>
                    </form>
                </div>
            </PopoverContent>
        </Popover>
    );
}
