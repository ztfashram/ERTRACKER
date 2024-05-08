import prisma from '@/prisma/client'

export default async function EditRequestPage({ params }: { params: { id: string } }) {
    const request = await prisma.request.findUnique({ where: { id: params.id } })

    return <div>Request {request?.id}</div>
}
