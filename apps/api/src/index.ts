import express from "express";
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import { adminRouter } from "./routes/adminRouter.js";
import { userRouter } from "./routes/userRouter.js";

const app = express();
const PORT = 8080;

app.use(
  cors({
    origin: ["http://localhost:3000"], // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.all('/api/auth/{*any}', toNodeHandler(auth));
app.use(express.json());

app.use("/api/admin",adminRouter)
app.use("/api/userRouter/",userRouter)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
})