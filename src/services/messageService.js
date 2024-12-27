import prisma from "../../utils/prismaClient";

export const createMessage = async (userId, content, fileUrl, fileType) => {
    try {
        const message = await prisma.message.create({
            data: {
                content,
                fileUrl,
                fileType,
                userId,
            },
        });
        return message;
    } catch (error) {
        throw new Error("Error creating message", error);
    }
};

export const getMessagesByUserId = async (userId) => {
    try {
        const messages = await prisma.message.findMany({
            where: { userId },
            orderBy: {
                createdAt: "asc",
            },
        });
        return messages;
    } catch (error) {
        throw new Error("Error fetching messages", error);
    }
};
