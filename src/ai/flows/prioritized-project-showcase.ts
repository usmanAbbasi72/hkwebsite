'use server';

/**
 * @fileOverview A project portfolio AI agent that highlights projects based on current business priorities.
 *
 * - getPrioritizedProjects - A function that retrieves and prioritizes projects for the showcase.
 * - PrioritizedProjectShowcaseInput - The input type for the getPrioritizedProjects function.
 * - PrioritizedProjectShowcaseOutput - The return type for the getPrioritizedProjects function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PrioritizedProjectShowcaseInputSchema = z.object({
  businessPriorities: z
    .string()
    .describe(
      'A description of the current business priorities, such as target industries or technologies.'
    ),
  projectList: z
    .string()
    .describe('A list of available projects, with their descriptions.'),
});
export type PrioritizedProjectShowcaseInput = z.infer<
  typeof PrioritizedProjectShowcaseInputSchema
>;

const PrioritizedProjectShowcaseOutputSchema = z.object({
  highlightedProjects: z
    .string()
    .describe(
      'A comma-separated list of project names that best align with the provided business priorities.'
    ),
  reasoning: z
    .string()
    .describe('The reasoning behind the selection of highlighted projects.'),
});
export type PrioritizedProjectShowcaseOutput = z.infer<
  typeof PrioritizedProjectShowcaseOutputSchema
>;

export async function getPrioritizedProjects(
  input: PrioritizedProjectShowcaseInput
): Promise<PrioritizedProjectShowcaseOutput> {
  return prioritizedProjectShowcaseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'prioritizedProjectShowcasePrompt',
  input: {schema: PrioritizedProjectShowcaseInputSchema},
  output: {schema: PrioritizedProjectShowcaseOutputSchema},
  prompt: `You are a marketing expert tasked with selecting the most relevant projects from our portfolio to showcase on our website, given the current business priorities.

Prioritize projects that align with the following business priorities: {{{businessPriorities}}}.

Here is a list of available projects with their descriptions: {{{projectList}}}.

Based on the business priorities, select the projects that would be most compelling to potential clients and explain your reasoning.

Output the selected project names as a comma-separated list, and your reasoning in the format specified by the schema.`,
});

const prioritizedProjectShowcaseFlow = ai.defineFlow(
  {
    name: 'prioritizedProjectShowcaseFlow',
    inputSchema: PrioritizedProjectShowcaseInputSchema,
    outputSchema: PrioritizedProjectShowcaseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
