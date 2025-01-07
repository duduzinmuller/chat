import { searchContactByNameOrPhone } from "../../services/contactService.js";

export const searchContactController = async (req, res) => {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
        return res
            .status(400)
            .json({
                error: "Query parameter is required and must be a string.",
            });
    }

    try {
        const contacts = await searchContactByNameOrPhone(query);

        if (contacts.length === 0) {
            return res.status(404).json({ message: "No contacts found." });
        }

        return res.status(200).json(contacts);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
