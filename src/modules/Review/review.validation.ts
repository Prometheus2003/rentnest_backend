import { z } from 'zod';

const createReviewSchema = z.object({
    body: z.object({
        propertyId: z.string({ message: 'Property ID is required' }),
        rating: z.number().int().min(1).max(5, "Rating must be between 1 and 5"),
        comment: z.string({ message: 'Comment is required' })
    })
});

export const ReviewValidation = { createReviewSchema };
