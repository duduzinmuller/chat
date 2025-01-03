import express from "express";
import {
    loginController,
    socialLoginControllerExists,
} from "../server/controller/authController.js";

const router = express.Router();

router.post("/login", loginController);

router.post("/login/authenticator", socialLoginControllerExists);

export default router;
