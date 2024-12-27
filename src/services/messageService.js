import prisma from "../utils/prismaClient.js";

export const createMessage = async (
    content,
    fileUrl,
    fileType,
    contactData,
) => {
    try {
        const message = await prisma.message.create({
            data: {
                content,
                fileUrl,
                fileType,
                contact: {
                    connectOrCreate: {
                        where: { phone: contactData.phone },
                        create: {
                            name: contactData.name,
                            phone: contactData.phone,
                        },
                    },
                },
            },
        });
        return message;
    } catch (error) {
        console.error(error);
        throw new Error("Error creating message", error);
    }
};

export const getMessagesByUserId = async (contactId) => {
    try {
        const messages = await prisma.message.findMany({
            where: { contactId },
            orderBy: {
                createdAt: "asc",
            },
        });
        return messages;
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching messages", error);
    }
};
