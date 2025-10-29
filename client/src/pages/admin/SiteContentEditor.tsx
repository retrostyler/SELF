import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { SiteContent, InsertSiteContent } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSiteContentSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "wouter";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function SiteContentEditor() {
  const { toast } = useToast();

  const { data: siteContent, isLoading } = useQuery<SiteContent>({
    queryKey: ["/api/site-content"],
  });

  const form = useForm<InsertSiteContent>({
    resolver: zodResolver(insertSiteContentSchema),
    values: siteContent || {
      heroTitle: "",
      heroSubtitle: "",
      heroImageUrl: "",
      aboutBio: "",
      aboutImageUrl: "",
      location: "",
      availability: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
      portfolio: "",
      twitter: "",
      resumeUrl: "",
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<InsertSiteContent>) => {
      await apiRequest("PUT", "/api/admin/site-content", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/site-content"] });
      toast({ title: "Site content updated successfully" });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({ title: "Unauthorized", description: "Redirecting to login...", variant: "destructive" });
        setTimeout(() => { window.location.href = "/api/login"; }, 500);
        return;
      }
      toast({ title: "Failed to update content", description: error.message, variant: "destructive" });
    },
  });

  const onSubmit = (data: InsertSiteContent) => {
    updateMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 pt-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <Link href="/admin">
          <Button variant="ghost" className="mb-4" data-testid="button-back">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="font-display font-bold text-4xl mb-2">Site Content & Bio</h1>
          <p className="text-muted-foreground">Update your personal information, bio, and contact details</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className="p-6">
              <h2 className="font-display font-semibold text-2xl mb-4">Hero Section</h2>
              <div className="space-y-4">
                <FormField control={form.control} name="heroTitle" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hero Title</FormLabel>
                    <FormControl><Input {...field} value={field.value || ""} data-testid="input-hero-title" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="heroSubtitle" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hero Subtitle</FormLabel>
                    <FormControl><Input {...field} value={field.value || ""} data-testid="input-hero-subtitle" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="heroImageUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hero Image URL</FormLabel>
                    <FormControl><Input {...field} value={field.value || ""} placeholder="https://example.com/image.jpg" data-testid="input-hero-image" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="font-display font-semibold text-2xl mb-4">About Section</h2>
              <div className="space-y-4">
                <FormField control={form.control} name="aboutBio" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biography</FormLabel>
                    <FormControl><Textarea {...field} value={field.value || ""} rows={8} data-testid="input-bio" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="aboutImageUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>About Image URL</FormLabel>
                    <FormControl><Input {...field} value={field.value || ""} placeholder="https://example.com/profile.jpg" data-testid="input-about-image" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="location" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl><Input {...field} value={field.value || ""} placeholder="City, Country" data-testid="input-location" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="availability" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Availability</FormLabel>
                      <FormControl><Input {...field} value={field.value || ""} placeholder="Open to opportunities" data-testid="input-availability" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="font-display font-semibold text-2xl mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input {...field} value={field.value || ""} type="email" data-testid="input-email" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl><Input {...field} value={field.value || ""} data-testid="input-phone" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="linkedin" render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn URL</FormLabel>
                    <FormControl><Input {...field} value={field.value || ""} placeholder="https://linkedin.com/in/..." data-testid="input-linkedin" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="github" render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub URL</FormLabel>
                    <FormControl><Input {...field} value={field.value || ""} placeholder="https://github.com/..." data-testid="input-github" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="twitter" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter URL</FormLabel>
                    <FormControl><Input {...field} value={field.value || ""} placeholder="https://twitter.com/..." data-testid="input-twitter" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="resumeUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resume PDF URL</FormLabel>
                    <FormControl><Input {...field} value={field.value || ""} placeholder="https://example.com/resume.pdf" data-testid="input-resume" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </Card>

            <Button type="submit" size="lg" className="w-full" disabled={updateMutation.isPending} data-testid="button-save">
              <Save className="w-4 h-4 mr-2" />
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
