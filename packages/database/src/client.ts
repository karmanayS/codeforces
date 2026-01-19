// import { Pool } from 'pg'; // Import the Pool
// import { PrismaClient } from "../generated/client";

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// // 1. Create the Pool specifically for the adapter
// const connectionString = process.env.DATABASE_URL;

// const pool = new Pool({
//   connectionString
// });

// // 2. Pass the pool to the adapter

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     // Optional: Log queries to see if connection works
//     // log: ['query', 'info', 'warn', 'error'],
//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export * from "../generated/client";


import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// eslint-disable-next-line
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();


if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;