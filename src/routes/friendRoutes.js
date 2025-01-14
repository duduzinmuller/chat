import express from "express";
import friendController from "../server/controller/friendController.js";
import deleteContactController from "../server/controller/deleteFriendController.js";
import authenticate from "../utils/middleware.js";
import { FriendListController } from "../server/controller/listFriendController.js";
const router = express.Router();

router.post("/send", friendController.sendFriendRequest);

router.put("/accept/:requestId", friendController.acceptFriendRequest);

router.put("/reject/:requestId", friendController.rejectFriendRequest);

router.delete(
    "/remove/:contactId",
    authenticate,
    deleteContactController.removeFriend,
);

router.get("/list/:contactId", FriendListController.getFriends);

export default router;
