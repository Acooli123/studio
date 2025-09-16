
"use client";

import { tickets } from "@/lib/data"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import { AiSuggestions } from "@/components/ai-suggestions"
import { Clock, File, Hash, MessageSquare, Tag, User } from "lucide-react"
import { useEffect, useState } from "react"

export default function TicketDetailsPage({ params }: { params: { id: string } }) {
  const [formattedTicket, setFormattedTicket] = useState<typeof tickets[0] | null>(null);

  useEffect(() => {
    const ticket = tickets.find(t => t.id === params.id);
    if (ticket) {
      setFormattedTicket({
        ...ticket,
        createdAt: new Date(ticket.createdAt).toLocaleString(),
        updatedAt: new Date(ticket.updatedAt).toLocaleString(),
      });
    }
  }, [params.id]);


  if (!formattedTicket) {
    const ticket = tickets.find(t => t.id === params.id)
    if (!ticket) return notFound()
    
    // Render a loading state or return null until the effect runs
    return null;
  }

  const aiTicketDetails = `Title: ${formattedTicket.title}\nCategory: ${formattedTicket.category}\nDescription: ${formattedTicket.description}`;

  return (
    <div className="grid lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline">{formattedTicket.id}</Badge>
                    <Badge variant={
                      formattedTicket.status === 'Open' ? 'destructive' :
                      formattedTicket.status === 'In Progress' ? 'secondary' : 'default'
                    } className="capitalize">
                      {formattedTicket.status}
                    </Badge>
                </div>
                <CardTitle className="mt-4 text-2xl lg:text-3xl">{formattedTicket.title}</CardTitle>
              </div>
              <div className="text-left sm:text-right pt-2 sm:pt-0">
                  <p className="text-sm font-medium">Requester</p>
                  <div className="flex items-center gap-2 mt-1">
                     <Avatar className="h-8 w-8">
                       <Image src={formattedTicket.user.avatar} alt={formattedTicket.user.name} data-ai-hint="person face" width={32} height={32} />
                       <AvatarFallback>{formattedTicket.user.name.charAt(0)}</AvatarFallback>
                     </Avatar>
                     <div>
                      <p className="font-semibold text-sm">{formattedTicket.user.name}</p>
                      <p className="text-xs text-muted-foreground">{formattedTicket.user.email}</p>
                     </div>
                  </div>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">{formattedTicket.description}</p>
          </CardContent>
          <Separator />
          <CardContent className="pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <div>
                    <p className="font-medium">Category</p>
                    <p className="text-muted-foreground">{formattedTicket.category}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-muted-foreground" />
                <div>
                    <p className="font-medium">Priority</p>
                    <p className="text-muted-foreground">{formattedTicket.priority}</p>
                </div>
            </div>
             <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <div>
                    <p className="font-medium">Created At</p>
                    <p className="text-muted-foreground">{formattedTicket.createdAt}</p>
                </div>
            </div>
             <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <div>
                    <p className="font-medium">Last Updated</p>
                    <p className="text-muted-foreground">{formattedTicket.updatedAt}</p>
                </div>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><MessageSquare className="w-5 h-5" /> Activity & Comments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Mock activity feed */}
                <div className="flex gap-4">
                    <Avatar>
                        <Image src={formattedTicket.agent?.avatar || formattedTicket.user.avatar} alt="Avatar" data-ai-hint="person face" width={40} height={40}/>
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-center flex-wrap gap-2">
                            <p className="font-semibold">{formattedTicket.agent?.name || formattedTicket.user.name}</p>
                            <p className="text-xs text-muted-foreground">{formattedTicket.updatedAt}</p>
                        </div>
                        <div className="p-3 bg-muted rounded-lg text-sm">
                            <p>Assigned this ticket and started investigation. Will provide an update shortly.</p>
                        </div>
                    </div>
                </div>
                 <div className="flex gap-4">
                    <Avatar>
                        <Image src={formattedTicket.user.avatar} alt="Avatar" data-ai-hint="person face" width={40} height={40}/>
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                         <div className="flex justify-between items-center flex-wrap gap-2">
                            <p className="font-semibold">{formattedTicket.user.name}</p>
                            <p className="text-xs text-muted-foreground">{formattedTicket.createdAt}</p>
                        </div>
                        <div className="p-3 bg-muted rounded-lg text-sm">
                            <p>Ticket created.</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1 space-y-8">
        <AiSuggestions ticketDetails={aiTicketDetails} />

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><File className="w-5 h-5"/> Attachments</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">No attachments for this ticket.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
