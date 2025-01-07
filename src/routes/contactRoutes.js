import express from "express";
import { searchContactController } from "../server/controller/contactController.js";

const router = express.Router();

router.get("/contacts/search", searchContactController);

export default router;
