import { Github, Linkedin, Mail, Twitter, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { SiteContent } from "@shared/schema";

export function Footer() {
  const { data: siteContent } = useQuery<SiteContent>({
    queryKey: ["/api/site-content"],
  });

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Mail, href: siteContent?.email ? `mailto:${siteContent.email}` : "#", label: "Email", show: !!siteContent?.email },
    { icon: Linkedin, href: siteContent?.linkedin || "#", label: "LinkedIn", show: !!siteContent?.linkedin },
    { icon: Github, href: siteContent?.github || "#", label: "GitHub", show: !!siteContent?.github },
    { icon: Twitter, href: siteContent?.twitter || "#", label: "Twitter", show: !!siteContent?.twitter },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground py-12 mt-24" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Branding */}
          <div>
            <h3 className="font-display font-bold text-2xl mb-3">
              Arham <span className="text-primary">Aqeel</span>
            </h3>
            <p className="text-secondary-foreground/80 text-sm">
              {siteContent?.heroSubtitle || "Product Management & Mechanical Engineering"}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {["About", "Projects", "Experience", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
                  data-testid={`link-footer-${link.toLowerCase()}`}
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Social & Resume */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Connect</h4>
            <div className="flex flex-wrap gap-3 mb-4">
              {socialLinks.filter(link => link.show).map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="p-2 rounded-md bg-secondary-foreground/10 hover-elevate active-elevate-2 transition-all"
                    aria-label={link.label}
                    data-testid={`link-social-${link.label.toLowerCase()}`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
            {siteContent?.resumeUrl && (
              <a
                href={siteContent.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
                data-testid="link-resume"
              >
                <FileText className="w-4 h-4" />
                Download Resume
              </a>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-secondary-foreground/10 text-center text-sm text-secondary-foreground/60">
          <p>© {currentYear} Arham Aqeel. Built with React, TypeScript, and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
