import prisma from "../utils/prismaClient.js";

export const getContactProviderService = async (provider, providerId) => {
    try {
        const contact = await prisma.contact.findUnique({
            where: {
                [provider]: providerId,
            },
        });
        return contact;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
