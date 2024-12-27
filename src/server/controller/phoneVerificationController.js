import { sendVerificationCode } from "../../services/phoneVerificationService.js";

export const sendVerification = async (req, res) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        return res
            .status(400)
            .json({ error: "Número de telefone é obrigatório" });
    }

    try {
        await sendVerificationCode(phoneNumber);
        return res
            .status(200)
            .json({ message: "Código de verificação enviado com sucesso!" });
    } catch (error) {
        console.error("Erro ao enviar codigo de verificação:", error);
        return res
            .status(500)
            .json({ error: "Erro ao enviar código de verificação" });
    }
};
