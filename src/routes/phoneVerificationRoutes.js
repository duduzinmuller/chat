import express from "express";
import { sendVerificationController } from "../server/controller/phoneVerificationController.js";

const router = express.Router();

router.post("/send", sendVerificationController);

export default router;
