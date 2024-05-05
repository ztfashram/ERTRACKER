'use client'

import { ColumnDef } from '@tanstack/react-table'
import { RequestSchema } from '@/app/validationSchema'

export const columns: ColumnDef<RequestSchema>[] = [
    {
        accessorKey: 'title',
        header: 'Title',
    },
    {
        accessorKey: 'customer',
        header: 'Customer',
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        accessorKey: 'type',
        header: 'Type',
    },
    {
        accessorKey: 'isCompleted',
        header: 'Is Completed',
    },
    { accessorKey: 'requesterId', header: 'Requester Id' },
    {
        accessorKey: 'createdAt',
        header: () => <div className='text-right'>Created At</div>,
        cell: ({ row }) => {
            const date = row.getValue('createdAt')
            const formattedDate = new Date(date as string).toLocaleDateString('en-AU')

            return <div className='text-right font-medium'>{formattedDate}</div>
        },
    },
    {
        accessorKey: 'updatedAt',
        header: () => <div className='text-right'>Updated At</div>,
        cell: ({ row }) => {
            const date = row.getValue('updatedAt')
            const formattedDate = new Date(date as string).toLocaleDateString('en-AU')

            return <div className='text-right font-medium'>{formattedDate}</div>
        },
    },
]
