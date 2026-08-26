import prisma from '../../utils/prisma';

const createRentalRequest = async (tenantId: string, payload: any) => {
    const property = await prisma.property.findUnique({
        where: { id: payload.propertyId },
    });

    if (!property) {
        throw new Error('Property not found');
    }

    const result = await prisma.rentalRequest.create({
        data: {
            tenantId,
            propertyId: payload.propertyId,
            landlordId: property.landlordId,
            moveInDate: new Date(payload.moveInDate),
            rentalDuration: payload.rentalDuration,
            message: payload.message,
        },
    });

    return result;
}

const getMyRequests = async (tenantId: string) => {
    const result = await prisma.rentalRequest.findMany({
        where: { tenantId },
        include: {
            property: true,
        },
    });

    return result;
}

export const RentalRequestService = {
    createRentalRequest,
    getMyRequests,
};