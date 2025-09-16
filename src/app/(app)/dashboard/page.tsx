
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { tickets } from "@/lib/data"
import { ArrowUpRight, Ticket, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const [formattedTickets, setFormattedTickets] = useState(tickets);

  useEffect(() => {
    setFormattedTickets(tickets.map(ticket => ({
      ...ticket,
      updatedAt: new Date(ticket.updatedAt).toLocaleDateString(),
    })));
  }, []);

  const openTickets = tickets.filter(t => t.status === "Open").length
  const inProgressTickets = tickets.filter(t => t.status === "In Progress").length
  const resolvedTickets = tickets.filter(t => t.status === "Resolved").length
  
  const recentTickets = formattedTickets.slice(0, 5)

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openTickets}</div>
            <p className="text-xs text-muted-foreground">+2 since last hour</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressTickets}</div>
            <p className="text-xs text-muted-foreground">+1 since last hour</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedTickets}</div>
            <p className="text-xs text-muted-foreground">Updated just now</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
                <CardTitle>Recent Tickets</CardTitle>
                <CardDescription>
                    An overview of the most recently created or updated tickets.
                </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/dashboard/tickets">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                </Link>
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>
                    <Link href={`/dashboard/tickets/${ticket.id}`} className="font-medium hover:underline">
                      {ticket.id}
                    </Link>
                    <div className="text-sm text-muted-foreground truncate max-w-xs">{ticket.title}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       <Avatar className="h-8 w-8">
                         <Image src={ticket.user.avatar} alt={ticket.user.name} data-ai-hint="person face" width={32} height={32} />
                         <AvatarFallback>{ticket.user.name.charAt(0)}</AvatarFallback>
                       </Avatar>
                       <div>
                        <p className="font-medium">{ticket.user.name}</p>
                        <p className="text-sm text-muted-foreground">{ticket.user.email}</p>
                       </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      ticket.status === 'Open' ? 'destructive' :
                      ticket.status === 'In Progress' ? 'secondary' : 'default'
                    } className="capitalize">
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">{ticket.priority}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{ticket.updatedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
