import "dotenv/config.js";
import { randomBytes } from "crypto";
import nodemailer from "nodemailer";
import prisma from "../utils/prismaClient.js";

const generateVerificationCode = () => {
    return randomBytes(3).toString("hex").toUpperCase();
};

const sendVerificationEmail = async (email, code) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Código de Verificação",
        text: `Seu código de verificação é: ${code}. Este código expirará em 10 minutos.`,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Erro ao enviar o email:", error);
        throw new Error("Erro ao enviar o código de verificação.");
    }
};

export const createEmailVerification = async (email) => {
    const code = generateVerificationCode();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    // Encontrar o Contact pelo email
    const contact = await prisma.contact.findUnique({
        where: { email },
    });

    if (!contact) {
        throw new Error("Contato não encontrado.");
    }

    // Criar a verificação de email com a relação ao contato usando o contactId
    const verification = await prisma.emailVerification.create({
        data: {
            code,
            expiresAt,
            contactId: contact.id, // Aqui estamos usando o contactId para associar
        },
    });

    await sendVerificationEmail(email, code);

    return verification;
};

export const verifyEmailCode = async (email, code) => {
    const verification = await prisma.emailVerification.findFirst({
        where: { code, contact: { email } }, // Usando a relação entre contact e email
    });

    if (!verification) {
        throw new Error("Código de verificação inválido");
    }

    const now = new Date();
    if (now > verification.expiresAt) {
        throw new Error("O código de verificação expirou.");
    }

    return verification;
};
