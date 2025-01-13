import { getContactById } from "../../services/getByContactService.js";

export const getContact = async (req, res) => {
    try {
        const contact = await getContactById(req.params.contactId);
        res.status(200).json(contact);
    } catch (error) {
        if (error.message === "Contato não encontrado") {
            res.status(404).json({ message: error.message });
        } else if (
            error.message ===
            "ID inválido. Deve ser um número inteiro positivo."
        ) {
            res.status(400).json({ message: error.message });
        } else {
            console.error(error);
            res.status(500).json({ message: "Erro interno no servidor" });
        }
    }
};
