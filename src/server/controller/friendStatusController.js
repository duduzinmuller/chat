import friendStatusService from "../../services/friendStatusService.js";

const friendStatusController = {
    async getFriendsStatus(req, res) {
        try {
            const contactId = req.params.contactId;
            const friendStatus = await friendStatusService.getFriendStatus(
                req,
                contactId,
            );
            res.json(friendStatus);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erro ao obter status de amizade",
            });
        }
    },
};

export default friendStatusController;
