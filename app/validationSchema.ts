import { Type_of_Request } from '@prisma/client'
import { z } from 'zod'

export const baseRequestSchema = z.object({
    title: z.string().min(1, { message: 'Title cannot be empty' }),
    customer: z.string().optional(),
    description: z.string().optional(),
    type: z.nativeEnum(Type_of_Request).default(Type_of_Request.Manufacturing_Drawing),
    isCompleted: z.boolean().default(false),
})
export type BaseRequestFormValues = z.infer<typeof baseRequestSchema>

export const editRequestSchema = baseRequestSchema.extend({
    _id: z.string(),
    requesterId: z.string(),
})

export type EditRequestSchemaValues = z.infer<typeof editRequestSchema>
