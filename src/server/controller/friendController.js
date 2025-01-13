import friendService from "../../services/friendService.js";

class FriendController {
    async sendFriendRequest(req, res) {
        const { senderId, receiverId } = req.body;

        try {
            const request = await friendService.sendFriendRequest(
                senderId,
                receiverId,
            );
            res.status(200).json({
                message: "Solicitação de amizade enviada!",
                request,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async acceptFriendRequest(req, res) {
        const { requestId } = req.params;

        try {
            if (isNaN(requestId)) {
                return res
                    .status(400)
                    .json({ error: "ID de solicitação inválido." });
            }

            const request = await friendService.acceptFriendRequest(
                parseInt(requestId),
            );
            res.status(200).json({
                message: "Solicitação de amizade aceita!",
                request,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async rejectFriendRequest(req, res) {
        const { requestId } = req.params;

        try {
            const request = await friendService.rejectFriendRequest(
                parseInt(requestId),
            );
            res.status(200).json({
                message: "Solicitação de amizade rejeitada.",
                request,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new FriendController();
