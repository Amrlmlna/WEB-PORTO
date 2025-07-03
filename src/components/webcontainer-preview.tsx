"use client";

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Server, Terminal, XCircle } from 'lucide-react';
import { WebContainer } from '@webcontainer/api';

const files = (projectTitle: string) => ({
  'index.js': {
    file: {
      contents: `
import express from 'express';
const app = express();
const port = 3111;

app.get('/', (req, res) => {
  res.send(\`
    <body style="font-family: sans-serif; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #1a1a1a; color: white; text-align: center;">
      <h1 style="margin-bottom: 20px;">${projectTitle}</h1>
      <p>This interactive preview is running in a WebContainer, right in your browser!</p>
    </body>
  \`);
});

app.listen(port, () => {
  console.log(\`App is live at http://localhost:\${port}\`);
});`,
    },
  },
  'package.json': {
    file: {
      contents: `
{
  "name": "project-preview",
  "type": "module",
  "dependencies": {
    "express": "latest",
    "nodemon": "latest"
  },
  "scripts": {
    "start": "nodemon --watch './' index.js"
  }
}`,
    },
  },
});

export function WebContainerPreview({ projectTitle }: { projectTitle: string }) {
  const webContainerRef = useRef<WebContainer | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [status, setStatus] = useState('idle');
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const bootWebContainer = async () => {
      if (webContainerRef.current) return;

      try {
        setStatus('booting');
        const container = await WebContainer.boot();
        webContainerRef.current = container;
        
        setStatus('mounting');
        await container.mount(files(projectTitle));

        container.on('server-ready', (port, url) => {
          setStatus('ready');
          setUrl(url);
        });

        container.on('error', (err) => {
          console.error('WebContainer Error:', err);
          setError(err.message);
          setStatus('error');
        });

        setStatus('installing');
        const installProcess = await container.spawn('npm', ['install']);
        const installExitCode = await installProcess.exit;
        if (installExitCode !== 0) {
          throw new Error('Failed to install dependencies.');
        }

        setStatus('starting');
        await container.spawn('npm', ['start']);
        
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'An unexpected error occurred.');
        setStatus('error');
      }
    };

    bootWebContainer();

    return () => {
      webContainerRef.current?.teardown();
      webContainerRef.current = null;
    };
  }, [projectTitle]);

  const statusMessages: { [key: string]: { message: string; icon: React.ReactNode } } = {
    idle: { message: 'Initializing...', icon: <Loader2 className="h-4 w-4 animate-spin" /> },
    booting: { message: 'Booting WebContainer...', icon: <Loader2 className="h-4 w-4 animate-spin" /> },
    mounting: { message: 'Mounting files...', icon: <Loader2 className="h-4 w-4 animate-spin" /> },
    installing: { message: 'Installing dependencies...', icon: <Terminal className="h-4 w-4" /> },
    starting: { message: 'Starting dev server...', icon: <Server className="h-4 w-4" /> },
    ready: { message: 'Ready', icon: <div className="h-2 w-2 rounded-full bg-green-500"></div> },
    error: { message: 'Error', icon: <XCircle className="h-4 w-4 text-destructive" /> },
  };

  const { message, icon } = statusMessages[status] || statusMessages.idle;

  return (
    <Card className="mt-12 bg-card/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Terminal className="h-5 w-5" />
          Live Preview
        </CardTitle>
        <div className="flex items-center gap-2">
            {icon}
            <span className="text-sm text-muted-foreground">{message}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="aspect-[16/10] w-full rounded-md border border-border/50 bg-background overflow-hidden shadow-inner">
          {status === 'ready' && url ? (
            <iframe
              ref={iframeRef}
              src={url}
              title={`${projectTitle} Live Preview`}
              className="w-full h-full"
              sandbox="allow-scripts allow-same-origin"
            />
          ) : (
             <div className="w-full h-full flex items-center justify-center p-8 bg-black">
                <div className="text-center text-muted-foreground">
                    {status !== 'error' ? (
                        <>
                            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                            <p>{message}</p>
                        </>
                    ) : (
                        <>
                            <XCircle className="h-8 w-8 text-destructive mx-auto mb-4" />
                            <p className="font-semibold">Something went wrong</p>
                            <p className="text-xs mt-2 max-w-sm">{error}</p>
                        </>
                    )}
                </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
