import { sendVerificationCode } from "../../services/phoneVerificationService.js";
import prisma from "../../utils/prismaClient.js";

export const sendVerification = async (req, res) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        return res
            .status(400)
            .json({ error: "Número de telefone é obrigatório" });
    }

    let cleanPhoneNumber = phoneNumber.replace(/\s+/g, "").trim();

    if (!cleanPhoneNumber.startsWith("+55")) {
        cleanPhoneNumber = "+55" + cleanPhoneNumber;
    }

    console.log("Número de telefone limpo:", cleanPhoneNumber);

    try {
        const contact = await prisma.contact.findUnique({
            where: { phone: cleanPhoneNumber },
        });

        if (!contact) {
            console.log(
                "Contato não encontrado para o número:",
                cleanPhoneNumber,
            );
            return res.status(404).json({
                error: "Contato não encontrado para este número de telefone",
            });
        }

        await sendVerificationCode(cleanPhoneNumber, contact.id);

        return res
            .status(200)
            .json({ message: "Código de verificação enviado com sucesso!" });
    } catch (error) {
        console.error("Erro ao enviar código de verificação:", error);
        return res
            .status(500)
            .json({ error: "Erro ao enviar código de verificação" });
    }
};
