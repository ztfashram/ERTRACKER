import { Type_of_Request, Status } from '@prisma/client'
import { z } from 'zod'

export const baseRequestSchema = z.object({
    title: z.string().min(1, { message: 'Title cannot be empty' }),
    customer: z.string().optional(),
    description: z.string().optional(),
    type: z.nativeEnum(Type_of_Request).default(Type_of_Request.Manufacturing_Drawing),
    status: z.nativeEnum(Status).default(Status.Open),
})
export type BaseRequestFormValues = z.infer<typeof baseRequestSchema>
