import express from "express";
import {getUser, searchUser, updateUser} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUser);
router.get("/search", searchUser);
router.post("/", updateUser)

export default router;
