import { updateUserService } from "../../services/userUpdateService.js";

export const updateUserController = async (req, res) => {
    const { contactId } = req.params;
    const { name, phone, email, bio, imageUrl } = req.body;

    try {
        const updatedContact = await updateUserService(contactId, {
            name,
            phone,
            email,
            bio,
            imageUrl,
        });
        return res.status(200).json({
            message: "Contato atualizado com sucesso.",
            contact: updatedContact,
        });
    } catch (error) {
        console.error("Erro ao atualizar o contato", error.message);
        return res.status(500).json({ message: error.message });
    }
};
