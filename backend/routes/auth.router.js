import express from "express";
import {
  Register,
  Login,
  GoogleLogin,
  Logout,
  IsAuthenticated,
} from "../controllers/Auth.js";
import { IsAuth } from "../middleware/IsAuth.js";

const authRouter = express.Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.post("/google", GoogleLogin);
authRouter.post("/logout", Logout);

// check login
authRouter.get("/me", IsAuth, IsAuthenticated);

export default authRouter;
