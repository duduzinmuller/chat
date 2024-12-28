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

    const verification = await prisma.emailVerification.create({
        data: {
            email,
            code,
            expiresAt,
            contact: { connect: { email } },
        },
    });

    await sendVerificationEmail(email, code);

    return verification;
};

export const verifyEmailCode = async (email, code) => {
    const verification = await prisma.emailVerification.findFirst({
        where: { email, code },
    });

    if (!verification) {
        throw new Error("Codigo de verificação invalido");
    }

    const now = new Date();
    if (now > verification.expiresAt) {
        throw new Error("O codigo de verificação expirou.");
    }

    return verification;
};
