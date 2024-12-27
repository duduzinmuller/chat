import { createUser, getUserByPhone } from "../../services/userService.js";

const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(?:\+?55)?\(?(\d{2})\)?\d{4,5}-?\d{4}$/;
    return phoneRegex.test(phone);
};

const formatPhoneNumber = (phone) => {
    let cleanPhoneNumber = phone.replace(/\D/g, "").trim();

    if (!cleanPhoneNumber.startsWith("55")) {
        cleanPhoneNumber = "55" + cleanPhoneNumber;
    }

    if (cleanPhoneNumber.length !== 13) {
        throw new Error(
            "Invalid phone number. It must contain the country code +55 and a valid DDD.",
        );
    }

    return `+${cleanPhoneNumber.slice(0, 2)} ${cleanPhoneNumber.slice(2, 7)}-${cleanPhoneNumber.slice(7)}`;
};

export const createUserController = async (req, res) => {
    const { name, phone } = req.body;

    try {
        const formattedPhone = formatPhoneNumber(phone);

        if (!validatePhoneNumber(formattedPhone)) {
            return res.status(400).json({
                message:
                    "Invalid phone number format. Use a valid Brazilian number with DDD.",
            });
        }

        const user = await createUser(name, formattedPhone);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserController = async (req, res) => {
    const { phone } = req.params;

    try {
        const formattedPhone = formatPhoneNumber(phone);

        if (!validatePhoneNumber(formattedPhone)) {
            return res.status(400).json({
                message:
                    "Invalid phone number format. Use a valid Brazilian number with DDD.",
            });
        }

        // Buscar o usuário pelo número de telefone formatado
        const user = await getUserByPhone(formattedPhone);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
