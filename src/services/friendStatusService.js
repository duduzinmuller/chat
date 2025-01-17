// friendStatus.service.js
import { prisma } from "../utils/prismaClient.js";

const friendStatusService = {
    async getFriendStatus(req, contactId) {
        const userId = req.user.id;
        const friendStatus = await prisma.friendRequest.findFirst({
            where: {
                OR: [
                    { senderId: userId, receiverId: contactId },
                    { senderId: contactId, receiverId: userId },
                ],
            },
        });

        if (friendStatus) {
            if (friendStatus.status === "accepted") {
                return { status: "amigos" };
            } else if (friendStatus.status === "pending") {
                return { status: "pendente" };
            } else {
                return { status: "não amigos" };
            }
        } else {
            return { status: "não amigos" };
        }
    },
};

module.exports = friendStatusService;
