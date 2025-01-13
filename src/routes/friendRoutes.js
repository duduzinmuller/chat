import express from "express";
import friendController from "../server/controller/friendController.js";
import deleteContactController from "../server/controller/deleteFriendController.js";
import authenticate from "../utils/middleware.js";
const router = express.Router();

router.post("/send", friendController.sendFriendRequest);

router.put("/accept/:requestId", friendController.acceptFriendRequest);

router.put("/reject/:requestId", friendController.rejectFriendRequest);

router.delete(
    "/remove/:contactId",
    authenticate,
    deleteContactController.removeFriend,
);

export default router;
