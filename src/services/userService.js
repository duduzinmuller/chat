import "dotenv/config.js";
import prisma from "../utils/prismaClient.js";

export const createUser = async (
    name,
    phone,
    bio = null,
    imageUrl = null,
    email,
    password,
) => {
    try {
        const defaultImage = process.env.PHOTO;
        const user = await prisma.contact.create({
            data: {
                name,
                phone,
                bio,
                imageUrl: imageUrl || defaultImage,
                email,
                password,
            },
        });
        return user;
    } catch (error) {
        console.error(error);
        throw new Error("Error creating user", error);
    }
};

export const getUserByPhone = async (phone) => {
    try {
        const user = await prisma.contact.findUnique({
            where: { phone },
        });
        return user;
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching user", error);
    }
};

export const findOrCreateUser = async (
    name,
    email,
    authProvider,
    providerId,
    imageUrl = null,
    bio = null,
    phone,
) => {
    try {
        const defaultImage = process.env.PHOTO;

        const whereCondition =
            authProvider === "GOOGLE"
                ? { googleId: providerId }
                : authProvider === "FACEBOOK"
                  ? { facebookId: providerId }
                  : null;

        if (!whereCondition) {
            throw new Error("Invalid auth provider");
        }
        const user = await prisma.contact.upsert({
            where: whereCondition,
            update: {
                name,
                email,
                bio,
                imageUrl: imageUrl || defaultImage,
                phone,
            },
            create: {
                name,
                email,
                authProvider,
                googleId: authProvider === "GOOGLE" ? providerId : null,
                facebookId: authProvider === "FACEBOOK" ? providerId : null,
                imageUrl: imageUrl || defaultImage,
                bio,
                phone,
            },
        });

        return user;
    } catch (error) {
        console.error(error);
        throw new Error("Error handling social login");
    }
};
