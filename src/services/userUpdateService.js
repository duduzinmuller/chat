import prisma from "../utils/prismaClient.js";
import validator from "validator";

export const updateUserService = async (
    contactId,
    { name, phone, email, bio, imageUrl },
) => {
    if (!contactId) {
        throw new Error("Contact ID is required");
    }

    if (email && !validator.isEmail(email)) {
        throw new Error("Formato do email invalido");
    }

    if (phone && !validator.isMobilePhone(phone, "any")) {
        throw new Error("Formato de numero de telefone invalido");
    }

    const dataToUpdate = {
        name: name || undefined,
        phone: phone || undefined,
        email: email || undefined,
        bio: bio || undefined,
        imageUrl: imageUrl || undefined,
    };

    const updatedContact = await prisma.contact.update({
        where: { id: contactId },
        data: dataToUpdate,
    });

    return updatedContact;
};
