import { getProjectBySlug, projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProjectDetailClient } from "./ProjectDetailClient";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const isWebApp = project.tags.some((tag) =>
    ["React", "Next.js", "Svelte", "A-Frame", "Three.js"].includes(tag)
  );

  return (
    <>
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <ProjectDetailClient project={project} isWebApp={isWebApp} />
        </div>
      </main>
      <Footer />
    </>
  );
}
