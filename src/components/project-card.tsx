"use client";

import { useEffect, useState } from 'react';
import { summarizeProjectDescription } from '@/ai/flows/summarize-project-description';
import type { Project } from '@/lib/projects';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSummary = async () => {
      try {
        setLoading(true);
        const result = await summarizeProjectDescription({ projectDescription: project.longDescription });
        setSummary(result.summary);
      } catch (error) {
        console.error("Failed to summarize project description:", error);
        setSummary(project.description); // Fallback to short description
      } finally {
        setLoading(false);
      }
    };
    getSummary();
  }, [project.longDescription, project.description]);

  return (
    <Card className="flex flex-col h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-colors duration-300 group">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          data-ai-hint={project.imageHint}
        />
      </div>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <p className="text-muted-foreground">{summary}</p>
        )}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/projects/${project.slug}`} passHref>
          <Button variant="link" className="p-0 h-auto text-accent hover:text-accent/80">
            View Project
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
