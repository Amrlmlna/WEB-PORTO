"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
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
}

function ParallaxRow({ children, baseVelocity }: ParallaxRowProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrapRange(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() !== 0) {
      directionFactor.current = velocityFactor.get() > 0 ? -1 : 1;
    }
    
    moveBy += directionFactor.current * velocityFactor.get() * 2;

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

  return (
    <section
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
        <ParallaxRow baseVelocity={-20}>
            {firstRow.map((project, index) => (
                <div key={`${project.slug}-1-${index}`} className="w-[350px] md:w-[400px] flex-shrink-0">
                    <ProjectCard project={project} />
                </div>
            ))}
        </ParallaxRow>
        <ParallaxRow baseVelocity={20}>
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
