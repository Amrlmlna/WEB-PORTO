"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { WebContainerPreview } from "@/components/webcontainer-preview";
import { motion } from "framer-motion";

export function ProjectDetailClient({
  project,
  isWebApp,
}: {
  project: any;
  isWebApp: boolean;
}) {
  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/#projects" className="mb-8 inline-block">
        <Button
          variant="link"
          className="p-0 text-muted-foreground hover:text-foreground"
        >
          ← Back to all projects
        </Button>
      </Link>
      <motion.h1
        className="font-headline text-4xl md:text-6xl font-bold"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {project.title}
      </motion.h1>
      <motion.p
        className="mt-4 text-lg text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
      >
        {project.description}
      </motion.p>
      <motion.div
        className="mt-6 flex flex-wrap gap-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {project.tags.map((tag: string) => (
          <motion.div
            key={tag}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Badge variant="secondary">{tag}</Badge>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="mt-8 relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          data-ai-hint={project.imageHint}
        />
      </motion.div>
      <motion.article
        className="mt-12 max-w-none text-foreground/90 leading-relaxed space-y-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
      >
        <p>{project.longDescription}</p>
      </motion.article>
      {isWebApp && <WebContainerPreview projectTitle={project.title} />}
      <motion.div
        className="mt-12 flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
      >
        {project.liveUrl && (
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            passHref
          >
            <Button
              variant="outline"
              className="border-accent text-accent hover:bg-accent/10 hover:text-accent"
            >
              Live Demo <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
        {project.repoUrl && (
          <Link
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            passHref
          >
            <Button variant="outline">
              View Code <Github className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </motion.div>
    </div>
  );
}
