import {
    createEmailVerification,
    verifyEmailCode,
} from "../../services/emailVerificationService.js";

export const sendVerificationCodeController = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email é necessário" });
    }

    try {
        const verification = await createEmailVerification(email);
        res.status(200).json({
            message: "Código de verificação enviado com sucesso!",
            verification,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const verifyCodeController = async (req, res) => {
    const { email, code } = req.body;

    if (!email || !code) {
        return res
            .status(400)
            .json({ message: "Email e código são necessários." });
    }

    try {
        const verification = await verifyEmailCode(email, code);
        res.status(200).json({
            message: "Código de verificação válido!",
            contact: verification.contact,
            verification,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
