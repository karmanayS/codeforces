import * as z from "zod"

export * from "./user"
export * from "./session"
export * from "./account"
export * from "./verification"
export * from "./question"
export * from "./testcase"
export * from "./visibletest"

export const inputSchema = z.object({
    source_code: z.string(),
    language_id: z.number(),
    stdin: z.string()
})

export type Input = z.infer<typeof inputSchema>

export type SubmissionStatus = "processing" | "accepted" | "failed" | "TLE"

export const signupSchema = z.object({
    name: z.string(),
    email: z.email({error: "Invalid email"}),
    password: z.string().min(8, {error: "Password should be atleast 8 charachters long"})
})

export const signinSchema = z.object({
    email: z.email({error: "Invalid email"}),
    password: z.string().min(8, {error: "Password should be atleast 8 charachters long"})      
})
