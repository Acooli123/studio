export type Ticket = {
  id: string;
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  priority: "Low" | "Medium" | "High" | "Urgent";
  category: "Hardware" | "Software" | "Network" | "Account";
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  agent?: {
    name: string;
    email: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type User = {
  name: string;
  email: string;
  avatar: string;
};

export const users: User[] = [
  { name: 'Alice Johnson', email: 'alice.j@example.com', avatar: 'https://picsum.photos/seed/1/100/100' },
  { name: 'Bob Williams', email: 'bob.w@example.com', avatar: 'https://picsum.photos/seed/2/100/100' },
  { name: 'Charlie Brown', email: 'charlie.b@example.com', avatar: 'https://picsum.photos/seed/3/100/100' },
];

export const agents: User[] = [
  { name: 'David Miller', email: 'david.m@servicedesk.com', avatar: 'https://picsum.photos/seed/4/100/100' },
  { name: 'Eve Davis', email: 'eve.d@servicedesk.com', avatar: 'https://picsum.photos/seed/5/100/100' },
];

export const tickets: Ticket[] = [
  {
    id: "ITS-7312",
    title: "Cannot connect to VPN",
    description: "I'm unable to connect to the company VPN from my home network. I've tried restarting my computer and the router, but the issue persists. The error message says 'Authentication failed'.",
    status: "Open",
    priority: "High",
    category: "Network",
    user: users[0],
    createdAt: "2024-07-20T09:15:23Z",
    updatedAt: "2024-07-20T09:15:23Z",
  },
  {
    id: "ITS-7311",
    title: "Software license expired for 'DesignPro'",
    description: "My license for DesignPro has expired and I can't access the software. I need this for my current project. Can you please renew it?",
    status: "In Progress",
    priority: "Medium",
    category: "Software",
    user: users[1],
    agent: agents[0],
    createdAt: "2024-07-19T14:30:00Z",
    updatedAt: "2024-07-20T10:05:00Z",
  },
  {
    id: "ITS-7310",
    title: "Broken keyboard key",
    description: "The 'E' key on my laptop keyboard is not working. It's making it very difficult to type.",
    status: "Resolved",
    priority: "Low",
    category: "Hardware",
    user: users[2],
    agent: agents[1],
    createdAt: "2024-07-18T11:00:00Z",
    updatedAt: "2024-07-19T16:45:00Z",
  },
    {
    id: "ITS-7309",
    title: "Password reset for email account",
    description: "I've forgotten my email password and need to reset it. The self-service portal is not working for me.",
    status: "Resolved",
    priority: "High",
    category: "Account",
    user: users[0],
    agent: agents[0],
    createdAt: "2024-07-18T09:00:12Z",
    updatedAt: "2024-07-18T09:30:45Z",
  },
  {
    id: "ITS-7308",
    title: "Printer is not working",
    description: "The main office printer on the 2nd floor is not printing. It shows a 'Paper Jam' error but there is no paper stuck inside.",
    status: "Open",
    priority: "Medium",
    category: "Hardware",
    user: users[1],
    createdAt: "2024-07-20T11:00:00Z",
    updatedAt: "2024-07-20T11:00:00Z",
  },
  {
    id: "ITS-7307",
    title: "Slow internet connection",
    description: "My internet has been extremely slow for the past two days. Video calls are lagging and websites take a long time to load.",
    status: "In Progress",
    priority: "Medium",
    category: "Network",
    user: users[2],
    agent: agents[1],
    createdAt: "2024-07-19T17:00:00Z",
    updatedAt: "2024-07-20T11:15:00Z",
  }
];

export const ticketCategories = ["Hardware", "Software", "Network", "Account"];
export const ticketPriorities = ["Low", "Medium", "High", "Urgent"];

export const agentPerformance = {
  ticketsResolved: 89,
  ticketsPending: 12,
  avgHandlingTime: "4.2 hours",
  slaCompliance: "96%",
  monthlyTrend: [
    { month: "Jan", resolved: 70, created: 80 },
    { month: "Feb", resolved: 65, created: 75 },
    { month: "Mar", resolved: 80, created: 85 },
    { month: "Apr", resolved: 75, created: 90 },
    { month: "May", resolved: 90, created: 95 },
    { month: "Jun", resolved: 89, created: 100 },
  ]
}
