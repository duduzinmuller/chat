import prisma from "../utils/prismaClient.js";

class deleteContactService {
    async removeFriend(contactId1, contactId2) {
        const contact1 = await prisma.contact.findUnique({
            where: { id: contactId1 },
            include: { friends: true },
        });

        const contact2 = await prisma.contact.findUnique({
            where: { id: contactId2 },
            include: { friends: true },
        });

        if (!contact1 || !contact2) {
            throw new Error("Um ou ambos os usuários não existem.");
        }

        if (!contact1.friends.some((friend) => friend.id === contactId2)) {
            throw new Error("Esses usuários não são amigos.");
        }

        await prisma.contact.update({
            where: { id: contactId1 },
            data: {
                friends: {
                    disconnect: { id: contactId2 },
                },
            },
        });

        await prisma.contact.update({
            where: { id: contactId2 },
            data: {
                friends: {
                    disconnect: { id: contactId1 },
                },
            },
        });

        return { message: "Amizade removida com sucesso." };
    }
}

export default new deleteContactService();
