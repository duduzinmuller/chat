import prisma from "../utils/prismaClient.js";

export const getContactById = async (contactId) => {
    try {
        const id = parseInt(contactId, 10);

        const contact = await prisma.contact.findUnique({
            where: {
                id: id,
            },
        });

        if (!contact) {
            throw new Error("Contato não encontrado");
        }

        return contact;
    } catch (error) {
        throw new Error(error);
    }
};
