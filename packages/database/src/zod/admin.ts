import * as z from "zod"
import { CompleteQuestion, relatedQuestionSchema } from "./index"

export const adminSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  passsword: z.string(),
})

export interface CompleteAdmin extends z.infer<typeof adminSchema> {
  questions: CompleteQuestion[]
}

/**
 * relatedAdminSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedAdminSchema: z.ZodSchema<CompleteAdmin> = z.lazy(() => adminSchema.extend({
  questions: relatedQuestionSchema.array(),
}))
