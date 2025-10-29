import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Briefcase, User, Mail, FolderKanban, Award } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "#about", label: "About", icon: User },
  { href: "#projects", label: "Projects", icon: FolderKanban },
  { href: "#experience", label: "Experience", icon: Briefcase },
  { href: "#leadership", label: "Leadership", icon: Award },
  { href: "#contact", label: "Contact", icon: Mail },
];

export function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Only show nav on home page (public portfolio)
  if (location !== "/") return null;

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-lg shadow-sm border-b" : "bg-transparent"
      }`}
      data-testid="navigation"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setIsMobileMenuOpen(false);
            }}
            className="font-display font-bold text-2xl tracking-tight hover-elevate active-elevate-2 transition-transform duration-200"
            data-testid="link-logo"
          >
            <span className="text-foreground">Arham</span>
            <span className="text-primary ml-1">Aqeel</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="px-4 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover-elevate active-elevate-2 transition-colors"
                data-testid={`link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
            <Link href="/admin">
              <Button
                variant="ghost"
                size="sm"
                className="ml-2"
                data-testid="button-admin"
              >
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover-elevate active-elevate-2"
            data-testid="button-mobile-menu"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium hover-elevate active-elevate-2"
                  data-testid={`link-mobile-${link.label.toLowerCase()}`}
                >
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  {link.label}
                </a>
              );
            })}
            <Link href="/admin">
              <button
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium hover-elevate active-elevate-2"
                data-testid="button-mobile-admin"
              >
                Admin
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
