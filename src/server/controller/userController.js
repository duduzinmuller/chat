import { createUser, getUserByPhone } from "../../services/userService.js";
import validator from "validator";

export const createUserController = async (req, res) => {
    const { name, phone, email, password } = req.body;

    if (password.length < 8) {
        return res
            .status(400)
            .json({ message: "Password must be at least 8 characters long" });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    try {
        const user = await createUser(name, phone, email, password);
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
