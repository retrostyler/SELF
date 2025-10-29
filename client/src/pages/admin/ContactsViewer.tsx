import { useQuery } from "@tanstack/react-query";
import type { ContactSubmission } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Calendar } from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";

export default function ContactsViewer() {
  const { data: submissions = [], isLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/contacts"],
  });

  return (
    <div className="min-h-screen bg-muted/30 pt-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/admin">
            <Button variant="ghost" className="mb-4" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Button>
          </Link>
          <h1 className="font-display font-bold text-4xl">Contact Messages</h1>
          <p className="text-muted-foreground mt-2">View all contact form submissions from your portfolio</p>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : submissions.length === 0 ? (
          <Card className="p-12 text-center">
            <Mail className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground text-lg mb-2">No messages yet</p>
            <p className="text-sm text-muted-foreground">Contact form submissions will appear here</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <Card key={submission.id} className="p-6" data-testid={`card-contact-${submission.id}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display font-semibold text-lg">{submission.name}</h3>
                      {submission.read ? (
                        <Badge variant="outline">Read</Badge>
                      ) : (
                        <Badge>New</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <a href={`mailto:${submission.email}`} className="hover:text-primary flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {submission.email}
                      </a>
                      {submission.createdAt && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(submission.createdAt), "MMM dd, yyyy 'at' h:mm a")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{submission.message}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
