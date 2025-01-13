export default function authenticate(req, res, next) {
    const contactId = req.headers["x-user-id"];
    console.log("contactId no cabeçalho:", contactId);

    if (!contactId) {
        return res.status(401).json({ error: "Usuário não autenticado." });
    }

    req.user = { id: parseInt(contactId) };
    next();
}
