'use server'

import prisma from '@/prisma/client'
import {
    baseRequestSchema,
    BaseRequestFormValues,
    editRequestSchema,
    EditRequestSchemaValues,
} from '@/app/validationSchema'
import { revalidatePath } from 'next/cache'
import { notFound } from 'next/navigation'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function addRequest(data: BaseRequestFormValues) {
    const { userId } = auth()
    if (!userId) {
        return NextResponse.json({ error: 'Unauthrozied' }, { status: 401 })
    }
    const result = baseRequestSchema.safeParse(data)
    if (!result.success) {
        return NextResponse.json(result.error.errors, { status: 400 })
    }

    const requestBody = { ...result.data, requesterId: userId }

    await prisma.request.create({
        data: {
            ...requestBody,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    })
    revalidatePath('/requests')
    redirect('/requests')
}

export async function updateRequest(data: EditRequestSchemaValues) {
    const id = data._id
    const { userId } = auth()
    if (!userId) {
        return NextResponse.json({ error: 'Unauthrozied' }, { status: 401 })
    }
    const result = editRequestSchema.safeParse(data)
    if (!result.success) {
        return NextResponse.json(result.error.errors, { status: 400 })
    }

    await prisma.request.update({
        where: { id },
    })
}

export async function deleteRequest(id: string) {
    const request = await prisma.request.delete({
        where: { id },
    })
    if (request === null) {
        return notFound()
    }
}
