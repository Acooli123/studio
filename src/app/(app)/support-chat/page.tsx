import { ChatWindow } from "@/components/chat-window"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SupportChatPage() {
  return (
    <div className="h-[calc(100vh-10rem)]">
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle>Support Chatbot</CardTitle>
                <CardDescription>Use our AI-powered chatbot to quickly submit an IT ticket.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 p-0">
                <ChatWindow />
            </CardContent>
        </Card>
    </div>
  )
}
