import { z } from 'zod'

export const baseRequestSchema = z.object({
    title: z.string().min(1, { message: 'Title cannot be empty' }),
    customer: z.string().nullable(),
    description: z.string().nullable(),
    type: z
        .enum(['Manufacturing_Drawing', 'Basic_Drawing', 'Technical_Enquiry', 'Drawing_Update', 'Other'])
        .default('Manufacturing_Drawing'),
    isCompleted: z.boolean().default(false),
})

export const createRequestSchema = baseRequestSchema.extend({
    requesterId: z.string(),
})

const requestSchema = baseRequestSchema.extend({
    requesterId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export type RequestSchema = z.infer<typeof requestSchema>

export const updateRequestSchema = z.object({
    title: z.string().optional(),
    customer: z.string().optional(),
    description: z.string().optional(),
    type: z.enum(['Manufacturing_Drawing', 'Basic_Drawing', 'Technical_Enquiry', 'Drawing_Update', 'Other']).optional(),
    isCompleted: z.boolean(),
})
