import prisma from "../../utils/prisma";

const createProperty = async (propertyData: any) => {
    const result = await prisma.property.create({
        data: propertyData,
    });
    return result;
}
const getAllProperties = async () => {
    const result = await prisma.property.findMany({
        include: {
            category: true,
            landlord: {
                select: {
                    name: true,
                    email: true,
                    contactNumber: true,
                },
            }
        }
    });
    return result;
}
const getPropertyById = async (id: string) => {
    const result = await prisma.property.findUnique({
        where: { id },
        include: {
            category: true,
            landlord: true
        }
    });
    return result;
}
const updateProperty = async (id: string, payload: any) => {
    const result = await prisma.property.update({
        where: { id },
        data: payload,
    });
    return result;
}
const deleteProperty = async (id: string) => {
    const result = await prisma.property.delete({
        where: { id }
    });
    return result;
}

export const PropertyService = {
    createProperty,
    getAllProperties,
    getPropertyById,
    updateProperty,
    deleteProperty
};