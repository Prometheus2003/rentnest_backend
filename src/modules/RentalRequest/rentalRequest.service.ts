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

const getRequestsForLandLord = async (landlordId: string) => {
    const result = await prisma.rentalRequest.findMany({
        where: { landlordId },
        include: {
            property: true,
            tenant: {
                select: {
                    name: true, email: true, contactNumber: true
                }
            }
        },
    });
    return result;

}

const updateRequestStatus = async (requestId: string, landlordId: string, status: 'APPROVED' | 'REJECTED') => {
    const request = await prisma.rentalRequest.findUnique({
        where: { id: requestId },
    });

    if (!request || request.landlordId !== landlordId) {
        throw new Error("You are not authorized to update this request");
    }

    const result = await prisma.rentalRequest.update({
        where: { id: requestId },
        data: { status },
    });

    return result;
}

export const RentalRequestService = {
    createRentalRequest,
    getMyRequests,
    getRequestsForLandLord,
    updateRequestStatus
};