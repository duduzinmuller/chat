import "dotenv/config.js";
import twilio from "twilio";
import prisma from "../utils/prismaClient.js";

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
);

export const sendVerificationCode = async (phoneNumber, contactId) => {
    try {
        const verificationCode = Math.floor(
            100000 + Math.random() * 900000,
        ).toString();

        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 5);

        await prisma.phoneVerification.create({
            data: {
                phone: phoneNumber,
                code: verificationCode,
                expiresAt: expirationTime,
            },
        });

        await client.messages.create({
            body: `Seu código de verificação é: ${verificationCode}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber,
        });

        console.log(`Codigo de verificação enviado para ${phoneNumber}`);
    } catch (error) {
        console.error("Erro ao enviar código de verificação:", error);
        throw new Error("Erro ao enviar código de verificação");
    }
};
