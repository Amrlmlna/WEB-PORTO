"use client";

import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import ThreeCanvas from "@/components/three-canvas";
import { Button } from "@/components/ui/button";
import { Award, Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";
import { ParallaxProjects } from "@/components/parallax-projects";
import LanyardCanvas from "@/components/lanyard-canvas";
import { Chatbot } from "@/components/chatbot";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useInView,
} from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { AskAiTooltip } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ProjectAiChatModal } from "@/components/project-ai-chat-modal";

const timelineEvents = [
  {
    type: "certification",
    year: "2025",
    title: "CompTIA Cloud Essentials+: Essential Cloud Principles Course",
    description:
      "Successfully completed all course material in the CompTIA Cloud Essentials+: Essential Cloud Principles Course, awarded by Codecademy.",
    certificateImage: "/serti1.png", // ubah sesuai path yang Anda gunakan
    imageHint:
      "certificate design from Codecademy with course title and completion info",
    longDescription:
      'This certification, titled "CompTIA Cloud Essentials+: Essential Cloud Principles Course", represents the successful completion of an in-depth foundational course on cloud computing concepts, delivery models, and practical implementations. The course, delivered via Codecademy and instructed by seasoned architect Niranjan Pandey, is designed to equip learners with the knowledge required to understand and navigate the essential principles of cloud computing, while simultaneously preparing them for the CompTIA Cloud Essentials+ (CLO-002) certification exam.\n\nThroughout the course, I was introduced to the fundamentals of cloud technology and its real-world applications across major providers such as AWS and Azure. I gained a clear understanding of how cloud computing enables convenient, on-demand access to a shared pool of configurable computing resources, and how it compares to traditional in-house computing infrastructures in terms of scalability, cost-efficiency, and agility.\n\nThe curriculum covered a variety of prominent computing models including IaaS (Infrastructure as a Service), PaaS (Platform as a Service), and SaaS (Software as a Service), exploring the critical differences and use-case scenarios for each. I learned how to evaluate and select the appropriate service delivery model depending on organizational needs, technical requirements, and security considerations.\n\nKey learning areas included:\n- Disadvantages of In-House Computing: Such as limited scalability, high upfront cost, and maintenance burdens, which contrast with the elastic and cost-effective nature of cloud platforms.\n- Cloud Infrastructure Components: Core elements like compute, storage, network, and virtualization that form the basis of a robust cloud architecture.\n- Virtualization and Shared Resource Pooling: Understanding how virtualization supports multi-tenancy and efficient resource allocation in cloud environments.\n- Lifecycle of Cloud Applications: From development to deployment ("go live"), and the operational practices needed to manage application performance and availability in the cloud.\n- Shared Responsibility Model: A vendor-agnostic approach to security and availability that defines the division of responsibilities between cloud service providers and customers.\n- PaaS Selection and Setup: Critical evaluation criteria for choosing a platform solution, as well as steps involved in deployment and integration into existing workflows.\n- Hands-on Practice with AWS and Azure: Setting up IaaS and PaaS environments to simulate real-world deployment scenarios.\n\nAdditionally, the course explored the broader implications of cloud computing in modern enterprise settings, emphasizing vendor-neutral concepts that apply across platforms. The practical exercises and applied learning reinforced my understanding of how cloud infrastructure can support modern DevOps practices, data-driven decision-making, and secure deployment pipelines.\n\nThe course instructor, Niranjan Pandey, brought over 20 years of industry experience across roles like Java developer, IBM SOA architect, DevOps engineer, and big data solutions expert. His real-world insights into IT security, cloud strategy, and infrastructure planning enriched the learning experience, offering valuable context for theoretical knowledge.\n\nBy completing this course, I have developed a strong conceptual foundation in cloud computing, enabling me to contribute effectively in environments that leverage AWS, Azure, or other cloud platforms. This certification marks not only my theoretical understanding but also hands-on capabilities in deploying cloud solutions aligned with business and operational goals.',
  },
  {
    type: "certification",
    year: "2025",
    title: "CompTIA Cloud Essentials+: Essential Cloud Networking Course",
    description:
      "Successfully completed all course material in the CompTIA Cloud Essentials+: Essential Cloud Networking Course, awarded by Codecademy.",
    certificateImage: "/serti2.png", // ubah sesuai path Anda
    imageHint:
      "certificate design from Codecademy with cloud networking course title and completion info",
    longDescription:
      'This certification, titled "CompTIA Cloud Essentials+: Essential Cloud Networking Course", certifies the successful completion of an intensive training in cloud networking fundamentals as part of the broader CompTIA Cloud Essentials+ (CLO-002) learning path. Delivered by Codecademy and designed by expert instructor Niranjan Pandey, this course explores the foundational and advanced principles behind networking in cloud environments and equips learners with the ability to build, manage, and secure network infrastructure in the cloud.\n\nThe course covers the complete process of migrating from a legacy, on-premise infrastructure to a cloud-native model, emphasizing the technical and architectural shifts involved. I gained a strong understanding of how cloud networking enables organizations to transmit information rapidly, reliably, and securely without having to bear the cost and complexity of managing physical networking infrastructure.\n\nKey topics and learning outcomes include:\n- **Migration to Cloud-Based Networking**: Understanding the steps, challenges, and strategies required to transition from traditional datacenter architectures to scalable cloud networks.\n- **Virtual Private Cloud (VPC)**: In-depth exploration of VPCs, including their components, purposes, and the critical technologies used to isolate VPCs from public cloud segments.\n- **CSP Interface Types**: Analysis of the different interfaces provided by Cloud Service Providers (CSPs) to interact with and manage VPCs.\n- **Demilitarized Zones (DMZ)** in the Cloud: Study of how DMZs are configured in cloud environments, their purpose in securing access, and the techniques used to isolate one DMZ from another.\n- **Firewalls and IDS**: Understanding the architecture and deployment of cloud-native firewalls and intrusion detection systems (IDS), along with their use cases and benefits in securing cloud infrastructure.\n- **Virtual Network Interfaces**: Identification of key attributes of virtual NICs, with practical use cases including attaching multiple network interfaces to cloud instances.\n- **VPN Setup on AWS**: Hands-on experience setting up a Virtual Private Network using AWS, including provisioning EC2 instances within VPC subnets.\n- **Software-Defined Networking (SDN)**: A comprehensive look at how SDN functions in cloud environments, how it differs from traditional networking, and its benefits for dynamic resource allocation and automation.\n- **Domain Name System (DNS) in the Cloud**: Examination of DNS architecture and its role in routing cloud traffic to appropriate applications and services based on availability and region.\n\nThe course emphasized vendor-agnostic principles while providing real-world practice with tools and environments from leading providers such as AWS. It not only reinforced the theoretical knowledge of networking in the cloud but also included hands-on labs that allowed me to simulate secure and scalable networking scenarios.\n\nBy completing this course, I have developed a robust understanding of cloud networking strategies, security architecture, and deployment practices. I can confidently contribute to designing and maintaining enterprise-grade cloud networks that align with organizational goals for performance, security, and scalability. This certification is a significant milestone in my journey toward becoming a cloud infrastructure and networking professional.',
  },
  {
    type: "certification",
    year: "2022",
    title: "Certified Three.js Professional",
    description:
      "Mastered advanced 3D graphics, shaders, and optimization techniques in Three.js.",
    media: [
      {
        type: "pdf",
        src: "/Completion_Certificate_SkillsBuild.pdf",
        alt: "Three.js Certificate",
      },
    ],
    longDescription:
      "This certification demonstrates advanced mastery in Three.js, including 3D graphics, custom shaders, performance optimization, and real-world project implementation. The holder has completed rigorous coursework and practical projects, and is recognized for expertise in interactive 3D web development.",
  },
  {
    type: "work",
    year: "2021",
    title: "Interactive Developer at Glitch Works",
    description:
      "Specialized in creating playful and unique web interactions for digital campaigns and art installations.",
  },
  {
    type: "work",
    year: "2020",
    title: "Frontend Developer at Creative Labs",
    description:
      "Developed and maintained responsive user interfaces for various client websites using React and Next.js.",
  },
  {
    type: "education",
    year: "2018",
    title: "B.Sc. in Computer Science",
    description:
      "Graduated with honors, focusing on human-computer interaction and computer graphics.",
  },
  {
    type: "certification",
    year: "2019",
    title: "Interaction Design Specialization",
    description:
      "Completed a comprehensive course on UI/UX principles, prototyping, and user-centered design.",
    media: [
      {
        type: "pdf",
        src: "/Completion_Certificate_SkillsBuild3.pdf",
        alt: "Interaction Design Certificate",
      },
    ],
    longDescription:
      "This specialization covers the full spectrum of interaction design, including user research, wireframing, prototyping, usability testing, and design thinking. The holder has demonstrated proficiency in creating user-centered digital products and applying best practices in UI/UX design.",
  },
];

const skills = [
  { name: "React & Next.js", level: 95 },
  { name: "Three.js & WebGL", level: 90 },
  { name: "UI/UX Design (Figma)", level: 85 },
  { name: "Node.js & Backend", level: 80 },
  { name: "Generative AI & Python", level: 75 },
];

const techStack = [
  {
    name: "React",
    icon: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-cyan-400"
      >
        <title>React</title>
        <path
          fill="currentColor"
          d="M12.03 2.02c-5.513 0-9.98 4.468-9.98 9.98s4.467 9.98 9.98 9.98 9.98-4.468 9.98-9.98-4.467-9.98-9.98-9.98zm0 1.996c4.41 0 7.984 3.574 7.984 7.984s-3.574 7.984-7.984 7.984-7.984-3.574-7.984-7.984 3.574-7.984 7.984-7.984zM12 7.73a4.584 4.584 0 00-4.33 3.23h8.66a4.584 4.584 0 00-4.33-3.23zm0 8.54a4.582 4.582 0 004.33-3.23H7.67a4.582 4.582 0 004.33 3.23zm-4.33-4.27a4.583 4.583 0 000-1.996h8.66a4.583 4.583 0 000 1.996H7.67z"
        />
      </svg>
    ),
  },
  {
    name: "Next.js",
    icon: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 text-foreground"
      >
        <title>Next.js</title>
        <path
          fill="currentColor"
          d="M15.402 16.299l-3.402-5.945v5.945h-2.15V7.701h2.15l3.402 5.945V7.701h2.15v8.598zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-8C7.589 4 4 7.589 4 12s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8z"
        />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    icon: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-blue-500"
      >
        <title>TypeScript</title>
        <path
          fill="currentColor"
          d="M1.5 0h21l-1.91 21.563L11.75 24l-8.36-2.438L1.5 0zm17.58 9.22l.22-2.5-12.23.23.16 1.77 3.5.06.17 1.95-3.3.04.16 1.83 3.1.05.17 1.9-3.04.03.16 1.83h8.66l.22-2.41h-3.32l-.12-1.3h3.44zm-7.9-5.11l.16-1.83h12.1l.22 2.5h-12.48z"
        />
      </svg>
    ),
  },
  {
    name: "Tailwind",
    icon: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 text-cyan-500"
      >
        <title>Tailwind CSS</title>
        <path
          fill="currentColor"
          d="M12.001 4.8c-3.97 0-7.2 3.23-7.2 7.2s3.23 7.2 7.2 7.2 7.2-3.23 7.2-7.2-3.23-7.2-7.2-7.2zm0 12.6c-2.97 0-5.4-2.43-5.4-5.4s2.43-5.4 5.4-5.4 5.4 2.43 5.4 5.4-2.43 5.4-5.4 5.4zm-4.5-5.4c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5-2.015 4.5-4.5-2.015-4.5-4.5z"
        />
      </svg>
    ),
  },
  {
    name: "Node.js",
    icon: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-green-500"
      >
        <title>Node.js</title>
        <path
          fill="currentColor"
          d="M11.99 2.002c-1.39 0-2.779.31-3.999 1.02v17.956c1.22.61 2.609.92 3.999.92 1.39 0 2.779-.31 3.999-.92V3.022c-1.22-.71-2.609-1.02-3.999-1.02zM12 3.422a8.6 8.6 0 013.499.8V19.78a8.6 8.6 0 01-3.5-.8V3.422zM4.001 7.262v9.475a8.55 8.55 0 013.499 1.94V5.322a8.55 8.55 0 01-3.5-1.94v3.88zM16.5 5.322v13.83a8.55 8.55 0 013.5-1.94V9.202a8.55 8.55 0 01-3.5-3.88z"
        />
      </svg>
    ),
  },
  {
    name: "Firebase",
    icon: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-amber-500"
      >
        <title>Firebase</title>
        <path
          fill="currentColor"
          d="M3.243 16.329l7.06-12.228a1.21 1.21 0 012.098 0l2.36 4.088-3.414 5.913-4.99-2.88L3.243 16.33zm14.802-1.996l-3.37-5.837-6.023 3.477 4.965 8.6a1.21 1.21 0 002.09-.012l2.338-4.045a1.21 1.21 0 00-.002-1.183zM10.3 21.65l-6.24-10.81a1.21 1.21 0 00-1.049-.61H2.4a1.21 1.21 0 00-1.049 1.815l8.134 14.087a1.21 1.21 0 002.098 0l.717-1.232-2.05-3.55z"
        />
      </svg>
    ),
  },
  {
    name: "Three.js",
    icon: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-foreground"
      >
        <title>Three.js</title>
        <path
          fill="currentColor"
          d="M12 2L2 7v10l10 5 10-5V7L12 2zm8 13.66l-8 4-8-4V8.34l8-4 8 4v7.32zM11 10.15V8.85l4-2v1.3l-4 2zm-1 2.3v-1.3l-4-2v1.3l4 2zm5 2.3v-1.3l-4-2v1.3l4 2z"
        />
      </svg>
    ),
  },
  {
    name: "Figma",
    icon: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-pink-500"
      >
        <title>Figma</title>
        <path
          fill="currentColor"
          d="M15.333 8.333a2.667 2.667 0 100-5.333 2.667 2.667 0 000 5.333zm-5.333 0a2.667 2.667 0 100-5.333 2.667 2.667 0 000 5.333zm-2.667 2.667a2.667 2.667 0 10-5.333 0 2.667 2.667 0 005.333 0zm5.334 0a2.667 2.667 0 100-5.333 2.667 2.667 0 000 5.333zm2.666 2.667a2.667 2.667 0 100-5.333 2.667 2.667 0 000 5.333z"
        />
      </svg>
    ),
  },
];

const TechIcon = ({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) => (
  <motion.div
    className="flex flex-col items-center justify-center text-center gap-2 p-4 bg-secondary/30 rounded-lg transition-all duration-300 hover:bg-secondary/60 hover:scale-105 shadow-white/30"
    whileHover={{ scale: 1.12, boxShadow: "0 0 24px 4px #fff" }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 300, damping: 18 }}
  >
    <motion.div
      className="flex items-center justify-center w-12 h-12"
      whileHover={{ rotate: 12, scale: 1.18 }}
      whileTap={{ rotate: -8, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
    >
      {children}
    </motion.div>
    <motion.span
      className="text-sm font-medium text-muted-foreground"
      whileHover={{ color: "#fff", scale: 1.08 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {name}
    </motion.span>
  </motion.div>
);

function TimelineEvent({
  event,
  index,
  total,
  scrollYProgress,
  hoverIndex,
  setHoverIndex,
}: {
  event: any;
  index: number;
  total: number;
  scrollYProgress: any;
  hoverIndex: number | null;
  setHoverIndex: (i: number | null) => void;
}) {
  const [isActive, setIsActive] = useState(false);
  const isHovered = hoverIndex === index;
  const [modalOpen, setModalOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);

  const itemProgress = useTransform(scrollYProgress, (v: number) => {
    const start = index / total;
    return v > start + 0.001;
  });

  useMotionValueEvent(itemProgress, "change", (latest) => {
    setIsActive(latest);
  });

  // Icon style
  const iconBg = isHovered
    ? "bg-white shadow-[0_0_12px_2px_rgba(255,255,255,0.7)]"
    : "bg-black";
  const iconColor = isHovered ? "#000" : "#fff";

  // Icon component with color
  const getIcon = (type: string) => {
    switch (type) {
      case "work":
        return <Briefcase className="h-4 w-4" color={iconColor} />;
      case "certification":
        return <Award className="h-4 w-4" color={iconColor} />;
      case "education":
        return <GraduationCap className="h-4 w-4" color={iconColor} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="relative mb-12 pl-12 group"
      onMouseEnter={() => setHoverIndex(index)}
      onMouseLeave={() => setHoverIndex(null)}
    >
      <div className="flex items-center mb-1">
        <motion.div
          className={cn(
            iconBg,
            "ring-background rounded-full h-8 w-8 text-sm font-bold flex items-center justify-center absolute left-0 top-4 -translate-x-1/2 transform ring-4 border border-white transition-all duration-300"
          )}
          animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {getIcon(event.type)}
        </motion.div>
        <h4 className="font-bold text-lg">{event.title}</h4>
        <time className="ml-auto text-sm font-semibold text-muted-foreground">
          {event.year}
        </time>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {event.description}
      </p>
      {event.type === "certification" && (
        <>
          <button
            className="mt-2 px-4 py-1 rounded bg-black text-white hover:bg-white hover:text-black border border-white font-medium transition mr-2"
            onClick={() => setCertModalOpen(true)}
          >
            Inspect Certificate
          </button>
          <button
            className="mt-2 px-4 py-1 rounded bg-black text-white hover:bg-white hover:text-black border border-white font-medium transition mr-2"
            onClick={() => setModalOpen(true)}
          >
            Ask AI
          </button>
          <Dialog open={certModalOpen} onOpenChange={setCertModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{event.title}</DialogTitle>
                <DialogDescription>{event.description}</DialogDescription>
              </DialogHeader>
              {event.media && event.media[0]?.type === "pdf" ? (
                <div className="w-full flex flex-col items-center">
                  <iframe
                    src={event.media[0].src}
                    title={event.media[0].alt || event.title}
                    className="w-full h-[500px] rounded border shadow mb-4"
                    style={{ minHeight: 400 }}
                  />
                  <a
                    href={event.media[0].src}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2 rounded-full border-2 border-black text-black font-bold bg-white hover:bg-black hover:text-white transition-all duration-300"
                  >
                    Download PDF
                  </a>
                </div>
              ) : event.certificateImage ? (
                <img
                  src={event.certificateImage}
                  alt={event.title}
                  className="w-full rounded mb-4"
                />
              ) : null}
            </DialogContent>
          </Dialog>
          <ProjectAiChatModal
            project={{
              slug: event.title.replace(/\s+/g, "-").toLowerCase(),
              title: event.title,
              image:
                event.media && event.media[0]?.type === "pdf"
                  ? "/pdf-icon.png"
                  : event.certificateImage || "/serti1.png",
              description: event.description,
              longDescription: event.longDescription,
            }}
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            initialPrompt={`Jelaskan tentang sertifikat ${event.title} dari ${event.year}.`}
          />
        </>
      )}
      {event.type !== "certification" && (
        <>
          <button
            className="mt-2 px-4 py-1 rounded bg-black text-white hover:bg-white hover:text-black border border-white font-medium transition mr-2"
            onClick={() => setModalOpen(true)}
          >
            Ask AI
          </button>
          <ProjectAiChatModal
            project={{
              slug: event.title.replace(/\s+/g, "-").toLowerCase(),
              title: event.title,
              image:
                event.certificateImage || "https://placehold.co/400x300.png",
              description: event.description,
              longDescription: event.description + " (dummy context about me)",
            }}
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            initialPrompt={`Jelaskan tentang pengalaman ${event.title} pada tahun ${event.year}.`}
          />
        </>
      )}
    </div>
  );
}

function InteractiveTimelineSection({ events }: { events: any[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
  });
  const progressLineHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  // Auto-scroll logic
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const isAboutInView = useInView(aboutSectionRef, {
    margin: "-20% 0px -20% 0px",
  });
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false);
  useEffect(() => {
    if (isAboutInView && !hasAutoScrolled && scrollContainerRef.current) {
      setHasAutoScrolled(true);
      const el = scrollContainerRef.current as HTMLDivElement;
      // Scroll to bottom
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      // Scroll back to top after delay
      setTimeout(() => {
        el.scrollTo({ top: 0, behavior: "smooth" });
      }, 1200);
    }
  }, [isAboutInView, hasAutoScrolled]);

  return (
    <div ref={aboutSectionRef}>
      <h3 className="font-headline text-2xl font-semibold mb-8">My Journey</h3>
      <div className="relative h-[450px]">
        <ScrollArea className="h-full" ref={scrollContainerRef}>
          <div className="relative ml-4 mr-8 py-24">
            {/* Garis progress segmented */}
            <div className="absolute left-[-2px] top-0 w-0.5 h-full z-10 flex flex-col">
              {events.map((event, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex-1 transition-all duration-300",
                    hoverIndex !== null && idx <= hoverIndex
                      ? "bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.7)]"
                      : "bg-border/50"
                  )}
                />
              ))}
            </div>
            {events.map((event, index) => (
              <TimelineEvent
                key={index}
                event={event}
                index={index}
                total={events.length}
                scrollYProgress={scrollYProgress}
                hoverIndex={hoverIndex}
                setHoverIndex={setHoverIndex}
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
      <motion.div
        className="space-y-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            className="group"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="flex justify-between items-center mb-1">
              <motion.p
                className="font-medium text-foreground/90"
                whileHover={{ scale: 1.08, color: "#fff" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {skill.name}
              </motion.p>
              <p className="text-sm font-mono text-muted-foreground">
                {skill.level}%
              </p>
            </div>
            <Progress value={skill.level} glow className="h-2" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

const HeroSection = ({
  lanyardKey,
  sectionRef,
}: {
  lanyardKey: number;
  sectionRef: React.RefObject<HTMLElement>;
}) => (
  <section
    ref={sectionRef}
    className="relative h-screen w-full flex items-center justify-center overflow-hidden"
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-center justify-items-center">
        <div className="relative z-10 col-start-1 row-start-1 flex flex-col items-center text-center pointer-events-none">
          <h1 className="font-headline text-[15vw] md:text-[18vw] lg:text-[20vw] font-black tracking-tighter text-foreground/90 leading-none">
            HI, I'M
            <br />
            AMIRUL
          </h1>
          <p className="mt-4 text-lg text-muted-foreground font-light tracking-wide">
            Building digital experiences with code & creativity
          </p>
        </div>
        <div className="relative z-30 col-start-1 row-start-1 w-full flex justify-between items-end">
          <div className="text-left pointer-events-auto"></div>
          <div className="pointer-events-auto">
            <Link href="#contact" passHref>
              <Button
                size="lg"
                className="font-bold text-base bg-black text-white hover:bg-white hover:text-black hover:shadow-[0_0_12px_2px_rgba(255,255,255,0.7)] transition-all duration-300 transform hover:scale-105 rounded-full border border-white"
              >
                CONTACT ME
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 z-20 flex items-center justify-start pointer-events-none pl-12">
          <div className="relative h-[80vh] w-[80vh] max-w-[400px]">
            <LanyardCanvas key={lanyardKey} />
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-40 pointer-events-none">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-6 h-6 border-b-2 border-r-2 border-white rotate-45 opacity-60"
          />
          <span className="text-xs text-muted-foreground mt-2">Scroll</span>
        </div>
      </div>
    </div>
  </section>
);

const ProjectsSection = () => <ParallaxProjects />;

const AboutSection = () => (
  <section
    id="about"
    className="h-full w-full flex items-center justify-center py-20 md:py-32 bg-background"
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="font-headline text-4xl md:text-5xl font-bold">
          About Me
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          I'm a passionate developer and designer with a love for creating
          beautiful, interactive, and user-friendly digital experiences. My
          journey in tech is driven by curiosity and a desire to solve complex
          problems with elegant solutions.
        </p>
      </div>
      <div className="grid md:grid-cols-5 gap-16 items-start">
        <div className="md:col-span-3 space-y-12">
          <InteractiveTimelineSection events={timelineEvents} />
          <SkillsSection />
          <div>
            <h3 className="font-headline text-2xl font-semibold mb-6">
              Technologies I Use
            </h3>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } },
              }}
            >
              {techStack.map((tech) => (
                <TechIcon key={tech.name} name={tech.name}>
                  {tech.icon}
                </TechIcon>
              ))}
            </motion.div>
          </div>
        </div>
        <div className="md:col-span-2 relative h-[400px] w-full md:h-full md:min-h-[600px]">
          <LanyardCanvas />
        </div>
      </div>
    </div>
  </section>
);

export default function Home() {
  const scrollRef = useRef(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const [lanyardKey, setLanyardKey] = useState(Date.now());

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  // Section 1: Hero (0 -> 0.5)
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const heroOpacity = useTransform(scrollYProgress, [0.45, 0.5], [1, 0]);

  // Section 2: Projects (0.5 -> 1.0)
  const projectsScale = useTransform(scrollYProgress, [0.5, 1.0], [0.8, 1]);
  const projectsOpacity = useTransform(scrollYProgress, [0.45, 0.5], [0, 1]);

  // InView logic for HeroSection
  const isHeroInView = useInView(heroSectionRef, {
    margin: "-20% 0px -20% 0px",
  });
  useEffect(() => {
    if (isHeroInView) {
      setLanyardKey(Date.now()); // update key to force remount
    }
  }, [isHeroInView]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main>
        <div ref={scrollRef} className="relative h-[200vh]">
          <motion.div
            style={{ scale: heroScale, opacity: heroOpacity }}
            className="h-screen w-full sticky top-0"
          >
            <HeroSection lanyardKey={lanyardKey} sectionRef={heroSectionRef} />
          </motion.div>
          <div className="w-full">
            <ProjectsSection />
          </div>
        </div>
        <AboutSection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
