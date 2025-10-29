import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ProjectDetail from "@/pages/ProjectDetail";
import AdminDashboard from "@/pages/admin/Dashboard";
import ProjectsManager from "@/pages/admin/ProjectsManager";
import ExperienceManager from "@/pages/admin/ExperienceManager";
import SkillsManager from "@/pages/admin/SkillsManager";
import LeadershipManager from "@/pages/admin/LeadershipManager";
import SiteContentEditor from "@/pages/admin/SiteContentEditor";
import ContactsViewer from "@/pages/admin/ContactsViewer";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// Admin pages will be protected
function ProtectedRoute({ component: Component }: { component: () => JSX.Element }) {
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Redirecting to login...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/projects/:slug" component={ProjectDetail} />
      
      {/* Protected Admin Routes */}
      <Route path="/admin">
        {() => <ProtectedRoute component={AdminDashboard} />}
      </Route>
      <Route path="/admin/projects">
        {() => <ProtectedRoute component={ProjectsManager} />}
      </Route>
      <Route path="/admin/experience">
        {() => <ProtectedRoute component={ExperienceManager} />}
      </Route>
      <Route path="/admin/skills">
        {() => <ProtectedRoute component={SkillsManager} />}
      </Route>
      <Route path="/admin/leadership">
        {() => <ProtectedRoute component={LeadershipManager} />}
      </Route>
      <Route path="/admin/about">
        {() => <ProtectedRoute component={SiteContentEditor} />}
      </Route>
      <Route path="/admin/contacts">
        {() => <ProtectedRoute component={ContactsViewer} />}
      </Route>
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
