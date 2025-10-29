import { useQuery } from "@tanstack/react-query";
import type { SiteContent, Project, Experience, Skill, Leadership } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Mail, Phone, Linkedin, Github, Twitter, ExternalLink, Calendar, Building2, TrendingUp, Target } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { data: siteContent } = useQuery<SiteContent>({
    queryKey: ["/api/site-content"],
  });

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: experiences = [] } = useQuery<Experience[]>({
    queryKey: ["/api/experiences"],
  });

  const { data: skills = [] } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  const { data: leadership = [] } = useQuery<Leadership[]>({
    queryKey: ["/api/leadership"],
  });

  const featuredProjects = projects.filter(p => p.published && p.featured).slice(0, 6);
  const publishedProjects = projects.filter(p => p.published).slice(0, 6);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : publishedProjects;

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection siteContent={siteContent} />

      {/* About Section */}
      <AboutSection siteContent={siteContent} skillsByCategory={skillsByCategory} />

      {/* Projects Section */}
      <ProjectsSection projects={displayProjects} />

      {/* Experience Section */}
      <ExperienceSection experiences={experiences.filter(e => e.published)} />

      {/* Leadership Section */}
      <LeadershipSection leadership={leadership.filter(l => l.published)} />

      {/* Contact Section */}
      <ContactSection siteContent={siteContent} />
    </div>
  );
}

function HeroSection({ siteContent }: { siteContent?: SiteContent }) {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20" id="hero" data-testid="section-hero">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight" data-testid="text-hero-title">
                {siteContent?.heroTitle || "Arham Aqeel"}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                {siteContent?.heroSubtitle || "Product Management & Mechanical Engineering"}
              </p>
            </div>

            <p className="text-lg text-foreground/80 leading-relaxed max-w-xl">
              Mechanical engineering student with expertise in product management, digital marketing, and vehicle systems. 
              Passionate about building products that solve real problems and leading cross-functional teams.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 py-4">
              <div>
                <div className="text-3xl font-display font-bold text-primary">AIR-2</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">BAJA SAEINDIA 2024</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-accent">60%</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">Engagement Growth</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-primary">15%</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">Client Retention ↑</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a href="#projects">
                <Button size="lg" className="text-base px-8" data-testid="button-view-work">
                  View My Work
                </Button>
              </a>
              <a href="#contact">
                <Button variant="outline" size="lg" className="text-base px-8" data-testid="button-get-in-touch">
                  Get in Touch
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              {siteContent?.heroImageUrl ? (
                <img
                  src={siteContent.heroImageUrl}
                  alt="Arham Aqeel"
                  className="w-full h-full object-cover"
                  data-testid="img-hero"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="text-6xl font-display font-bold mb-2">AA</div>
                    <div className="text-xl">Arham Aqeel</div>
                  </div>
                </div>
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection({ siteContent, skillsByCategory }: { siteContent?: SiteContent; skillsByCategory: Record<string, Skill[]> }) {
  return (
    <section className="py-20 lg:py-32" id="about" data-testid="section-about">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl mb-4" data-testid="text-about-title">
            About Me
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Profile Image */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 rounded-full overflow-hidden shadow-xl border-4 border-card">
                {siteContent?.aboutImageUrl ? (
                  <img
                    src={siteContent.aboutImageUrl}
                    alt="Arham Aqeel"
                    className="w-full h-full object-cover"
                    data-testid="img-about"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-5xl font-display font-bold">
                    AA
                  </div>
                )}
              </div>
              {/* Quick Stats */}
              <div className="mt-6 space-y-2 text-center">
                {siteContent?.location && (
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{siteContent.location}</span>
                  </div>
                )}
                {siteContent?.availability && (
                  <Badge variant="secondary" className="text-xs">
                    {siteContent.availability}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="lg:col-span-3 space-y-6">
            <div className="prose prose-lg max-w-none" data-testid="text-bio">
              {siteContent?.aboutBio ? (
                <div className="text-foreground/80 leading-relaxed whitespace-pre-line">
                  {siteContent.aboutBio}
                </div>
              ) : (
                <div className="text-foreground/80 leading-relaxed space-y-4">
                  <p>
                    I'm a mechanical engineering undergraduate at NIT Tiruchirappalli with a unique blend of technical expertise and product thinking. 
                    My journey spans from designing award-winning all-terrain vehicles to building predictive analytics dashboards that drive business decisions.
                  </p>
                  <p>
                    Through internships at Blink Digital, Spacecord, and IIT Delhi, I've developed a strong foundation in product management, 
                    digital marketing, and data-driven decision making. I thrive at the intersection of engineering and product strategy.
                  </p>
                  <p>
                    As Brakes Subsystem Lead at PSI Racing and Social Media Lead at TEDxNITTrichy, I've learned the importance of cross-functional 
                    collaboration and user-centric design in bringing complex projects from concept to reality.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        {Object.keys(skillsByCategory).length > 0 && (
          <div className="space-y-8">
            <h3 className="font-display font-semibold text-2xl md:text-3xl text-center" data-testid="text-skills-title">
              Skills & Expertise
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <Card key={category} className="p-6 hover-elevate transition-all" data-testid={`card-skill-category-${category}`}>
                  <h4 className="font-semibold text-lg mb-4 text-foreground">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <Badge key={skill.id} variant="secondary" className="text-xs" data-testid={`badge-skill-${skill.name}`}>
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section className="py-20 lg:py-32 bg-muted/30" id="projects" data-testid="section-projects">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl mb-4" data-testid="text-projects-title">
            Featured Projects
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of my work spanning product management, engineering, and digital marketing
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No projects available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`}>
                <Card className="group overflow-hidden h-full flex flex-col hover-elevate active-elevate-2 transition-all cursor-pointer" data-testid={`card-project-${project.slug}`}>
                  {/* Project Image */}
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    {project.thumbnailUrl ? (
                      <img
                        src={project.thumbnailUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        data-testid={`img-project-${project.slug}`}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <div className="text-4xl font-display font-bold text-muted-foreground/30">
                          {project.title.substring(0, 2).toUpperCase()}
                        </div>
                      </div>
                    )}
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-background/90 backdrop-blur-sm">
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-display font-semibold text-xl mb-2 group-hover:text-primary transition-colors" data-testid={`text-project-title-${project.slug}`}>
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                      {project.shortDescription}
                    </p>

                    {/* Technologies */}
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* View Case Study Link */}
                    <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                      View Case Study <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  return (
    <section className="py-20 lg:py-32" id="experience" data-testid="section-experience">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl mb-4" data-testid="text-experience-title">
            Professional Experience
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
        </div>

        {experiences.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No experience entries available yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <Card key={exp.id} className="p-6 md:p-8 hover-elevate transition-all border-l-4 border-l-primary" data-testid={`card-experience-${idx}`}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-xl md:text-2xl mb-1" data-testid={`text-experience-role-${idx}`}>
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-lg text-primary font-medium">
                      <Building2 className="w-5 h-5" />
                      {exp.company}
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {exp.duration}
                    </div>
                    {exp.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                    )}
                    <Badge variant="secondary" className="text-xs capitalize mt-1">
                      {exp.type}
                    </Badge>
                  </div>
                </div>

                {/* Achievements */}
                {exp.achievements.length > 0 && (
                  <ul className="space-y-2 mt-6">
                    {exp.achievements.map((achievement, achievementIdx) => (
                      <li key={achievementIdx} className="flex gap-3 text-foreground/80">
                        <TrendingUp className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function LeadershipSection({ leadership }: { leadership: Leadership[] }) {
  if (leadership.length === 0) return null;

  return (
    <section className="py-20 lg:py-32 bg-muted/30" id="leadership" data-testid="section-leadership">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl mb-4" data-testid="text-leadership-title">
            Leadership & Initiatives
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {leadership.map((item, idx) => (
            <Card key={item.id} className="p-6 hover-elevate transition-all" data-testid={`card-leadership-${idx}`}>
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-lg mb-1" data-testid={`text-leadership-role-${idx}`}>
                    {item.role}
                  </h3>
                  <div className="text-sm text-muted-foreground">{item.organization}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.duration}</div>
                </div>
              </div>

              {item.description && (
                <p className="text-sm text-foreground/80 mb-4">{item.description}</p>
              )}

              {item.contributions.length > 0 && (
                <ul className="space-y-2">
                  {item.contributions.map((contribution, contribIdx) => (
                    <li key={contribIdx} className="text-sm text-foreground/70 flex gap-2">
                      <span className="text-primary">•</span>
                      <span>{contribution}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({ siteContent }: { siteContent?: SiteContent }) {
  const { toast } = useToast();
  
  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to send message",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    mutation.mutate(data);
  };

  return (
    <section className="py-20 lg:py-32" id="contact" data-testid="section-contact">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl mb-4" data-testid="text-contact-title">
            Get In Touch
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
              <div className="space-y-4">
                {siteContent?.email && (
                  <a
                    href={`mailto:${siteContent.email}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover-elevate active-elevate-2 transition-all"
                    data-testid="link-email"
                  >
                    <div className="p-2 rounded-md bg-primary/10">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Email</div>
                      <div className="font-medium">{siteContent.email}</div>
                    </div>
                  </a>
                )}
                {siteContent?.phone && (
                  <a
                    href={`tel:${siteContent.phone}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover-elevate active-elevate-2 transition-all"
                    data-testid="link-phone"
                  >
                    <div className="p-2 rounded-md bg-primary/10">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Phone</div>
                      <div className="font-medium">{siteContent.phone}</div>
                    </div>
                  </a>
                )}
                {siteContent?.location && (
                  <div className="flex items-center gap-3 p-3">
                    <div className="p-2 rounded-md bg-primary/10">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Location</div>
                      <div className="font-medium">{siteContent.location}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Connect</h3>
              <div className="flex flex-wrap gap-3">
                {siteContent?.linkedin && (
                  <a
                    href={siteContent.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-card hover-elevate active-elevate-2 transition-all"
                    data-testid="link-linkedin"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                )}
                {siteContent?.github && (
                  <a
                    href={siteContent.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-card hover-elevate active-elevate-2 transition-all"
                    data-testid="link-github"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                )}
                {siteContent?.twitter && (
                  <a
                    href={siteContent.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-card hover-elevate active-elevate-2 transition-all"
                    data-testid="link-twitter"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Card className="p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            {...field}
                            data-testid="input-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            {...field}
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="What's this about?"
                            {...field}
                            value={field.value || ""}
                            data-testid="input-subject"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me about your project or idea..."
                            className="min-h-[150px] resize-none"
                            {...field}
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={mutation.isPending}
                    data-testid="button-submit-contact"
                  >
                    {mutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
