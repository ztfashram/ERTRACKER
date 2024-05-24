import prisma from '@/prisma/client'
import { RequestsTable } from '@/components/requests-table'
import { columns } from '@/components/columns'
import { getUsernames } from '@/utils/getUsernames'
import { AddRequestButton } from '@/app/requests/_components/add-request-button'
import { auth } from '@clerk/nextjs/server'

async function getUserRequests() {
    const { userId } = auth()
    try {
        const requests = await prisma.request.findMany({
            where: { requesterId: userId as string },
            orderBy: { createdAt: 'desc' },
        })
        return requests
    } catch (error) {
        console.error(error)
        return []
    }
}

async function loader() {
    const requests = await getUserRequests()
    const userIds = requests.map((req) => req.requesterId)
    const userMap = await getUsernames(userIds)

    const enrichedRequests = requests.map((request) => ({
        ...request,
        username: userMap.find((user) => user.userId === request.requesterId)!.username,
    }))

    return enrichedRequests
}

export default async function Home() {
    const enrichedRequests = await loader()

    return (
        <div className='space-y-6 p-8'>
            <div className='flex justify-between items-end'>
                <div className='flex flex-1 justify-center text-2xl font-bold'>Your Requests</div>
                <AddRequestButton />
            </div>
            {enrichedRequests && <RequestsTable columns={columns} data={enrichedRequests} />}
        </div>
    )
}
