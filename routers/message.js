import express from"express";
import { getMessage, addMessage } from "../controllers/messageController.js";

const router = express.Router();
router.get("/", getMessage);
router.post("/", addMessage);

export default router;
