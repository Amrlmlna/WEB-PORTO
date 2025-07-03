"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/lib/projects";
import { ProjectCard } from "./project-card";

export function ParallaxProjects() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // To create a seamless looping effect, we can duplicate the projects
  const firstRow = [...projects.slice(0, 3), ...projects.slice(0, 3)];
  const secondRow = [...projects.slice(3, 6), ...projects.slice(3, 6)];

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      ref={ref}
      id="projects"
      className="py-20 md:py-32 bg-secondary/20 overflow-x-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-center">
          Featured Projects
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-center text-muted-foreground">
          Here are some of the projects I'm most proud of. Each one is a story of challenges, learning, and creation.
        </p>
      </div>
      <div className="mt-16 flex flex-col gap-8">
        <motion.div style={{ x: x1 }} className="flex gap-8 -translate-x-1/4">
          {firstRow.map((project, index) => (
            <div key={`${project.slug}-1-${index}`} className="w-[350px] md:w-[400px] flex-shrink-0">
              <ProjectCard project={project} />
            </div>
          ))}
        </motion.div>
        <motion.div style={{ x: x2 }} className="flex gap-8 -translate-x-1/4">
          {secondRow.map((project, index) => (
            <div key={`${project.slug}-2-${index}`} className="w-[350px] md:w-[400px] flex-shrink-0">
              <ProjectCard project={project} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
