import { z } from 'zod';

const createRequestSchema = z.object({
    body: z.object({
        propertyId: z.string({ message: 'Property ID is required' }),
        moveInDate: z.string({ message: 'Move-in date is required' }),
        rentalDuration: z.number().int().positive('Rental duration must be a positive integer'),
        message: z.string().optional(),
    }),
});

export const RentalRequestValidation = {
    createRequestSchema,
};