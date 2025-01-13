import express from "express";
import friendController from "../server/controller/friendController.js";

const router = express.Router();

router.post("/send", friendController.sendFriendRequest);

router.put("/accept/:requestId", friendController.acceptFriendRequest);

router.put("/reject/:requestId", friendController.rejectFriendRequest);

export default router;
