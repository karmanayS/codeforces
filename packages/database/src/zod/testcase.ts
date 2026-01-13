import * as z from "zod"
import { CompleteQuestion, relatedQuestionSchema } from "./index"

export const testCaseSchema = z.object({
  //id: z.string(),
  input: z.string(),
  output: z.string(),
  questionId: z.string(),
})

export interface CompleteTestCase extends z.infer<typeof testCaseSchema> {
  //question: CompleteQuestion
}

/**
 * relatedTestCaseSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedTestCaseSchema: z.ZodSchema<CompleteTestCase> = z.lazy(() => testCaseSchema.extend({
  //question: relatedQuestionSchema,
}))
