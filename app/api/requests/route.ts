import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { auth } from '@clerk/nextjs/server'
import { createRequestSchema } from '../../validationSchema'

// export async function GET() {
//     try {
//         const res = await fetch(process.env.URL + '/api/requests/', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             cache: 'no-store',
//             next: { tags: ['requests'] },
//         })
//         if (!res.ok) {
//             console.log('failed at ' + process.env.URL + '/api/requests/')
//             throw new Error('Failed to fetch data. Server returned status: ' + res.status)
//         }
//         const data = await res.json()
//         return data
//     } catch (error) {
//         console.error(error)
//         return null
//     }
// }
export async function POST(req: NextRequest) {
    try {
        const { userId } = auth()
        const body = await req.json()
        console.log('received data:', body)

        if (!userId) {
            return NextResponse.json({ error: 'Unauthrozied' }, { status: 401 })
        }

        const requestBody = { ...body, requesterId: userId }

        const validation = createRequestSchema.safeParse(requestBody)
        if (!validation.success) {
            return NextResponse.json(validation.error.errors, { status: 400 })
        }

        const newRequest = await prisma.request.create({
            data: {
                ...requestBody,
                createAt: new Date(),
                updatedAt: new Date(),
            },
        })
        return NextResponse.json(newRequest, { status: 201 })
    } catch (error) {
        console.error('Error Creating Request: ', error)
        return NextResponse.json(error, { status: 500 })
    }
}

// async function PUT(req: NextRequest) {
//   const { id } = req.nextUrl.searchParams;
//   const body = await req.json();
//   const validation = updateRequestSchema.partial().safeParse(body);
//   if (!validation.success) {
//     return NextResponse.json(validation.error.errors, { status: 401 });
//   }
//   const request = await prisma.request.update({
//     where: { id },
//     data: {
//       ...parsed,
//       updatedAt: new Date(),
//     },
//   });
//   return NextResponse.json(request, { status: 200 });
// }
