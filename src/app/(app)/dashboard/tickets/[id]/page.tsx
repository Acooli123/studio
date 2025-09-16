import { tickets } from "@/lib/data"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import { AiSuggestions } from "@/components/ai-suggestions"
import { Clock, File, Hash, MessageSquare, Tag, User } from "lucide-react"

export default function TicketDetailsPage({ params }: { params: { id: string } }) {
  const ticket = tickets.find(t => t.id === params.id)

  if (!ticket) {
    notFound()
  }

  const aiTicketDetails = `Title: ${ticket.title}\nCategory: ${ticket.category}\nDescription: ${ticket.description}`;

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
      <div className="md:col-span-2 lg:col-span-3 space-y-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline">{ticket.id}</Badge>
                    <Badge variant={
                      ticket.status === 'Open' ? 'destructive' :
                      ticket.status === 'In Progress' ? 'secondary' : 'default'
                    } className="capitalize">
                      {ticket.status}
                    </Badge>
                </div>
                <CardTitle className="mt-4 text-2xl lg:text-3xl">{ticket.title}</CardTitle>
              </div>
              <div className="text-right">
                  <p className="text-sm font-medium">Requester</p>
                  <div className="flex items-center gap-2 mt-1">
                     <Avatar className="h-8 w-8">
                       <Image src={ticket.user.avatar} alt={ticket.user.name} data-ai-hint="person face" width={32} height={32} />
                       <AvatarFallback>{ticket.user.name.charAt(0)}</AvatarFallback>
                     </Avatar>
                     <div>
                      <p className="font-semibold text-sm">{ticket.user.name}</p>
                      <p className="text-xs text-muted-foreground">{ticket.user.email}</p>
                     </div>
                  </div>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">{ticket.description}</p>
          </CardContent>
          <Separator />
          <CardContent className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <div>
                    <p className="font-medium">Category</p>
                    <p className="text-muted-foreground">{ticket.category}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-muted-foreground" />
                <div>
                    <p className="font-medium">Priority</p>
                    <p className="text-muted-foreground">{ticket.priority}</p>
                </div>
            </div>
             <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <div>
                    <p className="font-medium">Created At</p>
                    <p className="text-muted-foreground">{new Date(ticket.createdAt).toLocaleString()}</p>
                </div>
            </div>
             <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <div>
                    <p className="font-medium">Last Updated</p>
                    <p className="text-muted-foreground">{new Date(ticket.updatedAt).toLocaleString()}</p>
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
                        <Image src={ticket.agent?.avatar || ticket.user.avatar} alt="Avatar" data-ai-hint="person face" width={40} height={40}/>
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold">{ticket.agent?.name || ticket.user.name}</p>
                            <p className="text-xs text-muted-foreground">{new Date(ticket.updatedAt).toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-muted rounded-lg text-sm">
                            <p>Assigned this ticket and started investigation. Will provide an update shortly.</p>
                        </div>
                    </div>
                </div>
                 <div className="flex gap-4">
                    <Avatar>
                        <Image src={ticket.user.avatar} alt="Avatar" data-ai-hint="person face" width={40} height={40}/>
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                         <div className="flex justify-between items-center">
                            <p className="font-semibold">{ticket.user.name}</p>
                            <p className="text-xs text-muted-foreground">{new Date(ticket.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-muted rounded-lg text-sm">
                            <p>Ticket created.</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>

      <div className="md:col-span-1 lg:col-span-1 space-y-8">
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
