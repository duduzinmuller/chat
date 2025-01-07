import prisma from "../utils/prismaClient.js";

export const searchContactByNameOrPhone = async (query) => {
    try {
        return await prisma.contact.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { phone: { contains: query } },
                ],
            },
        });
    } catch (error) {
        throw new Error(`Error searching contact: ${error.message}`);
    }
};
