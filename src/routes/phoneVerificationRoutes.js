import express from "express";
import { sendVerification } from "../server/controller/phoneVerificationController.js";

const router = express.Router();

router.post("/send", sendVerification);

export default router;
