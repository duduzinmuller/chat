import bcrypt from "bcrypt";
import { createUser, getUserByPhone } from "../../services/userService.js";
import validator from "validator";

export const createUserController = async (req, res) => {
    const { name, phone, email, password, bio, imageUrl } = req.body;

    // Validação de senha
    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    if (password.length < 8) {
        return res
            .status(400)
            .json({ message: "Password must be at least 8 characters long" });
    }

    // Validação de email
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    try {
        // Gera o hash da senha com bcrypt
        const saltRounds = 10; // Define a quantidade de salt rounds (quanto maior, mais seguro, mas mais lento)
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Chama o serviço de criação de usuário com a senha criptografada
        const user = await createUser(
            name,
            phone,
            bio,
            imageUrl,
            email,
            hashedPassword, // Passa a senha criptografada
        );

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserController = async (req, res) => {
    const { phone } = req.params;

    try {
        const user = await getUserByPhone(phone);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
