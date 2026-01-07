import express from "express";
import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";
import ConDb from "./config/db.js";
import authRouter from "./routes/auth.router.js";
import taskRouter from "./routes/task.router.js";

const app = express();

app.use(express.json());
app.use(cookieParser()); // 🔥 REQUIRED

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);

const server = http.createServer(app);

server.listen(3000, () => {
  ConDb();
  console.log("Server running on http://localhost:3000");
});
