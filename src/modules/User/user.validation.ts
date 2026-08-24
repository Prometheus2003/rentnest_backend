import { z } from 'zod';

const createUserSchema = z.object({
    body: z.object({
        name: z.string({ message: 'Name is required' }),
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        role: z.enum(['ADMIN', 'LANDLORD', 'TENANT']).optional(),
        profileImage: z.string().optional(),
        bio: z.string().optional(),
        contactNumber: z.string().optional(),
    })
});

const loginSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email address'),
        password: z.string().min(1, 'Password is required'),
    })
});

export const UserValidation = {
    createUserSchema,
    loginSchema,
};