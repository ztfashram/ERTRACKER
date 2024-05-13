import prisma from '@/prisma/client'
import { RequestForm } from '@/components/request-form'
import { Separator } from '@/components/ui/separator'

export default async function EditRequestPage({ params }: { params: { id: string } }) {
    const request = await prisma.request.findUnique({ where: { id: params.id } })

    return (
        <div className='flex flex-col items-center justify-center space-y-6'>
            <div className=''>
                <h3 className='text-lg font-medium pt-4'>Edit engineering request</h3>
            </div>
            <Separator className='w-[600px]' />
            <RequestForm request={request} />
        </div>
    )
}
