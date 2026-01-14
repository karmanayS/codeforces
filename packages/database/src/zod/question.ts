import * as z from "zod"
import { CompleteUser, relatedUserSchema, CompleteTestCase, relatedTestCaseSchema, CompleteVisibleTest, relatedVisibleTestSchema, testCaseSchema, visibleTestSchema } from "./index"

export const questionSchema = z.object({
  //id: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  timeLimit: z.number().int(),
  memoryLimit: z.number().int(),
  userId: z.string(),
})

export const optionalQuestionSchema = questionSchema.partial()

export type Question = z.infer<typeof questionSchema>

export interface CompleteQuestion extends z.infer<typeof questionSchema> {
  //user: CompleteUser
  testCases: CompleteTestCase[]
  visibleTests: CompleteVisibleTest[]
}

/**
 * relatedQuestionSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedQuestionSchema: z.ZodSchema<CompleteQuestion> = z.lazy(() => questionSchema.extend({
  //user: relatedUserSchema,
  testCases: testCaseSchema.array(),
  visibleTests: visibleTestSchema.array(),
}))
