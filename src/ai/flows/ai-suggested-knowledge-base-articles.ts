'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting relevant knowledge base articles
 * to IT agents when they view a ticket, to help them resolve tickets more efficiently.
 *
 * @exports {
 *   suggestKnowledgeBaseArticles,
 *   SuggestKnowledgeBaseArticlesInput,
 *   SuggestKnowledgeBaseArticlesOutput
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestKnowledgeBaseArticlesInputSchema = z.object({
  ticketDetails: z.string().describe('The details of the ticket, including description and category.'),
});

export type SuggestKnowledgeBaseArticlesInput = z.infer<typeof SuggestKnowledgeBaseArticlesInputSchema>;

const SuggestKnowledgeBaseArticlesOutputSchema = z.object({
  suggestedArticles: z.array(
    z.object({
      title: z.string().describe('The title of the suggested knowledge base article.'),
      url: z.string().describe('The URL of the suggested knowledge base article.'),
      summary: z.string().describe('A short summary of the knowledge base article.'),
    })
  ).describe('An array of suggested knowledge base articles.'),
});

export type SuggestKnowledgeBaseArticlesOutput = z.infer<typeof SuggestKnowledgeBaseArticlesOutputSchema>;

export async function suggestKnowledgeBaseArticles(input: SuggestKnowledgeBaseArticlesInput): Promise<SuggestKnowledgeBaseArticlesOutput> {
  return suggestKnowledgeBaseArticlesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestKnowledgeBaseArticlesPrompt',
  input: {schema: SuggestKnowledgeBaseArticlesInputSchema},
  output: {schema: SuggestKnowledgeBaseArticlesOutputSchema},
  prompt: `You are an AI assistant helping IT agents resolve tickets efficiently. Given the details of a ticket, you will suggest relevant articles from the knowledge base that might help the agent resolve the issue.

Ticket Details: {{{ticketDetails}}}

Suggest a list of knowledge base articles that would be helpful for resolving the ticket.  Include the title, url, and a short summary of each article.

Format your response as a JSON array of knowledge base articles.`,
});

const suggestKnowledgeBaseArticlesFlow = ai.defineFlow(
  {
    name: 'suggestKnowledgeBaseArticlesFlow',
    inputSchema: SuggestKnowledgeBaseArticlesInputSchema,
    outputSchema: SuggestKnowledgeBaseArticlesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
