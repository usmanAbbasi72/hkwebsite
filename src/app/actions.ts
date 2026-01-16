"use server";

import {
  getPrioritizedProjects,
  type PrioritizedProjectShowcaseInput,
  type PrioritizedProjectShowcaseOutput,
} from "@/ai/flows/prioritized-project-showcase";

export async function getPrioritizedProjectsAction(
  input: PrioritizedProjectShowcaseInput
): Promise<PrioritizedProjectShowcaseOutput> {
  try {
    const result = await getPrioritizedProjects(input);
    // The AI output is a string of comma-separated project names. We need to parse it.
    const highlightedProjects = result.highlightedProjects.split(',').map(p => p.trim());
    
    return {
      ...result,
      highlightedProjects: highlightedProjects.join(','), // keep original string format for consistency
    };

  } catch (error) {
    console.error("Error in getPrioritizedProjectsAction:", error);
    // It's better to throw a more specific error or return a structured error response
    throw new Error("Failed to get prioritized projects from AI. Please try again later.");
  }
}
