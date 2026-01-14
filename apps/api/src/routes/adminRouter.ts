import { prisma } from "@repo/database/db";
import { CompleteTestCase, CompleteVisibleTest, optionalQuestionSchema, Question, relatedQuestionSchema } from "@repo/database/zod";
import express, { Router } from "express";
import { authMiddleware } from "../middleware/checkAuth";
import { catchError, internalServerError, invalidInput } from "../responses";

export const adminRouter:Router = express.Router()

adminRouter.use(authMiddleware);

adminRouter.post("/question",async(req,res) => {
    const { data,error } = relatedQuestionSchema.safeParse(req.body)
    if (error) return invalidInput(res)
    try {
        await prisma.question.create({
            data: {
                title: data.title,
                description: data.description,
                updatedAt: new Date(),
                timeLimit: data.timeLimit,
                memoryLimit: data.memoryLimit,
                visibleTests: { create: data.visibleTests },
                testCases: { create: data.testCases },
                userId: req.userId!
            }
        })
        res.status(201).json({
            success: true,
            message: "Question created successfully"
        })
    } catch (err) {
        console.log(err);
        if (err instanceof Error) {
            return catchError(res,err)
        }
        internalServerError(res)
    }
})

adminRouter.put("/question/:questionId",async(req,res) => {
    const questionId = req.params.questionId;
    const { data,error } = optionalQuestionSchema.safeParse(req.body)
    if (error) return invalidInput(res)
    try {
        const question = await prisma.question.update({
            where: {
                id: questionId
            }, data: data
        })
        res.json({
            success: true,
            message: "Updated question successfully"
        })
    } catch (err) {
        console.log(err);
        if (err instanceof Error) {
            return catchError(res,err)
        }
        internalServerError(res)
    }
})

adminRouter.delete("/question/:questionId",async(req,res) => {
    const questionId = req.params.questionId;
    try {
        await prisma.question.update({
            where: {
                id: questionId
            }, data: {
                isDeleted: true
            }
        })
        res.json({
            success: true,
            message: "Deleted question successfully"
        })
    } catch (err) {
        if (err instanceof Error) {
            return catchError(res,err)
        }        
        internalServerError(res)
    }
})

adminRouter.get("/question/:questionId",async(req,res) => {
    const questionId = req.params.questionId;
    try {
        const question = await prisma.question.findFirst({
            where: {
                id: questionId,
                isDeleted: false
            }
        })
        res.json({
            success: true,
            question
        })
    } catch (err) {
        if (err instanceof Error) {
            return catchError(res,err)
        }
        internalServerError(res)
    }
})

adminRouter.get("/questions/:page",async(req,res) => {
    const userId = req.userId;
    const page = Number(req.params.page);
    try {
        let questions;
        (page === 1) ? 
            questions = await prisma.question.findMany({
                where: {
                    userId
                },
                take: 10
            })
        :
            questions = await prisma.question.findMany({
                where: {
                    userId
                },
                skip: (page * 10) - 10,
                take: 10
            })
        res.json({
            success: true,
            questions
        })        
    } catch (err) {
        if (err instanceof Error) {
            return catchError(res,err);
        }
        internalServerError(res)
    }
})

adminRouter.get("/tests/:questionId/:page", async(req,res) => {
    const questionId = req.params.questionId;
    const page = Number(req.params.page);
    try {
        let tests: CompleteTestCase[];
        (page === 1) ? 
            tests = await prisma.testCase.findMany({
            where: {
                questionId
            }, take: 10
        }) : 
            tests = await prisma.testCase.findMany({
                where: {
                    questionId
                }, 
                skip: (page * 10) - 10,
                take: 10
            })
        res.json({
            success: true,
            tests
        })
    } catch (err) {
        if (err instanceof Error) {
            return catchError(res,err)
        }
        internalServerError(res)
    }
})

adminRouter.get("/visibleTests/:questionId/:page", async(req,res) => {
    const questionId = req.params.questionId;
    const page = Number(req.params.page);
    try {
        let visibleTests: CompleteVisibleTest[];
        (page === 1) ? 
            visibleTests = await prisma.visibleTest.findMany({
            where: {
                questionId
            }, take: 10
        }) : 
            visibleTests = await prisma.visibleTest.findMany({
                where: {
                    questionId
                }, 
                skip: (page * 10) - 10,
                take: 10
            })
        res.json({
            success: true,
            visibleTests
        })
    } catch (err) {
        if (err instanceof Error) {
            return catchError(res,err)
        }
        internalServerError(res)
    }
})