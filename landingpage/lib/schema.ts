import { z } from 'zod';

export const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
})

export const profileSetupSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    phone: z.string().min(1),
    postcode: z.string().min(1),
    abn: z.string() || null,
    appUseType: z.enum(['offer', 'request']),
    entityType: z.enum(['personal', 'business']),
})

export const userDataSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    postcode: z.string().min(1),
    abn: z.string() || null,
    appUseType: z.enum(['offer', 'request']),
    entityType: z.enum(['personal', 'business']),
    reviewee: z.array(z.object({
        id: z.string(),
        rating: z.number(),
        comment: z.string(),
        createdAt: z.date(),
    })),
    reviewer: z.array(z.object({
        id: z.string(),
        rating: z.number(),
        comment: z.string(),
        createdAt: z.date(),
    })),
})