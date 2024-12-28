import { loginUser } from "../../services/authService.js";

export const loginController = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Email e senha são obrigatórios." });
    }

    try {
        const { token, contact } = await loginUser(email, password);
        res.status(200).json({
            message: "Login realizado com sucesso",
            token,
            contact,
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
