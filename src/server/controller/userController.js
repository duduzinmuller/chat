// controllers/userController.js
import { createUser, getUserByPhone } from "../../services/userService.js";

export const createUserController = async (req, res) => {
    const { name, phone } = req.body;

    try {
        const user = await createUser(name, phone);
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
