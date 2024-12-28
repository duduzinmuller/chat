import express from "express";
import {
    sendVerificationCodeController,
    verifyCodeController,
} from "../server/controller/emailVerificationController.js";

const router = express.Router();

router.post("/send-verification", sendVerificationCodeController);

router.post("/verify-code", verifyCodeController);

export default router;
