// services/userService.js
import prisma from "../utils/prismaClient.js";

export const createUser = async (name, phone) => {
    try {
        const user = await prisma.user.create({
            data: {
                name,
                phone,
            },
        });
        return user;
    } catch (error) {
        throw new Error("Error creating user", error);
    }
};

export const getUserByPhone = async (phone) => {
    try {
        const user = await prisma.user.findUnique({
            where: { phone },
        });
        return user;
    } catch (error) {
        throw new Error("Error fetching user", error);
    }
};
