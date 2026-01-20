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

userRouter.get("/questions",async(req,res) => {
    const userId = req.userId
    try {
        const questions = await prisma.question.findMany()
    } catch (err) {
        if (err instanceof Error) {
            catchError(res,err)
        }
        internalServerError(res) 
    }
})

userRouter.post("/submission/:questionId",async(req,res) => {
    const questionId = req.params.questionId
    const { data,error } = inputSchema.safeParse(req.body)
    if (error) return invalidInput(res)
    try {
        const response = await axios.post(`${jugde0}/submissions/?base64_encoded=false&wait=false`,{
            data    
        }, {
            headers: {
                "Content-Type" : "application/json"
            }
        })
        if (!response.data.token) throw new Error("Didnt receive token")
        await prisma.submission.create({
            data: {
                userId: req.userId as string,
                questionId,
                token: response.data.token,
                status: "processing"
            }
        })    
        res.json({
            success: true,
            token: response.data.token
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
        const { stdout,status_id,language_id,stderr } = response.data
        let status:SubmissionStatus = "processing";
        switch (status_id) {
            case 1:
            case 2:    
                status = "processing"
                break
            case 3:
                status = "accepted"
                break 
            case 4:
                status = "failed"
                break
            case 5:
                status = "TLE"
        }
        if (status_id < 3) {
            return res.json({
                success: true,
                status_id,
                status
            })
        }
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