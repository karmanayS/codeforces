import * as z from "zod"
import { CompleteAdmin, relatedAdminSchema, CompleteTestCase, relatedTestCaseSchema, CompleteVisibleTest, relatedVisibleTestSchema } from "./index"

export const questionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.date(),
  timeLimit: z.number().int(),
  memoryLimit: z.number().int(),
  adminId: z.string(),
})

export interface CompleteQuestion extends z.infer<typeof questionSchema> {
  admin: CompleteAdmin
  testCases: CompleteTestCase[]
  visibleTests: CompleteVisibleTest[]
}

/**
 * relatedQuestionSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedQuestionSchema: z.ZodSchema<CompleteQuestion> = z.lazy(() => questionSchema.extend({
  admin: relatedAdminSchema,
  testCases: relatedTestCaseSchema.array(),
  visibleTests: relatedVisibleTestSchema.array(),
}))
