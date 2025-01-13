import express from "express";
import { getContact } from "../server/controller/getByContactController.js";

const router = express.Router();

router.get("/contacts/:contactId", getContact);

export default router;
