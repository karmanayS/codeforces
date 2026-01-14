import { Response } from "express";

export const invalidInput = (res: Response) => {
    res.status(400).json({
        success: false,
        error: "Invalid input"
    })
}

export const internalServerError = (res: Response) => {
    res.status(500).json({
        success: false,
        error: "Internal server error"
    })
}

export const catchError = (res: Response,err: Error) => {
    res.status(500).json({
        success: false,
        error : err.message
    })
}