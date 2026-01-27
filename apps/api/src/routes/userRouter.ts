import express, { Router } from "express";
import { authMiddleware } from "../middleware/checkAuth";
import "dotenv/config"
import { catchError, internalServerError, invalidInput } from "../responses";
import axios from "axios"
import { inputSchema, SubmissionStatus } from "@repo/database/zod";
import { prisma } from "@repo/database/db";

export const userRouter:Router = express.Router()

userRouter.use(authMiddleware)
const jugde0 = process.env.JUDGE0_URL as string;

userRouter.get("/languages",async(req,res) => {
    try {
        const response = await axios.get(`${jugde0}/languages`)
        const languages = response.data
        res.json({
            success: true,
            languages
        })
    } catch (err) {
        if (err instanceof Error) {
            return catchError(res,err)
        }
        internalServerError(res)
    }
})

userRouter.get("/questions/:page",async(req,res) => {
    const userId = req.userId
    const page = Number(req.params.page)
    try {
        const totalQuestions = await prisma.question.count()
        const questions = await prisma.question.findMany({
            select: {
                id : true,
                title: true,
                difficulty: true,
                category: true,
                submissions: {
                    where: {
                        userId
                    }
                }
            }, 
            skip: (page * 10) - 10,
            take: 10
        })
        const filtered = questions.map(q => {
            let status:"attempted" | "solved" | undefined;
            q.submissions.map(s => {
                if (s.status === "accepted") {
                    status = "solved"
                    return
                }
            })
            if (!status && q.submissions.length > 0) {
                status = "attempted"
            }
            return {
                id: q.id,
                title: q.title,
                difficulty: q.difficulty,
                category: q.category.title,
                status,
                
            }
        })
        res.json({
            success: true,
            problems: filtered,
            totalQuestions
        }) 
    } catch (err) {
        if (err instanceof Error) {
            catchError(res,err)
        }
        internalServerError(res) 
    }
})

userRouter.get("/question/:questionId",async(req,res) => {
    const questionId = req.params.questionId;
    try {
        const question = await prisma.question.findFirst({
            where: {
                id : questionId
            },
            select: {
                title: true,
                description: true,
                difficulty: true,
                categoryName: true,
                timeLimit: true,
                memoryLimit: true,
                visibleTests: {
                    select: {
                        input: true,
                        output: true
                    }
                }
            }
        })
        res.json({
            success: true,
            problem: question
        })
    } catch (err) {
        if (err instanceof Error) {
            return catchError(res,err)
        }
        internalServerError(res)
    }
})

userRouter.post("/submission/:questionId",async(req,res) => {
    const questionId = req.params.questionId
    const { data,error } = inputSchema.safeParse(req.body)
    if (error) return invalidInput(res)
    try {
        const testCases = await prisma.testCase.findMany({
            where: {
                questionId
            },
            select: {
                input: true,
                output: true
            }
        })
        const batchSubmission = testCases.map((t) => {
            return {
                language_id: data.language_id,
                source_code: data.source_code,
                stdin: t.input,
                expected_output: t.output
            }
        })
        const response = await axios.post(`${jugde0}/submissions/batch?base64_encoded=false`,{
            submissions: batchSubmission    
        }, {
            headers: {
                "Content-Type" : "application/json"
            }
        })
        
        interface J0_Res {
            token?: string
            source_code?: string
            language_id?: string
            stdin?: string
            expected_output?: string
        }
        const tokens:{token:string}[] = response.data.map((d: J0_Res) => {
            if (!d.token) throw new Error("Error while creating submission")
            return { token: d.token }
        })

        await prisma.submission.create({
            data: {
                userId: req.userId as string,
                questionId,
                source_code: data.source_code,
                status: "processing",
                tokens: {create: tokens}
            }
        })    
        res.status(201).json({
            success: true,
            status: "processing"
        })     
    } catch (err) {
        if (err instanceof Error) {
            return catchError(res,err)
        }
        internalServerError(res)
    }    
})

userRouter.get("/submission/:token",async(req,res) => {
    const token = req.params.token;
    try {
        const response = await axios.get(`${jugde0}/submissions/${token}?base64_encoded=false&fields=stdout,stderr,status_id,language_id`)
        // const { stdout,status_id,language_id,stderr } = response.data
        // let status:SubmissionStatus = "processing";
        // if (status_id < 3) {
        //     return res.json({
        //         success: true,
        //         status_id,
        //         status
        //     })
        // }
        // switch (status_id) {
        //     case 3:
        //         status = "accepted"
        //         break 
        //     case 4:
        //         status = "failed"
        //         break
        //     case 5:
        //         status = "TLE"
        // }
        // if (status_id > 5) {
        //     status = "failed"
        // }
        await prisma.submission.update({
            where: {
                token
            },
            data: {
                status
            }
        })
        res.json({
            success: true,
            status,
            status_id
        })
    } catch (err) {
        if (err instanceof Error) {
            return catchError(res,err)
        }
        internalServerError(res)
    }
})

userRouter.get("/submissions/:questionId",async(req,res) => {
    const questionId = req.params.questionId;
    try {
        const submissions = await prisma.submission.findMany({
            where: {
                questionId
            }
        })
        res.json({
            success: true,
            submissions
        })
    } catch (err) {
        if (err instanceof Error) {
            return catchError(res,err)
        }
        internalServerError(res)
    }
})