
"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
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
  const lastScrollY = useRef(0);
  const [isHovering, setIsHovering] = useState(false);
  
  const x = useTransform(baseX, (v) => `${wrapRange(-20, -45, v)}%`);

  const prevTime = useRef<number>(0);

  useAnimationFrame((t) => {
    if (!prevTime.current) {
        prevTime.current = t;
        lastScrollY.current = scrollY.get();
        return;
    }

    const timeDelta = t - prevTime.current;

    if (isHovering) {
        prevTime.current = t;
        lastScrollY.current = scrollY.get();
        return;
    }
    
    let acceleration = 1;
    if (isInView) {
        const currentScrollY = scrollY.get();
        const scrollDelta = currentScrollY - lastScrollY.current;
        const scrollVelocity = scrollDelta / timeDelta;
        
        acceleration = 1 + Math.min(Math.abs(scrollVelocity) * 0.05, 1);
    }
    
    let moveBy = baseVelocity * (timeDelta / 1000);
    moveBy *= acceleration;

    baseX.set(baseX.get() + moveBy);

    prevTime.current = t;
    lastScrollY.current = scrollY.get();
  });

  return (
    <div 
        className="flex flex-nowrap overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
    >
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
      className="h-full w-full flex flex-col justify-center bg-secondary/20 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">
          Featured Projects
        </h2>
        <p className="mt-2 max-w-2xl mx-auto text-center text-muted-foreground">
          Here are some of the projects I'm most proud of. Each one is a story of challenges, learning, and creation.
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-4">
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

    