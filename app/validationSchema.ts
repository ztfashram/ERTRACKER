import { z } from 'zod'

export const baseRequestSchema = z.object({
    title: z.string().min(1, { message: 'Title cannot be empty' }),
    customer: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    type: z
        .enum(['Manufacturing_Drawing', 'Basic_Drawing', 'Technical_Enquiry', 'Drawing_Update', 'Other'])
        .default('Manufacturing_Drawing'),
    isCompleted: z.boolean().default(false),
})

export const addRequestSchema = baseRequestSchema.extend({
    requesterId: z.string(),
})

export const updateRequestSchema = z.object({
    title: z.string().optional(),
    customer: z.string().optional(),
    description: z.string().optional(),
    type: z.enum(['Manufacturing_Drawing', 'Basic_Drawing', 'Technical_Enquiry', 'Drawing_Update', 'Other']).optional(),
    isCompleted: z.boolean(),
})
