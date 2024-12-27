import {
    createMessage,
    getMessagesByUserId,
} from "../../services/messageService.js";

export const createMessageController = async (req, res) => {
    const { userId, content, fileUrl, fileType } = req.body;

    try {
        const message = await createMessage(userId, content, fileUrl, fileType);
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMessagesController = async (req, res) => {
    const { userId } = req.params;

    try {
        const messages = await getMessagesByUserId(userId);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
