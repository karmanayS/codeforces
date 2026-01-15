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
