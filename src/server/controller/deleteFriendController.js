import deleteContactService from "../../services/deleteContactService.js";

class DeleteContactController {
    async removeFriend(req, res) {
        try {
            const { contactId } = req.params;
            const currentContactId = req.user.id;

            if (!currentContactId) {
                return res
                    .status(401)
                    .json({ error: "Usuário não autenticado." });
            }

            const response = await deleteContactService.removeFriend(
                currentContactId,
                contactId,
            );

            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new DeleteContactController();
