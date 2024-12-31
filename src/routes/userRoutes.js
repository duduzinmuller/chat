// routes/userRoutes.js
import express from "express";
import {
    createUserController,
    getUserController,
    socialLoginController,
} from "../server/controller/userController.js";

const router = express.Router();

router.post("/", createUserController);
router.get("/:phone", getUserController);
router.post("/social-login", socialLoginController);

export default router;
