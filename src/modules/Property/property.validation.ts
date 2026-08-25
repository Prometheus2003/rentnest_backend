import { z } from 'zod';

const createPropertySchema = z.object({
    body: z.object({
        title: z.string({ message: 'Title is required' }),
        description: z.string({ message: 'Description is required' }),
        price: z.number({ message: 'Price is required' }),
        location: z.string({ message: 'Location is required' }),
        bedrooms: z.number().int().nonnegative(),
        bathrooms: z.number().int().nonnegative(),
        amenities: z.array(z.string()).optional(),
        images: z.array(z.string()).optional(),
        categoryId: z.string({ message: 'Category ID is required' }),
    })
});

const updatePropertySchema = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        price: z.number().optional(),
        location: z.string().optional(),
        bedrooms: z.number().int().nonnegative().optional(),
        bathrooms: z.number().int().nonnegative().optional(),
        amenities: z.array(z.string()).optional(),
        images: z.array(z.string()).optional(),
        categoryId: z.string().optional(),
    })
});

export const PropertyValidation = {
    createPropertySchema,
    updatePropertySchema
};