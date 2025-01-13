import deleteContactService from "../../services/deleteContactService.js";

class deleteContactController {
    async removeFriend(req, res) {
        const { contactId } = req.params;
        const currentContactId = req.contact.id;

        try {
            const response = await deleteContactService.removeFriend(
                currentContactId,
                parseInt(contactId),
            );
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new deleteContactController();
