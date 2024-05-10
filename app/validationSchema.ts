import { z } from 'zod'

export const baseRequestSchema = z.object({
    title: z.string().min(1, { message: 'Title cannot be empty' }),
    customer: z.string().optional(),
    description: z.string().optional(),
    type: z
        .enum(['Manufacturing_Drawing', 'Basic_Drawing', 'Technical_Enquiry', 'Drawing_Update', 'Other'])
        .default('Manufacturing_Drawing'),
    isCompleted: z.boolean().default(false),
})
export type BaseRequestFormValues = z.infer<typeof baseRequestSchema>

export const editRequestSchema = baseRequestSchema.extend({
    _id: z.string(),
    requesterId: z.string(),
})

export type EditRequestSchemaValues = z.infer<typeof editRequestSchema>
