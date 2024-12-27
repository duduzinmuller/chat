import prisma from "../utils/prismaClient.js";

export const createUser = async (name, phone, bio, imageUrl) => {
        try {
       const defaultImage = "https://labes.inf.ufes.br/wp-content/uploads/sem-foto.jpg";

        const user = await prisma.contact.create({
            data: {
                name: name,
                phone: phone,
                bio: bio,
                imageUrl: imageUrl || defaultImage,
            },
        });
        return user;
    } catch (error) {
        console.error(error);
        throw new Error("Error creating user", error);
    }
};

export const getUserByPhone = async (phone) => {
    try {
        const user = await prisma.contact.findUnique({
            where: { phone },
        });
        return user;
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching user", error);
    }
};
