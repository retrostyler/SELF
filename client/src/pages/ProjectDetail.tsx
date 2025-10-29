import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import type { Project } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Users, Target, TrendingUp } from "lucide-react";

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:slug");
  const slug = params?.slug;

  const { data: project, isLoading } = useQuery<Project>({
    queryKey: [`/api/projects/${slug}`],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-display font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/#projects">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const metrics = Array.isArray(project.metrics) ? project.metrics as Array<{label: string; value: string}> : [];

  return (
    <div className="min-h-screen pt-20" data-testid="page-project-detail">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
        <Link href="/#projects">
          <Button variant="ghost" className="gap-2" data-testid="button-back">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative">
        {project.caseStudyHeroImage ? (
          <div className="relative aspect-[21/9] max-h-[500px] overflow-hidden bg-muted">
            <img
              src={project.caseStudyHeroImage}
              alt={project.title}
              className="w-full h-full object-cover"
              data-testid="img-hero"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
        ) : (
          <div className="aspect-[21/9] max-h-[500px] bg-gradient-to-br from-primary/20 to-accent/20" />
        )}
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 -mt-20 relative z-10">
        {/* Title Card */}
        <Card className="p-8 md:p-12 mb-12">
          <div className="flex flex-wrap gap-3 mb-6">
            <Badge className="text-sm">{project.category}</Badge>
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <Badge key={idx} variant="outline">{tech}</Badge>
            ))}
          </div>
          
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-6" data-testid="text-title">
            {project.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-8">
            {project.shortDescription}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            {project.timeline && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {project.timeline}
              </div>
            )}
            {project.teamSize && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {project.teamSize}
              </div>
            )}
            {project.role && (
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                {project.role}
              </div>
            )}
          </div>
        </Card>

        {/* Metrics */}
        {metrics.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {metrics.map((metric, idx) => (
              <Card key={idx} className="p-6 text-center" data-testid={`metric-${idx}`}>
                <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">
                  {metric.label}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Problem Statement */}
        {project.problemStatement && (
          <div className="mb-12">
            <h2 className="font-display font-semibold text-2xl md:text-3xl mb-6 flex items-center gap-3">
              <div className="w-1 h-8 bg-primary rounded-full" />
              The Challenge
            </h2>
            <Card className="p-6 md:p-8 bg-muted/30">
              <p className="text-lg leading-relaxed whitespace-pre-line">
                {project.problemStatement}
              </p>
            </Card>
          </div>
        )}

        {/* Solution */}
        {project.solution && (
          <div className="mb-12">
            <h2 className="font-display font-semibold text-2xl md:text-3xl mb-6 flex items-center gap-3">
              <div className="w-1 h-8 bg-accent rounded-full" />
              The Solution
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed whitespace-pre-line">
                {project.solution}
              </p>
            </div>
          </div>
        )}

        {/* Process */}
        {project.process && (
          <div className="mb-12">
            <h2 className="font-display font-semibold text-2xl md:text-3xl mb-6 flex items-center gap-3">
              <div className="w-1 h-8 bg-primary rounded-full" />
              The Process
            </h2>
            <div className="prose prose-lg max-w-none">
              <div className="text-lg leading-relaxed whitespace-pre-line">
                {project.process}
              </div>
            </div>
          </div>
        )}

        {/* Additional Images */}
        {project.images && project.images.length > 0 && (
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.images.map((image, idx) => (
                <div key={idx} className="rounded-lg overflow-hidden shadow-md">
                  <img
                    src={image}
                    alt={`${project.title} - Image ${idx + 1}`}
                    className="w-full h-full object-cover"
                    data-testid={`img-case-study-${idx}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {project.results && (
          <div className="mb-12">
            <h2 className="font-display font-semibold text-2xl md:text-3xl mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-accent" />
              Results & Impact
            </h2>
            <Card className="p-6 md:p-8 bg-accent/5 border-accent/20">
              <div className="text-lg leading-relaxed whitespace-pre-line">
                {project.results}
              </div>
            </Card>
          </div>
        )}

        {/* Technologies Used */}
        {project.technologies.length > 0 && (
          <div className="mb-12">
            <h2 className="font-display font-semibold text-2xl mb-6">Technologies & Tools</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, idx) => (
                <Badge key={idx} variant="secondary" className="text-sm px-4 py-2">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <Card className="p-8 md:p-12 text-center bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 mb-20">
          <h3 className="font-display font-semibold text-2xl md:text-3xl mb-4">
            Interested in working together?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <Link href="/#contact">
            <Button size="lg" className="px-8">
              Get in Touch
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
