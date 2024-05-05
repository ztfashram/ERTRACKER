import prisma from '@/prisma/client'
import RequestsTable from './RequestsTable'
import { columns } from './columns'

async function getRequests() {
    try {
        const requests = await prisma.request.findMany()
        return requests
    } catch (error) {
        console.error(error)
    }
}

export default async function RequestsPage() {
    const requests = await getRequests()
    console.log(requests)
    return (
        <div className='text-3xl font-bold space-y-6 p-8'>
            <h2 className='text-2xl text-center my-4'>Engineering Requests</h2>
            {requests && <RequestsTable columns={columns} data={requests} />}
        </div>
    )
}
