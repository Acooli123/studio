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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ticketCategories } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function AdminPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Configuration</CardTitle>
        <CardDescription>
          Manage your service desk settings, categories, SLAs, and routing rules.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="categories" className="w-full">
          <TabsList>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="slas">SLAs</TabsTrigger>
            <TabsTrigger value="routing">Routing Rules</TabsTrigger>
          </TabsList>
          <TabsContent value="categories" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Ticket Categories</CardTitle>
                  <CardDescription>Manage the categories available for tickets.</CardDescription>
                </div>
                <Button size="sm" className="gap-1">
                  <PlusCircle className="h-4 w-4" />
                  Add Category
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Tickets</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ticketCategories.map((category) => (
                      <TableRow key={category}>
                        <TableCell className="font-medium">{category}</TableCell>
                        <TableCell>{Math.floor(Math.random() * 50) + 1}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="slas" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Service Level Agreements (SLAs)</CardTitle>
                <CardDescription>Define response and resolution times for tickets.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">SLA management coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="routing" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Ticket Routing Rules</CardTitle>
                <CardDescription>Automatically assign tickets to agents or teams.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Routing rule configuration coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
