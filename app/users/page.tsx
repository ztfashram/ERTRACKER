import prisma from '@/prisma/client'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function UsersPage() {
    const { sessionClaims } = auth()

    if (sessionClaims?.metadata.role !== 'admin') {
        redirect('/')
    }

    return (
        <>
            <h1>This is the Users dashboard</h1>
            <p>This page is restricted to users with the admin role.</p>
        </>
    )
}
