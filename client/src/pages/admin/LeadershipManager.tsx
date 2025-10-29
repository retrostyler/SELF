import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Leadership, InsertLeadership } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadershipSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function LeadershipManager() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLeadership, setEditingLeadership] = useState<Leadership | null>(null);

  const { data: leadership = [], isLoading } = useQuery<Leadership[]>({
    queryKey: ["/api/leadership"],
  });

  const form = useForm<InsertLeadership>({
    resolver: zodResolver(insertLeadershipSchema),
    defaultValues: {
      organization: "",
      role: "",
      duration: "",
      description: "",
      contributions: [],
      published: true,
      displayOrder: 0,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertLeadership) => {
      await apiRequest("POST", "/api/admin/leadership", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leadership"] });
      toast({ title: "Leadership role created successfully" });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({ title: "Unauthorized", description: "Redirecting to login...", variant: "destructive" });
        setTimeout(() => { window.location.href = "/api/login"; }, 500);
        return;
      }
      toast({ title: "Failed to create leadership role", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertLeadership> }) => {
      await apiRequest("PUT", `/api/admin/leadership/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leadership"] });
      toast({ title: "Leadership role updated successfully" });
      setIsDialogOpen(false);
      setEditingLeadership(null);
      form.reset();
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({ title: "Unauthorized", description: "Redirecting to login...", variant: "destructive" });
        setTimeout(() => { window.location.href = "/api/login"; }, 500);
        return;
      }
      toast({ title: "Failed to update leadership role", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/leadership/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leadership"] });
      toast({ title: "Leadership role deleted successfully" });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({ title: "Unauthorized", description: "Redirecting to login...", variant: "destructive" });
        setTimeout(() => { window.location.href = "/api/login"; }, 500);
        return;
      }
      toast({ title: "Failed to delete leadership role", description: error.message, variant: "destructive" });
    },
  });

  const onSubmit = (data: InsertLeadership) => {
    const contributionsArray = typeof data.contributions === 'string'
      ? (data.contributions as string).split('\n').map(c => c.trim()).filter(Boolean)
      : data.contributions;

    const leadershipData = { ...data, contributions: contributionsArray };

    if (editingLeadership) {
      updateMutation.mutate({ id: editingLeadership.id, data: leadershipData });
    } else {
      createMutation.mutate(leadershipData);
    }
  };

  const handleEdit = (item: Leadership) => {
    setEditingLeadership(item);
    form.reset({
      ...item,
      contributions: item.contributions || [],
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this leadership role?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingLeadership(null);
    form.reset();
  };

  return (
    <div className="min-h-screen bg-muted/30 pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/admin">
              <Button variant="ghost" className="mb-4" data-testid="button-back">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
              </Button>
            </Link>
            <h1 className="font-display font-bold text-4xl">Leadership Management</h1>
            <p className="text-muted-foreground mt-2">Manage leadership roles and extracurricular initiatives</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
              <Button size="lg" data-testid="button-add-leadership">
                <Plus className="w-4 h-4 mr-2" /> Add Leadership Role
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingLeadership ? "Edit Leadership Role" : "Add New Leadership Role"}</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="organization" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization *</FormLabel>
                      <FormControl><Input {...field} data-testid="input-organization" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="role" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role/Position *</FormLabel>
                      <FormControl><Input {...field} data-testid="input-role" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="duration" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration *</FormLabel>
                      <FormControl><Input {...field} placeholder="Jan 2023 - Present" data-testid="input-duration" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl><Textarea {...field} value={field.value || ""} rows={3} data-testid="input-description" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="contributions" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key Contributions (one per line)</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={Array.isArray(field.value) ? field.value.join('\n') : field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          rows={8}
                          placeholder="Led team of 20 members&#10;Organized 5 major events&#10;Increased engagement by 40%"
                          data-testid="input-contributions"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="published" render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-4 border rounded-lg">
                      <FormLabel>Published</FormLabel>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} data-testid="switch-published" />
                      </FormControl>
                    </FormItem>
                  )} />

                  <Button type="submit" className="w-full" disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-submit">
                    {createMutation.isPending || updateMutation.isPending ? "Saving..." : (editingLeadership ? "Update Role" : "Create Role")}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : leadership.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground text-lg mb-4">No leadership roles yet. Add your first role!</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {leadership.map((item) => (
              <Card key={item.id} className="p-6" data-testid={`card-leadership-${item.id}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display font-semibold text-xl">{item.role}</h3>
                      <Badge variant={item.published ? "default" : "secondary"}>{item.published ? "Published" : "Draft"}</Badge>
                    </div>
                    <p className="text-lg text-muted-foreground">{item.organization}</p>
                    <p className="text-sm text-muted-foreground mt-1">{item.duration}</p>
                    {item.description && <p className="text-sm mt-2">{item.description}</p>}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(item)} data-testid="button-edit">
                      <Edit className="w-3 h-3 mr-1" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)} data-testid="button-delete">
                      <Trash2 className="w-3 h-3 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
                {item.contributions.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {item.contributions.slice(0, 3).map((contribution, idx) => (
                      <li key={idx}>{contribution}</li>
                    ))}
                    {item.contributions.length > 3 && (
                      <li className="text-primary">...and {item.contributions.length - 3} more</li>
                    )}
                  </ul>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
