import prisma from "../../utils/prisma";

const createProperty = async (propertyData: any) => {
    const result = await prisma.property.create({
        data: propertyData,
    });
    return result;
}

export const PropertyService = {
    createProperty,
};