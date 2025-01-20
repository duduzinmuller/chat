import prisma from "../utils/prismaClient.js";

const friendStatusService = {
    async getFriendStatus(req, contactId) {
        if (!req.user || !req.user.id) {
            throw new Error("Usuário não autenticado");
        }

        if (!contactId || isNaN(Number(contactId))) {
            throw new Error("ContactId inválido");
        }

        const userId = req.user.id;

        const friendStatus = await prisma.friendRequest.findFirst({
            where: {
                OR: [
                    { senderId: userId, receiverId: Number(contactId) },
                    { senderId: Number(contactId), receiverId: userId },
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

export default friendStatusService;
