import * as z from "zod";

export const questionSchema = z.object({
  title: z.string(),
  description: z.string(),
  visibleTests: z.array(z.object({
    input : z.string(),
    output: z.string()
  })),
  hiddenTests: z.array(z.object({
    input : z.string(),
    output: z.string()
  })),
  timeLimit: z.number(),
  memoryLimit: z.number()  
})