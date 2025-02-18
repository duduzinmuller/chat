import prisma from "../utils/prismaClient.js";
import validator from "validator";

export const updateUserService = async (
    contactId,
    { name, phone, email, bio, imageUrl },
) => {
    if (!contactId) {
        throw new Error("Contact ID is required");
    }

    if (!validator.isUUID(contactId)) {
        throw new Error("Invalid contact ID format (must be a valid UUID)");
    }

    if (email && !validator.isEmail(email)) {
        throw new Error("Invalid email format");
    }

    if (phone && !validator.isMobilePhone(phone, "any")) {
        throw new Error("Invalid phone number format");
    }

    const existingContact = await prisma.contact.findUnique({
        where: { id: contactId },
    });

    if (!existingContact) {
        throw new Error(`No contact found with ID ${contactId}`);
    }

    const dataToUpdate = {
        name: name || undefined,
        phone: phone || undefined,
        email: email || undefined,
        bio: bio || undefined,
        imageUrl: imageUrl || undefined,
    };

    try {
        const updatedUser = await prisma.contact.update({
            where: { id: contactId },
            data: dataToUpdate,
        });

        return updatedUser;
    } catch (error) {
        console.error("Error updating contact:", error.message);
        throw new Error("Failed to update contact");
    }
};
