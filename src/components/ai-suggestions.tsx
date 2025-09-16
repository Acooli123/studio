"use client"

import { useEffect, useState } from "react"
import { suggestKnowledgeBaseArticles, SuggestKnowledgeBaseArticlesOutput } from "@/ai/flows/ai-suggested-knowledge-base-articles"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Lightbulb } from "lucide-react"
import Link from "next/link"

interface AiSuggestionsProps {
  ticketDetails: string
}

export function AiSuggestions({ ticketDetails }: AiSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<SuggestKnowledgeBaseArticlesOutput | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        setLoading(true)
        const result = await suggestKnowledgeBaseArticles({ ticketDetails })
        setSuggestions(result)
      } catch (error) {
        console.error("Failed to fetch AI suggestions:", error)
        // In a real app, you might set an error state here
      } finally {
        setLoading(false)
      }
    }
    fetchSuggestions()
  }, [ticketDetails])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-accent" />
            <span>AI Suggestions</span>
          </CardTitle>
          <CardDescription>AI is analyzing the ticket...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </CardContent>
      </Card>
    )
  }
  
  if (!suggestions || suggestions.suggestedArticles.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-accent" />
          <span>AI Suggestions</span>
        </CardTitle>
        <CardDescription>
          Relevant knowledge base articles that might help.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.suggestedArticles.map((article, index) => (
            <div key={index} className="space-y-1">
              <Link href={article.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                  {article.title}
              </Link>
              <p className="text-sm text-muted-foreground">{article.summary}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
