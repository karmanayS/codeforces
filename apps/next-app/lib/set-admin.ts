"use server"

const admins = ["axernityyt@gmail.com"]
import { prisma } from "@repo/database/db"

export const setAdmin = async(email:string) => {
    const isAdmin = admins.includes(email)
    if (isAdmin) {
        try {
            await prisma.user.update({
                where: {
                    email
                }, data: {
                    isAdmin: true
                }
            })
            return true    
        } catch (error) {
            console.log(error)
            return false
        }
    }
    return false
}