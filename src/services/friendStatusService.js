import prisma from "../utils/prismaClient.js";

const friendStatusService = {
    async getFriendStatus(req, contactId) {
        console.log("Dados recebidos no serviço:", {
            userId: req.user?.id,
            contactId,
        });
        if (!req.user || !req.user.id) {
            throw new Error("Usuário não autenticado");
        }

        if (!contactId) {
            throw new Error("ContactId inválido");
        }

        const userId = parseInt(req.user.id, 10);
        const parsedContactId = parseInt(contactId, 10);

        const friendStatus = await prisma.friendRequest.findFirst({
            where: {
                OR: [
                    { senderId: userId, receiverId: parsedContactId },
                    { senderId: parsedContactId, receiverId: userId },
                ],
            },
        });

        if (friendStatus) {
            if (friendStatus.status === "accepted") {
                return { status: "friends" };
            } else if (friendStatus.status === "pending") {
                return { status: "requested" };
            } else {
                return { status: "notFriends" };
            }
        } else {
            return { status: "notFriends" };
        }
    },
};

export default friendStatusService;
