import { getContactProviderService } from "../../services/getContactService.js";

export const getContactProviderController = async (req, res) => {
    try {
        const provider = req.body.provider;
        const providerId = req.body.providerId;
        const contact = await getContactProviderService(provider, providerId);
        res.json(contact);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erro ao obter informações de contato",
        });
    }
};
