import "dotenv/config.js";
import { randomBytes } from "crypto";
import nodemailer from "nodemailer";
import prisma from "../utils/prismaClient.js";

const generateResetCode = () => {
    return randomBytes(3).toString("hex").toUpperCase();
};

const sendResetPasswordEmail = async (email, code) => {
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
        subject: "Redefinição de Senha - Código de Verificação",
        text: `Olá,

       Recebemos uma solicitação para redefinir sua senha. 
       Seu código de verificação é: ${code}.
       Este código é válido por 10 minutos.

       Se você não solicitou essa redefinição, por favor, ignore este e-mail.

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

export const createPasswordReset = async (email) => {
    const code = generateResetCode();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    const contact = await prisma.contact.findUnique({
        where: { email },
    });

    if (!contact) {
        throw new Error("Contato não encontrado.");
    }

    await prisma.contact.update({
        where: { email },
        data: {
            resetCode: code,
            resetCodeExpiration: expiresAt,
        },
    });

    await sendResetPasswordEmail(email, code);

    return { message: "Código de redefinição enviado com sucesso!" };
};

export const verifyResetCode = async (email, code) => {
    const contact = await prisma.contact.findUnique({
        where: { email },
    });

    if (!contact) {
        throw new Error("Contato não encontrado.");
    }

    if (contact.resetCode !== code) {
        throw new Error("Codigo de verificação inválido");
    }

    const now = new Date();
    if (now > contact.resetCodeExpiration) {
        throw new Error("O código de verificação expirou.");
    }

    return { message: "Código de verificação válido." };
};
