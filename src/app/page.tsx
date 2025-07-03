
"use client";

import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import ThreeCanvas from '@/components/three-canvas';
import { Button } from '@/components/ui/button';
import { ArrowDown, Code, PenTool, Database, Briefcase, Award, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { ParallaxProjects } from '@/components/parallax-projects';
import LanyardCanvas from '@/components/lanyard-canvas';
import { Chatbot } from '@/components/chatbot';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

const timelineEvents = [
  { type: 'work', year: '2023', title: 'Senior Frontend Engineer at Vision-X', description: 'Leading the development of interactive 3D web experiences for major brands, focusing on performance and user engagement.' },
  { type: 'certification', year: '2022', title: 'Certified Three.js Professional', description: 'Mastered advanced 3D graphics, shaders, and optimization techniques in Three.js.', certificateImage: 'https://placehold.co/400x300.png', imageHint: 'certificate document' },
  { type: 'work', year: '2021', title: 'Interactive Developer at Glitch Works', description: 'Specialized in creating playful and unique web interactions for digital campaigns and art installations.' },
  { type: 'work', year: '2020', title: 'Frontend Developer at Creative Labs', description: 'Developed and maintained responsive user interfaces for various client websites using React and Next.js.' },
  { type: 'certification', year: '2019', title: 'Interaction Design Specialization', description: 'Completed a comprehensive course on UI/UX principles, prototyping, and user-centered design.', certificateImage: 'https://placehold.co/400x300.png', imageHint: 'certificate design' },
  { type: 'education', year: '2018', title: 'B.Sc. in Computer Science', description: 'Graduated with honors, focusing on human-computer interaction and computer graphics.' },
];

const skills = [
  { name: 'React & Next.js', level: 95 },
  { name: 'Three.js & WebGL', level: 90 },
  { name: 'UI/UX Design (Figma)', level: 85 },
  { name: 'Node.js & Backend', level: 80 },
  { name: 'Generative AI & Python', level: 75 },
];

const TechIcon = ({ children, name }: { children: React.ReactNode; name: string }) => (
  <div className="flex flex-col items-center justify-center text-center gap-2 p-4 bg-secondary/30 rounded-lg transition-all duration-300 hover:bg-secondary/60 hover:scale-105">
    <div className="flex items-center justify-center w-12 h-12">
      {children}
    </div>
    <span className="text-sm font-medium text-muted-foreground">{name}</span>
  </div>
);

function TimelineEvent({ event, index, total, scrollYProgress }: { event: any, index: number, total: number, scrollYProgress: any }) {
  const [isActive, setIsActive] = useState(false);

  const itemProgress = useTransform(scrollYProgress, (v) => {
    const start = index / total;
    return v > start + 0.001;
  });

  useMotionValueEvent(itemProgress, "change", (latest) => {
    setIsActive(latest);
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'work':
        return <Briefcase className="h-4 w-4" />;
      case 'certification':
        return <Award className="h-4 w-4" />;
      case 'education':
        return <GraduationCap className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative pl-12 py-4 group">
      <div className="flex items-center mb-1">
        <div className={cn(
          "bg-secondary ring-background text-muted-foreground rounded-full h-8 w-8 text-sm font-bold flex items-center justify-center absolute left-0 top-4 -translate-x-1/2 transform ring-4 transition-colors duration-500",
          isActive ? 'bg-primary text-primary-foreground' : 'bg-secondary'
        )}>
          {getIcon(event.type)}
        </div>
        <h4 className="font-bold text-lg">{event.title}</h4>
        <time className="ml-auto text-sm font-semibold text-muted-foreground">{event.year}</time>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>
      {event.type === 'certification' && event.certificateImage && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-80 p-2 bg-background border rounded-lg shadow-xl opacity-0 transition-opacity duration-300 pointer-events-none z-20 block group-hover:opacity-100">
          <Image
            src={event.certificateImage}
            alt={`${event.title} certificate`}
            width={400}
            height={300}
            className="rounded-md"
            data-ai-hint={event.imageHint}
          />
        </div>
      )}
    </div>
  );
}

function InteractiveTimelineSection({ events }: { events: any[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef
  });
  const progressLineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div>
      <h3 className="font-headline text-2xl font-semibold mb-8">My Journey</h3>
      <div className="relative h-[450px]">
        <ScrollArea className="h-full" ref={scrollContainerRef}>
          <div className="relative ml-4 mr-8 py-24 border-l-2 border-border/50">
            <motion.div
              className="absolute left-[-2px] top-0 w-0.5 bg-primary z-10"
              style={{ height: progressLineHeight }}
            />
            {events.map((event, index) => (
              <TimelineEvent
                key={index}
                event={event}
                index={index}
                total={events.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

function SkillsSection() {
  return (
    <div>
      <h3 className="font-headline text-2xl font-semibold mb-6">My Skillset</h3>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between items-center mb-1">
              <p className="font-medium text-foreground/90">{skill.name}</p>
              <p className="text-sm font-mono text-muted-foreground">{skill.level}%</p>
            </div>
            <Progress value={skill.level} className="h-2" />
          </div>
        ))}
      </div>
    </div>
  );
}

const HeroSection = () => (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center justify-items-center">
                <div className="relative z-10 col-start-1 row-start-1 flex flex-col items-center text-center pointer-events-none">
                    <h1 className="font-headline text-[15vw] md:text-[18vw] lg:text-[20vw] font-black tracking-tighter text-foreground/90 leading-none">
                        HI, I'M<br />AMIRUL
                    </h1>
                </div>
                <div className="relative z-30 col-start-1 row-start-1 w-full flex justify-between items-end">
                    <div className="text-left pointer-events-auto">
                        <p className="max-w-[200px] text-lg text-muted-foreground">
                            A 3D DESIGNER PASSIONATE ABOUT CRAFTING BOLD AND MEMORABLE PROJECTS.
                        </p>
                    </div>
                    <div className="pointer-events-auto">
                        <Link href="#contact" passHref>
                            <Button size="lg" className="font-bold text-base bg-gradient-to-r from-purple-500 to-pink-500 text-primary-foreground hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 rounded-full">
                                CONTACT ME
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div className="relative h-[80vh] w-[80vh]">
                        <ThreeCanvas />
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const ProjectsSection = () => <ParallaxProjects />;

const AboutSection = () => (
  <section id="about" className="h-full w-full flex items-center justify-center py-20 md:py-32">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-bold">About Me</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                I'm a passionate developer and designer with a love for creating beautiful, interactive, and user-friendly digital experiences. My journey in tech is driven by curiosity and a desire to solve complex problems with elegant solutions.
            </p>
        </div>
        <div className="grid md:grid-cols-5 gap-16 items-start">
            <div className="md:col-span-2 relative h-[400px] w-full md:h-full md:min-h-[600px]">
              <LanyardCanvas />
            </div>
            <div className="md:col-span-3 space-y-12">
              <InteractiveTimelineSection events={timelineEvents} />
              <SkillsSection />
              <div>
                  <h3 className="font-headline text-2xl font-semibold mb-6">Technologies I Use</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <TechIcon name="React">
                          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-cyan-400"><title>React</title><path fill="currentColor" d="M12.03 2.02c-5.513 0-9.98 4.468-9.98 9.98s4.467 9.98 9.98 9.98 9.98-4.468 9.98-9.98-4.467-9.98-9.98-9.98zm0 1.996c4.41 0 7.984 3.574 7.984 7.984s-3.574 7.984-7.984 7.984-7.984-3.574-7.984-7.984 3.574-7.984 7.984-7.984zM12 7.73a4.584 4.584 0 00-4.33 3.23h8.66a4.584 4.584 0 00-4.33-3.23zm0 8.54a4.582 4.582 0 004.33-3.23H7.67a4.582 4.582 0 004.33 3.23zm-4.33-4.27a4.583 4.583 0 000-1.996h8.66a4.583 4.583 0 000 1.996H7.67z"/></svg>
                      </TechIcon>
                      <TechIcon name="Next.js">
                          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-foreground"><title>Next.js</title><path fill="currentColor" d="M15.402 16.299l-3.402-5.945v5.945h-2.15V7.701h2.15l3.402 5.945V7.701h2.15v8.598zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-8C7.589 4 4 7.589 4 12s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8z"/></svg>
                      </TechIcon>
                      <TechIcon name="TypeScript">
                          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-500"><title>TypeScript</title><path fill="currentColor" d="M1.5 0h21l-1.91 21.563L11.75 24l-8.36-2.438L1.5 0zm17.58 9.22l.22-2.5-12.23.23.16 1.77 3.5.06.17 1.95-3.3.04.16 1.83 3.1.05.17 1.9-3.04.03.16 1.83h8.66l.22-2.41h-3.32l-.12-1.3h3.44zm-7.9-5.11l.16-1.83h12.1l.22 2.5h-12.48z"/></svg>
                      </TechIcon>
                      <TechIcon name="Tailwind">
                          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-cyan-500"><title>Tailwind CSS</title><path fill="currentColor" d="M12.001 4.8c-3.97 0-7.2 3.23-7.2 7.2s3.23 7.2 7.2 7.2 7.2-3.23 7.2-7.2-3.23-7.2-7.2-7.2zm0 12.6c-2.97 0-5.4-2.43-5.4-5.4s2.43-5.4 5.4-5.4 5.4 2.43 5.4 5.4-2.43 5.4-5.4 5.4zm-4.5-5.4c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5-4.5-2.015-4.5-4.5z"/></svg>
                      </TechIcon>
                      <TechIcon name="Node.js">
                          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-500"><title>Node.js</title><path fill="currentColor" d="M11.99 2.002c-1.39 0-2.779.31-3.999 1.02v17.956c1.22.61 2.609.92 3.999.92 1.39 0 2.779-.31 3.999-.92V3.022c-1.22-.71-2.609-1.02-3.999-1.02zM12 3.422a8.6 8.6 0 013.499.8V19.78a8.6 8.6 0 01-3.5-.8V3.422zM4.001 7.262v9.475a8.55 8.55 0 013.499 1.94V5.322a8.55 8.55 0 01-3.5-1.94v3.88zM16.5 5.322v13.83a8.55 8.55 0 013.5-1.94V9.202a8.55 8.55 0 01-3.5-3.88z"/></svg>
                      </TechIcon>
                      <TechIcon name="Firebase">
                          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-amber-500"><title>Firebase</title><path fill="currentColor" d="M3.243 16.329l7.06-12.228a1.21 1.21 0 012.098 0l2.36 4.088-3.414 5.913-4.99-2.88L3.243 16.33zm14.802-1.996l-3.37-5.837-6.023 3.477 4.965 8.6a1.21 1.21 0 002.09-.012l2.338-4.045a1.21 1.21 0 00-.002-1.183zM10.3 21.65l-6.24-10.81a1.21 1.21 0 00-1.049-.61H2.4a1.21 1.21 0 00-1.049 1.815l8.134 14.087a1.21 1.21 0 002.098 0l.717-1.232-2.05-3.55z"/></svg>
                      </TechIcon>
                      <TechIcon name="Three.js">
                          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-foreground"><title>Three.js</title><path fill="currentColor" d="M12 2L2 7v10l10 5 10-5V7L12 2zm8 13.66l-8 4-8-4V8.34l8-4 8 4v7.32zM11 10.15V8.85l4-2v1.3l-4 2zm-1 2.3v-1.3l-4-2v1.3l4 2zm5 2.3v-1.3l-4-2v1.3l4 2z"/></svg>
                      </TechIcon>
                      <TechIcon name="Figma">
                          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-pink-500"><title>Figma</title><path fill="currentColor" d="M15.333 8.333a2.667 2.667 0 100-5.333 2.667 2.667 0 000 5.333zm-5.333 0a2.667 2.667 0 100-5.333 2.667 2.667 0 000 5.333zm-2.667 2.667a2.667 2.667 0 10-5.333 0 2.667 2.667 0 005.333 0zm5.334 0a2.667 2.667 0 100-5.333 2.667 2.667 0 000 5.333zm2.666 2.667a2.667 2.667 0 100-5.333 2.667 2.667 0 000 5.333z"/></svg>
                      </TechIcon>
                  </div>
              </div>
            </div>
        </div>
    </div>
  </section>
);


export default function Home() {
  const mainRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ['start start', 'end end'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.33], [1, 0.8]);
  const heroOpacity = useTransform(scrollYProgress, [0.25, 0.33], [1, 0]);

  const projectsScale = useTransform(scrollYProgress, [0.3, 0.33, 0.63, 0.66], [0.9, 1, 1, 0.9]);
  const projectsOpacity = useTransform(scrollYProgress, [0.3, 0.33, 0.63, 0.66], [0, 1, 1, 0]);

  const aboutScale = useTransform(scrollYProgress, [0.63, 0.66, 1], [0.9, 1, 1]);
  const aboutOpacity = useTransform(scrollYProgress, [0.63, 0.66, 1], [0, 1, 1]);


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main ref={mainRef} className="relative h-[300vh]">
          {/* Hero Section */}
          <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="h-screen w-full sticky top-0">
            <HeroSection />
          </motion.div>

          {/* Projects Section */}
          <motion.div style={{ scale: projectsScale, opacity: projectsOpacity }} className="h-screen w-full sticky top-0">
             <ProjectsSection />
          </motion.div>
          
          {/* About Section */}
          <motion.div style={{ scale: aboutScale, opacity: aboutOpacity }} className="h-screen w-full sticky top-0">
             <AboutSection />
          </motion.div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
