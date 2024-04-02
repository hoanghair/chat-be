import express from "express";
import {getGroupChat, addGroup} from "../controllers/groupController.js";

const router = express.Router();

router.get("/", getGroupChat);
router.post("/", addGroup);

export default router;
