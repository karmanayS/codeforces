import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@repo/database/db";

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
    }
});