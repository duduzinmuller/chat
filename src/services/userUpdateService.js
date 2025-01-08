import prisma from "../utils/prismaClient.js";
import validator from "validator";

export const updateUserService = async (
    contactId,
    { name, phone, email, bio, imageUrl },
) => {
    if (!contactId) {
        throw new Error("User ID is required");
    }

    const userIdInt = parseInt(contactId, 10);
    if (isNaN(userIdInt)) {
        throw new Error("Invalid user ID format");
    }

    if (email && !validator.isEmail(email)) {
        throw new Error("Invalid email format");
    }

    if (phone && !validator.isMobilePhone(phone, "any")) {
        throw new Error("Invalid phone number format");
    }

    const dataToUpdate = {
        name: name || undefined,
        phone: phone || undefined,
        email: email || undefined,
        bio: bio || undefined,
        imageUrl: imageUrl || undefined,
    };

    const updatedUser = await prisma.contact.update({
        where: { id: userIdInt },
        data: dataToUpdate,
    });

    return updatedUser;
};
