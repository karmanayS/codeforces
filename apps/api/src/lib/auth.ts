import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@repo/database/db";
import { emailOTP } from "better-auth/plugins"
import { sendEmail } from "./send-email";
import "dotenv/config"

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: { 
        enabled: true, 
    },
    user: {
        additionalFields: {
            isAdmin: {
                type: "boolean",
                required: true,
                defaultValue: false
            },

        }
    },
    plugins: [
        emailOTP({ 
            async sendVerificationOTP({ email, otp, type }) { 
                if (type === "sign-in") { 
                    // Send the OTP for sign in
                } else if (type === "email-verification") { 
                    // Send the OTP for email verification
                    const res = await sendEmail(email,otp)
                    if (!res) throw new Error("Error while sending email")
                } else { 
                    // Send the OTP for password reset
                } 
            }, 
        })         
    ]
});