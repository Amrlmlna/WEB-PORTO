import { getProjectBySlug, projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WebContainerPreview } from "@/components/webcontainer-preview";

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
          <div className="max-w-4xl mx-auto">
            <Link href="/#projects" className="mb-8 inline-block">
              <Button
                variant="link"
                className="p-0 text-muted-foreground hover:text-foreground"
              >
                ← Back to all projects
              </Button>
            </Link>
            <h1 className="font-headline text-4xl md:text-6xl font-bold">
              {project.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="mt-8 relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                data-ai-hint={project.imageHint}
              />
            </div>

            <article className="mt-12 max-w-none text-foreground/90 leading-relaxed space-y-4">
              <p>{project.longDescription}</p>
            </article>

            {isWebApp && <WebContainerPreview projectTitle={project.title} />}

            <div className="mt-12 flex gap-4">
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
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
