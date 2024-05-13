'use server'

import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

export async function testUpdate(id: string, data: Object) {
    const request = await prisma.request.update({
        where: { id },
        data: { ...data },
    })
    if (request === null) {
        return notFound()
    }
}
