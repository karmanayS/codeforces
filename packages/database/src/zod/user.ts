import * as z from "zod"
import { CompleteSession, relatedSessionSchema, CompleteAccount, relatedAccountSchema, CompleteQuestion, relatedQuestionSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  isAdmin: z.boolean(),
  emailVerified: z.boolean(),
  image: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof userSchema> {
  sessions: CompleteSession[]
  accounts: CompleteAccount[]
  questions: CompleteQuestion[]
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => userSchema.extend({
  sessions: relatedSessionSchema.array(),
  accounts: relatedAccountSchema.array(),
  questions: relatedQuestionSchema.array(),
}))
