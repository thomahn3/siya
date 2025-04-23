import { z } from 'zod';

export const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
})

export const profileSetupSchema = z.object({
    id: z.string(),
    name: z.string().min(1, {message: "Name is required"}),
    email: z.string().email(),
    phone: z.string()
        .regex(/^\d{10}$/, { message: "Phone must be a 10-digit number" }), // Ensure phone is exactly 10 digits
    postcode: z.string()
        .refine(
        (abn) =>
            (/^02[0-9]{2}$/.test(abn) && parseInt(abn) >= 200 && parseInt(abn) <= 299) ||
            (/^08[0-9]{2}$/.test(abn) && parseInt(abn) >= 800 && parseInt(abn) <= 999) ||
            (/^[1-9][0-9]{3}$/.test(abn) && parseInt(abn) >= 1000 && parseInt(abn) <= 9999),
        { message: "Invalid Postcode" }
    ),
    abn: z.union([
        z.string()
            .regex(/^\d{11}$/, { message: "ABN must be 11 digits" }),
        z.literal(''),
    ], { message: "ABN must be 11 digits" }),
    appUseType: z.enum(['offer', 'request'], {message: "Select one option"}),
    entityType: z.enum(['personal', 'business'], {message: "Select one option"}),
});

export const updateProfileSchema = z.object({
    id: z.string(),
    name: z.string().min(1, {message: "Name is required"}),
    email: z.string().email(),
    phone: z.string()
        .regex(/^\d{10}$/, { message: "Phone must be a 10-digit number" }), // Ensure phone is exactly 10 digits
    postcode: z.string()
        .refine(
        (abn) =>
            (/^02[0-9]{2}$/.test(abn) && parseInt(abn) >= 200 && parseInt(abn) <= 299) ||
            (/^08[0-9]{2}$/.test(abn) && parseInt(abn) >= 800 && parseInt(abn) <= 999) ||
            (/^[1-9][0-9]{3}$/.test(abn) && parseInt(abn) >= 1000 && parseInt(abn) <= 9999),
        { message: "Invalid Postcode" }
    ),
    abn: z.union([
        z.string()
            .regex(/^\d{11}$/, { message: "ABN must be 11 digits" }),
        z.literal(''),
    ], { message: "ABN must be 11 digits" }),
});

export const userDataSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(10).max(10),
    postcode: z.string()
        .refine(
        (abn) =>
            !abn || 
            (/^02[0-9]{2}$/.test(abn) && parseInt(abn) >= 200 && parseInt(abn) <= 299) ||
            (/^08[0-9]{2}$/.test(abn) && parseInt(abn) >= 800 && parseInt(abn) <= 999) ||
            (/^[1-9][0-9]{3}$/.test(abn) && parseInt(abn) >= 1000 && parseInt(abn) <= 9999)
    ),
    abn: z.union([
        z.string().min(11).max(11),
        z.literal(''),
    ]),
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