import express from "express";
import {
    sendResetPasswordCode,
    resetPassword,
} from "../server/controller/resetPasswordController.js";

const router = express.Router();

router.post("/send-reset-code", sendResetPasswordCode);

router.post("/reset-password", resetPassword);

export default router;
