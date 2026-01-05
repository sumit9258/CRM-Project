import express from "express"
import { GoogleLogin, Login, Register } from "../controllers/Auth.js"

const authRouter=express.Router()

authRouter.post("/register",Register)
authRouter.post("/login",Login)
authRouter.post("/google/auth",GoogleLogin)

export default authRouter