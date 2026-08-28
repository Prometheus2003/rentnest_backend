import prisma from '../../utils/prisma';

const createReview = async (tenantId: string, payload: any) => {
    const property = await prisma.property.findUnique({
        where: { id: payload.propertyId }
    });

    if (!property) {
        throw new Error("Property not found");
    }

    const result = await prisma.review.create({
        data: {
            tenantId,
            propertyId: payload.propertyId,
            rating: payload.rating,
            comment: payload.comment
        }
    });

    return result;
};

export const ReviewService = { createReview };
