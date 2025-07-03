import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-headline text-2xl font-bold">AMIRUL</span>
          </Link>
          <nav className="hidden md:flex md:items-center md:gap-8">
            <Link href="/#about" className="text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground">
              About
            </Link>
            <Link href="#projects" className="text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground">
              Customers
            </Link>
            <Link href="/#projects" className="text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground">
              Projects
            </Link>
            <Link href="#contact" className="text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
