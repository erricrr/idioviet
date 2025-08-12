'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating encouraging messages
 * to motivate users in their Vietnamese learning journey.
 *
 * @exports generateEncouragementMessage - An async function that takes user's recording
 * and returns an encouragement message.
 * @exports GenerateEncouragementInput - The input type for generateEncouragementMessage function.
 * @exports GenerateEncouragementOutput - The output type for generateEncouragementMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEncouragementInputSchema = z.object({
  recordingDataUri: z
    .string()
    .describe(
      "The user's recording as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateEncouragementInput = z.infer<typeof GenerateEncouragementInputSchema>;

const GenerateEncouragementOutputSchema = z.object({
  encouragementMessage: z
    .string()
    .describe('A short encouraging message to motivate the user.'),
});
export type GenerateEncouragementOutput = z.infer<typeof GenerateEncouragementOutputSchema>;

export async function generateEncouragementMessage(
  input: GenerateEncouragementInput
): Promise<GenerateEncouragementOutput> {
  return generateEncouragementFlow(input);
}

const generateEncouragementPrompt = ai.definePrompt({
  name: 'generateEncouragementPrompt',
  input: {schema: GenerateEncouragementInputSchema},
  output: {schema: GenerateEncouragementOutputSchema},
  prompt: `You are a friendly and encouraging language learning assistant.

  A user has just finished recording themselves practicing a Vietnamese idiom or proverb.

  Your job is to generate a short, positive, and encouraging message (one sentence maximum) to motivate them to continue practicing.
  Be specific and avoid generic phrases.

  Consider the recording (if provided) to give specific feedback or encouragement related to their attempt.

  Recording: {{media url=recordingDataUri}}
  Encouragement Message: `,
});

const generateEncouragementFlow = ai.defineFlow(
  {
    name: 'generateEncouragementFlow',
    inputSchema: GenerateEncouragementInputSchema,
    outputSchema: GenerateEncouragementOutputSchema,
  },
  async input => {
    const {output} = await generateEncouragementPrompt(input);
    return output!;
  }
);
