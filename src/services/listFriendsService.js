import prisma from "../utils/prismaClient.js";

export class FriendListService {
    static async listFriends(contactId) {
        try {
            const contactWithFriends = await prisma.contact.findUnique({
                where: { id: contactId },
                select: {
                    friends: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            imageUrl: true,
                        },
                    },
                },
            });

            if (!contactWithFriends) {
                return [];
            }

            return contactWithFriends.friends;
        } catch (error) {
            throw new Error(error.message || "Erro ao buscar lista de amigos");
        }
    }
}
