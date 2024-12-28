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
