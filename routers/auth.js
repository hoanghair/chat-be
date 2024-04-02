import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { authentication } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", authentication, logout);

export default router;
