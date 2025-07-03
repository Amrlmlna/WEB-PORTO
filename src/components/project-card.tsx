"use client";

import { useEffect, useState } from "react";
import { summarizeProjectDescription } from "@/ai/flows/summarize-project-description";
import type { Project } from "@/lib/projects";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { AskAiTooltip } from "./ui/tooltip";
import { ProjectAiChatModal } from "./project-ai-chat-modal";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const getSummary = async () => {
      try {
        setLoading(true);
        const result = await summarizeProjectDescription({
          projectDescription: project.longDescription,
        });
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
      <div className="relative h-32 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          data-ai-hint={project.imageHint}
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="font-headline text-lg">{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-2 p-4 pt-0">
        <p className="text-muted-foreground text-sm leading-snug">
          {project.description}
        </p>
        <Button
          size="sm"
          variant="outline"
          className="ml-2 px-2 py-1 text-xs border border-dashed border-primary hover:bg-primary hover:text-white transition"
          onClick={() => setModalOpen(true)}
        >
          Ask AI
        </Button>
        <ProjectAiChatModal
          project={project}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          initialPrompt={`Tell me more about the ${project.title} project.`}
        />
        <div className="flex flex-wrap gap-2 pt-1">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/projects/${project.slug}`} passHref>
          <Button
            variant="link"
            className="p-0 h-auto text-accent hover:text-accent/80"
          >
            View Project
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
