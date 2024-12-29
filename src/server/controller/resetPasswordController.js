import bcrypt from "bcrypt";
import {
    createPasswordReset,
    verifyResetCode,
} from "../../services/resetPasswordService.js";
import prisma from "../../utils/prismaClient.js";

export const sendResetPasswordCode = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "O campo email é obrigatório." });
    }

    try {
        const response = await createPasswordReset(email);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const resetPassword = async (req, res) => {
    const { email, resetCode, newPassword } = req.body;

    if (!email || !resetCode || !newPassword) {
        return res
            .status(400)
            .json({
                error: "Os campos email, resetCode e newPassword são obrigatórios.",
            });
    }

    try {
        await verifyResetCode(email, resetCode);

        const hashedPassword = await bcrypt.hash(newPassword, 10);

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
