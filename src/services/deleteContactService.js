import prisma from "../utils/prismaClient.js";

class DeleteContactService {
    async removeFriend(contactId1, contactId2) {
        console.log(
            `Buscando os contatos com IDs: ${contactId1} e ${contactId2}`,
        );

        const contact1 = await prisma.contact.findUnique({
            where: { id: contactId1 },
        });

        const contact2 = await prisma.contact.findUnique({
            where: { id: contactId2 },
        });

        if (!contact1 || !contact2) {
            throw new Error("Um ou ambos os usuários não existem.");
        }

        console.log("Contatos encontrados:", contact1, contact2);

        const friendRequest = await prisma.friendRequest.findFirst({
            where: {
                OR: [
                    {
                        senderId: contactId1,
                        receiverId: contactId2,
                        status: "accepted",
                    },
                    {
                        senderId: contactId2,
                        receiverId: contactId1,
                        status: "accepted",
                    },
                ],
            },
        });

        console.log("Pedido de amizade encontrado:", friendRequest);

        if (!friendRequest) {
            throw new Error("Esses usuários não são amigos.");
        }

        await prisma.friendRequest.delete({
            where: { id: friendRequest.id },
        });

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

export default new DeleteContactService();
