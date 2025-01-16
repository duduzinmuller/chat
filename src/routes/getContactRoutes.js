import express from "express";
import { getContactProviderController } from "../server/controller/getContactController.js";

const router = express.Router();

router.get("/get/:provider/:providerId", getContactProviderController);

export default router;
