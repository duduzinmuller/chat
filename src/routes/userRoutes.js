// routes/userRoutes.js
import express from "express";
import {
    createUserController,
    getUserController,
} from "../server/controller/userController.js";

const router = express.Router();

router.post("/", createUserController);
router.get("/:phone", getUserController);

export default router;
