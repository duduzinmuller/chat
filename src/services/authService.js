import "dotenv/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../utils/prismaClient.js";

export const loginUser = async (email, password) => {
    const contact = await prisma.contact.findUnique({
        where: { email },
    });

    if (!contact) {
        throw new Error("Usuário não encontrado. ");
    }

    const isPasswordValid = await bcrypt.compare(password, contact.password);
    if (!isPasswordValid) {
        throw new Error("Senha incorreta.");
    }

    const token = jwt.sign(
        { id: contact.id, email: contact.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
    );

    return {
        token,
        contact: { id: contact.id, email: contact.email, name: contact.name },
    };
};

export const findOrAuthenticateUser = async (
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

        const user = await prisma.contact.findUnique({
            where: whereCondition,
        });

        if (user) {
            return await prisma.contact.update({
                where: { id: user.id },
                data: {
                    name,
                    email,
                    bio,
                    imageUrl: imageUrl || defaultImage,
                    phone,
                },
            });
        } else {
            return await prisma.contact.create({
                data: {
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
        }
    } catch (error) {
        console.error(error);
        throw new Error("Error handling social login");
    }
};
