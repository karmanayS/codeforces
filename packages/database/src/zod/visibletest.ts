import * as z from "zod";
import { CompleteQuestion, relatedQuestionSchema } from "./index";

export const visibleTestSchema = z.object({
  id: z.string(),
  input: z.string(),
  output: z.string(),
  questionId: z.string(),
})

export interface CompleteVisibleTest extends z.infer<typeof visibleTestSchema> {
  question: CompleteQuestion
}

/**
 * relatedVisibleTestSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedVisibleTestSchema: z.ZodSchema<CompleteVisibleTest> = z.lazy(() => visibleTestSchema.extend({
  question: relatedQuestionSchema,
}))
