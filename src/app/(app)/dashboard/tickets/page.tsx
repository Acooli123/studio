

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
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useEffect, useState } from "react"

export default function AllTicketsPage() {
  const [formattedTickets, setFormattedTickets] = useState(tickets);

  useEffect(() => {
    setFormattedTickets(tickets.map(ticket => ({
      ...ticket,
      updatedAt: new Date(ticket.updatedAt).toLocaleDateString(),
    })));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Tickets</CardTitle>
        <CardDescription>
          A complete list of all support tickets.
        </CardDescription>
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
            {formattedTickets.map((ticket) => (
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
  )
}
