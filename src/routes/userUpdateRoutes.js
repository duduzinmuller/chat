import express from "express";
import { updateUserController } from "../server/controller/userUpdateController.js";

const router = express.Router();

router.put("/contacts/:contactId", updateUserController);

export default router;
