"use client";

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from './ui/button';
import { Terminal } from 'lucide-react';

export function WebContainerPreview({ projectTitle }: { projectTitle: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (iframeRef.current) {
        iframeRef.current.srcdoc = `
          <body style="font-family: sans-serif; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #1a1a1a; color: white; text-align: center;">
            <h1 style="margin-bottom: 20px;">${projectTitle} Live Preview</h1>
            <p style="font-size: 0.9rem; max-width: 80%;">This is a placeholder for an interactive WebContainer preview. <br/>A full implementation would run the project's code directly in your browser.</p>
          </body>
        `;
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [projectTitle]);

  return (
    <Card className="mt-12 bg-card/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Terminal className="h-5 w-5" />
          Live Preview
        </CardTitle>
        <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
            <span className="text-sm text-muted-foreground">{isLoading ? "Booting Container..." : "Ready"}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="aspect-[16/10] w-full rounded-md border border-border/50 bg-background overflow-hidden shadow-inner">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center p-8">
                <div className="w-full h-full bg-muted animate-pulse rounded-md"></div>
            </div>
          ) : (
            <iframe
              ref={iframeRef}
              title={`${projectTitle} Live Preview`}
              className="w-full h-full"
              sandbox="allow-scripts allow-same-origin"
            />
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
            Note: This is a visual representation of a WebContainer. The full interactive functionality can be implemented next.
        </p>
      </CardContent>
    </Card>
  );
}
