import express from "express";
import {
    sendResetPasswordCode,
    verifyResetPasswordCode,
    resetPassword,
} from "../server/controller/resetPasswordController.js";

const router = express.Router();

router.post("/reset-password/send-code", sendResetPasswordCode);
router.post("/reset-password/verify-code", verifyResetPasswordCode);
router.post("/reset-password", resetPassword);

export default router;
