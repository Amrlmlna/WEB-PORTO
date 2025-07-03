import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer id="contact" className="w-full py-12 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="font-headline text-3xl font-bold">Get In Touch</h3>
        <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
          I'm currently available for freelance work and open to discussing new projects. Feel free to reach out.
        </p>
        <a href="mailto:contact@example.com" className="mt-6 inline-block text-accent font-medium text-lg hover:underline">
          contact@example.com
        </a>
        <div className="mt-8 flex justify-center gap-6">
          <Link href="#" target="_blank" rel="noopener noreferrer">
            <Github className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
          </Link>
          <Link href="#" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
          </Link>
          <Link href="#" target="_blank" rel="noopener noreferrer">
            <Twitter className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
          </Link>
        </div>
        <div className="mt-12 border-t border-border/50 pt-8 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} VisioFolio 3D. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
