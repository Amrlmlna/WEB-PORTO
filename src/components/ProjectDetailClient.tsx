"use client";
import React, { useEffect, useState } from "react";
import { ProjectMediaGallery } from "@/components/ProjectMediaGallery";
import { ProjectAiChatModal } from "@/components/project-ai-chat-modal";
import type { Project } from "@/lib/projects";

const TYPING_TEXT =
  "Dont worry, you don't need to read a long description, just ask AI everything about this project.";

export function ProjectDetailClient({ project }: { project: Project }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    setTyped("");
    const interval = setInterval(() => {
      setTyped((prev) => {
        if (i < TYPING_TEXT.length) {
          i++;
          return TYPING_TEXT.slice(0, i);
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 18);
    return () => clearInterval(interval);
  }, [project.slug]);

  return (
    <>
      <div className="mt-8 relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
        {project.media ? (
          <ProjectMediaGallery media={project.media} />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full"
            style={{ objectFit: "cover" }}
            data-ai-hint={project.imageHint}
          />
        )}
      </div>
      {/* Pengantar dan Ask AI */}
      <div className="mt-8 flex flex-col items-center w-full">
        <p className="mb-4 text-base text-muted-foreground text-center min-h-[2.5em]">
          <span>{typed}</span>
          <span
            className="inline-block w-2 h-5 align-middle animate-pulse bg-muted-foreground/60 rounded-sm ml-0.5"
            style={{
              visibility:
                typed.length < TYPING_TEXT.length ? "visible" : "hidden",
            }}
          ></span>
        </p>
        <ProjectAiChatModal
          project={project}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          initialPrompt={`Tell me more about the ${project.title} project.`}
        />
        <button
          className="mt-4 w-full px-12 py-6 rounded-full border-2 border-white text-white font-bold text-base shadow-lg bg-black hover:bg-white hover:text-black hover:shadow-[0_0_12px_2_rgba(255,255,255,0.7)] transition-all duration-300 mb-8"
          style={{ maxWidth: "100%" }}
          onClick={() => setModalOpen(true)}
        >
          Ask AI about this project
        </button>
      </div>
    </>
  );
}
