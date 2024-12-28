import { sendVerificationCode } from "../../services/phoneVerificationService.js";
import prisma from "../../utils/prismaClient.js";

const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+55\(\d{2}\)\d{5}-\d{4}$/;
    return phoneRegex.test(phone);
};

const formatPhoneNumber = (phone) => {
    if (!phone) {
        throw new Error("Número de telefone não fornecido.");
    }

    let cleanPhoneNumber = phone.replace(/\D/g, "").trim();

    if (!cleanPhoneNumber.startsWith("55")) {
        cleanPhoneNumber = "55" + cleanPhoneNumber;
    }

    if (cleanPhoneNumber.length !== 13) {
        throw new Error(
            "Número de telefone inválido. Deve conter o código de país +55 e um DDD válido.",
        );
    }

    return `+${cleanPhoneNumber.slice(0, 2)} (${cleanPhoneNumber.slice(2, 4)}) ${cleanPhoneNumber.slice(4, 9)}-${cleanPhoneNumber.slice(9)}`;
};

export const sendVerificationController = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "Nome é obrigatório.",
        });
    }

    try {
        const user = await prisma.contact.findUnique({
            where: { name },
        });

        if (!user) {
            return res.status(404).json({
                message: "Usuário não encontrado.",
            });
        }

        const phone = user.phone;

        const formattedPhone = formatPhoneNumber(phone);

        if (!validatePhoneNumber(formattedPhone)) {
            return res.status(400).json({
                message:
                    "Formato de número de telefone inválido. Use um número válido com DDD brasileiro.",
            });
        }

        await sendVerificationCode(formattedPhone, user.id);

        res.status(200).json({
            message: "Código de verificação enviado com sucesso",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
