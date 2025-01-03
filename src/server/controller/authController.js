import {
    loginUser,
    findOrAuthenticateUser,
} from "../../services/authService.js";

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

export const socialLoginControllerExists = async (req, res) => {
    const { name, email, authProvider, providerId, imageUrl, bio, phone } =
        req.body;

    if (!authProvider || !providerId) {
        return res
            .status(400)
            .json({ message: "Auth provider and provider ID are required" });
    }

    if (!["GOOGLE", "FACEBOOK"].includes(authProvider)) {
        return res.status(400).json({ message: "Invalid auth provider" });
    }

    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
    }

    try {
        const user = await findOrAuthenticateUser(
            name,
            email,
            authProvider,
            providerId,
            imageUrl || null,
            bio || null,
            phone || null,
        );

        return res.status(200).json(user);
    } catch (error) {
        console.error("Error handling social login:", error);
        return res
            .status(500)
            .json({ message: "Error processing social login" });
    }
};
