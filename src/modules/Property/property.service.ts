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
export const PropertyService = {
    createProperty,
    getAllProperties
};