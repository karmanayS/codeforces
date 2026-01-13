import { prisma } from "@repo/database/db";
import { relatedQuestionSchema } from "@repo/database/zod";
import express, { Router } from "express";
import { authMiddleware } from "../middleware/checkAuth";

export const adminRouter:Router = express.Router()

adminRouter.use(authMiddleware);

adminRouter.post("/question",async(req,res) => {
    const { data,error } = relatedQuestionSchema.safeParse(req.body)
    if (error) return res.status(400).json({
        success: false,
        error : "Invalid inputs"
    })
    try {
        await prisma.question.create({
            data: {
                title: data.title,
                description: data.description,
                updatedAt: new Date(),
                timeLimit: data.timeLimit,
                memoryLimit: data.memoryLimit,
                visibleTests: data.visibleTests,
                
                userId: req.userId!
            }
        })
        res.json({
            success: true,
            message: "Question created successfully"
        })
    } catch (err) {
        console.log(err);
        if (err instanceof Error) {
            return res.status(500).json({
                success: false,
                error : err.message
            })
        }
        res.status(500).json({
            success : false,
            error : "Internal server error"
        })
    }
})

adminRouter.put("/question/:questionId",async(req,res) => {
    const questionId = req.params.questionId;
    const { data,error } = relatedQuestionSchema.safeParse(req.body)
    if (error) return res.status(400).json({
        success: false,
        error: "Invalid inputs"
    })
    try {
        const question = await prisma.question.update({
            where: {
                id: questionId
            }, data: data
        })
    } catch (err) {
        console.log(err);
        if (err instanceof Error) {
            return res.status(500).json({
                success: false,
                error : err.message
            })
        }
        res.status(500).json({
            success : false,
            error : "Internal server error"
        })
    }
})