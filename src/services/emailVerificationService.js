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
        text: `Olá,

       Seu código de verificação é: ${code}.
       Este código é válido por 10 minutos para confirmar sua identidade com segurança.

       Se você não solicitou este código, por favor, ignore este e-mail.

       Atenciosamente,
       Berserk Mode
       Telefone: 4384027399`,
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

    const contact = await prisma.contact.findUnique({
        where: { email },
    });

    if (!contact) {
        throw new Error("Contato não encontrado.");
    }

    const verification = await prisma.emailVerification.create({
        data: {
            code,
            expiresAt,
            contactId: contact.id,
        },
    });

    await sendVerificationEmail(email, code);

    return verification;
};

export const verifyEmailCode = async (email, code) => {
    const verification = await prisma.emailVerification.findFirst({
        where: { code, contact: { email } },
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
