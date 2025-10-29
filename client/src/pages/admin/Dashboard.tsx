import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderKanban, Briefcase, Award, User, Mail, Settings, LogOut } from "lucide-react";

export default function AdminDashboard() {
  const sections = [
    {
      title: "Projects",
      description: "Manage portfolio projects and case studies",
      icon: FolderKanban,
      href: "/admin/projects",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Experience",
      description: "Update professional work experience",
      icon: Briefcase,
      href: "/admin/experience",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Skills",
      description: "Edit skills and expertise categories",
      icon: Award,
      href: "/admin/skills",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Leadership",
      description: "Manage leadership roles and initiatives",
      icon: Award,
      href: "/admin/leadership",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "About & Bio",
      description: "Update site content and bio information",
      icon: User,
      href: "/admin/about",
      color: "from-indigo-500 to-purple-500",
    },
    {
      title: "Contact Messages",
      description: "View and manage contact form submissions",
      icon: Mail,
      href: "/admin/contacts",
      color: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30 pt-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-3" data-testid="text-admin-title">
              Content Management
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage your portfolio content and settings
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/">
              <Button variant="outline" data-testid="button-view-site">
                View Site
              </Button>
            </Link>
            <Button variant="ghost" onClick={() => window.location.href = "/api/logout"} data-testid="button-logout">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Grid of Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link key={section.href} href={section.href}>
                <Card className="group p-6 h-full hover-elevate active-elevate-2 transition-all cursor-pointer" data-testid={`card-${section.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="flex flex-col h-full">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-display font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Quick Stats */}
        <Card className="mt-12 p-8">
          <h2 className="font-display font-semibold text-2xl mb-6">Portfolio Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold text-primary">-</div>
              <div className="text-sm text-muted-foreground">Total Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">-</div>
              <div className="text-sm text-muted-foreground">Experience Entries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">-</div>
              <div className="text-sm text-muted-foreground">Skills Listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">-</div>
              <div className="text-sm text-muted-foreground">Leadership Roles</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
