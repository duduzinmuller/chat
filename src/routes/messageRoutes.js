// routes/userRoutes.js
import express from "express";
import {
    createMessageController,
    getMessagesController,
} from "../server/controller/messageController.js";

const router = express.Router();

router.post("/", createMessageController);
router.get("/:phone", getMessagesController);

export default router;
