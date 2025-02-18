import bcrypt from "bcrypt";
import {
    createUser,
    getUserByPhone,
    findOrCreateUser,
} from "../../services/userService.js";
import validator from "validator";

export const createUserController = async (req, res) => {
    const { name, phone, email, password, bio, imageUrl } = req.body;

    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    if (password.length < 8) {
        return res
            .status(400)
            .json({ message: "Password must be at least 8 characters long" });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await createUser(
            name,
            phone,
            bio,
            imageUrl,
            email,
            hashedPassword,
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

export const socialLoginController = async (req, res) => {
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
        const user = await findOrCreateUser(
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
