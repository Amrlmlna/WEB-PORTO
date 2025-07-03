"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  useInView,
} from "framer-motion";
import { projects } from "@/lib/projects";
import { ProjectCard } from "./project-card";

const wrapRange = (min: number, max: number, value: number) => {
    const range = max - min;
    return ((((value - min) % range) + range) % range) + min;
};

interface ParallaxRowProps {
  children: React.ReactNode;
  baseVelocity: number;
  isInView: boolean;
}

function ParallaxRow({ children, baseVelocity, isInView }: ParallaxRowProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 1], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrapRange(-20, -45, v)}%`);

  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 1000);

    if (isInView) {
        const scrollBonus = Math.sign(baseVelocity) * Math.abs(velocityFactor.get());
        moveBy += scrollBonus * (delta / 1000);
    }
    
    baseX.set(baseX.get() + moveBy);
  });


  return (
    <div className="flex flex-nowrap overflow-hidden">
      <motion.div className="flex gap-8" style={{ x }}>
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}

export function ParallaxProjects() {
  const firstRow = projects.slice(0, 3);
  const secondRow = projects.slice(3, 6);

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "0px 0px -15% 0px" });

  return (
    <section
      id="projects"
      ref={containerRef}
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
        <ParallaxRow baseVelocity={-2} isInView={isInView}>
            {firstRow.map((project, index) => (
                <div key={`${project.slug}-1-${index}`} className="w-[350px] md:w-[400px] flex-shrink-0">
                    <ProjectCard project={project} />
                </div>
            ))}
        </ParallaxRow>
        <ParallaxRow baseVelocity={2} isInView={isInView}>
            {secondRow.map((project, index) => (
                <div key={`${project.slug}-2-${index}`} className="w-[350px] md:w-[400px] flex-shrink-0">
                    <ProjectCard project={project} />
                </div>
            ))}
        </ParallaxRow>
      </div>
    </section>
  );
}
