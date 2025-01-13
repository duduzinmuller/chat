import prisma from "../utils/prismaClient.js";

class FriendService {
    async sendFriendRequest(senderId, receiverId) {
        if (senderId === receiverId) {
            throw new Error("Não é possível enviar solicitação para si mesmo.");
        }

        const existingRequest = await prisma.friendRequest.findUnique({
            where: {
                senderId_receiverId: {
                    senderId,
                    receiverId,
                },
            },
        });

        if (existingRequest) {
            throw new Error("Já existe uma solicitação pendente.");
        }

        const request = await prisma.friendRequest.create({
            data: {
                senderId,
                receiverId,
                status: "pending",
            },
        });

        return request;
    }

    async acceptFriendRequest(requestId) {
        const request = await prisma.friendRequest.update({
            where: { id: requestId },
            data: { status: "accepted" },
        });

        if (request.status === "accepted") {
            await prisma.contact.update({
                where: { id: request.senderId },
                data: {
                    friends: {
                        connect: { id: request.receiverId },
                    },
                },
            });

            await prisma.contact.update({
                where: { id: request.receiverId },
                data: {
                    friends: {
                        connect: { id: request.senderId },
                    },
                },
            });
        }

        return request;
    }

    async rejectFriendRequest(requestId) {
        const request = await prisma.friendRequest.update({
            where: { id: requestId },
            data: { status: "rejected" },
        });

        return request;
    }
}

export default new FriendService();
