'use server';

/**
 * @fileOverview An IT ticket submission flow via chatbot.
 *
 * - submitTicket - A function that handles the ticket submission process.
 * - SubmitTicketInput - The input type for the submitTicket function.
 * - SubmitTicketOutput - The return type for the submitTicket function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SubmitTicketInputSchema = z.object({
  issueDescription: z
    .string()
    .describe('A description of the IT issue the employee is experiencing.'),
});
export type SubmitTicketInput = z.infer<typeof SubmitTicketInputSchema>;

const SubmitTicketOutputSchema = z.object({
  ticketConfirmation: z
    .string()
    .describe('A confirmation message that the ticket has been submitted.'),
  ticketId: z.string().describe('The ID of the submitted ticket.'),
});
export type SubmitTicketOutput = z.infer<typeof SubmitTicketOutputSchema>;

export async function submitTicket(input: SubmitTicketInput): Promise<SubmitTicketOutput> {
  return submitTicketFlow(input);
}

const submitTicketPrompt = ai.definePrompt({
  name: 'submitTicketPrompt',
  input: {schema: SubmitTicketInputSchema},
  output: {schema: SubmitTicketOutputSchema},
  prompt: `You are an IT support agent. An employee has described an issue to you. Create a ticket for them and provide a confirmation message and ticket ID.

Issue Description: {{{issueDescription}}}

Respond in markdown format.  Do not mention that you are an AI. Use a real-sounding ticket ID like ITS-1234.`,
});

const submitTicketFlow = ai.defineFlow(
  {
    name: 'submitTicketFlow',
    inputSchema: SubmitTicketInputSchema,
    outputSchema: SubmitTicketOutputSchema,
  },
  async input => {
    const {output} = await submitTicketPrompt(input);
    return output!;
  }
);
