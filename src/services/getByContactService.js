import prisma from "../utils/prismaClient.js";

export const getContactById = async (contactId) => {
    try {
        if (!contactId || typeof contactId !== "string") {
            throw new Error("ID de contato inválido.");
        }

        const contact = await prisma.contact.findUnique({
            where: {
                id: contactId,
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
