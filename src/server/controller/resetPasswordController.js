import bcrypt from "bcrypt";
import {
    createPasswordReset,
    verifyResetCode,
} from "../../services/resetPasswordService.js";
import prisma from "../../utils/prismaClient.js";

/**
 * Etapa 1: Enviar código de redefinição
 */
export const sendResetPasswordCode = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "O campo email é obrigatório." });
    }

    try {
        const response = await createPasswordReset(email); // Gera e salva o código
        res.status(200).json({
            message: "Código de redefinição enviado.",
            ...response,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Etapa 2: Verificar código de redefinição
 */
export const verifyResetPasswordCode = async (req, res) => {
    const { email, resetCode } = req.body;

    if (!email || !resetCode) {
        return res
            .status(400)
            .json({ error: "Os campos email e resetCode são obrigatórios." });
    }

    try {
        await verifyResetCode(email, resetCode); // Valida o código
        res.status(200).json({ message: "Código validado com sucesso." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Etapa 3: Redefinir senha
 */
export const resetPassword = async (req, res) => {
    const { email, resetCode, newPassword } = req.body;

    if (!email || !resetCode || !newPassword) {
        return res.status(400).json({
            error: "Os campos email, resetCode e newPassword são obrigatórios.",
        });
    }

    try {
        // Valida o código antes de continuar
        await verifyResetCode(email, resetCode);

        // Criptografa a nova senha
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Atualiza a senha no banco de dados e limpa o código
        await prisma.contact.update({
            where: { email },
            data: {
                password: hashedPassword,
                resetCode: null,
                resetCodeExpiration: null,
            },
        });

        res.status(200).json({ message: "Senha redefinida com sucesso!" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
