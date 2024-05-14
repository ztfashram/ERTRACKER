'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Request } from '@prisma/client'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DeleteAlertDialog } from './deleteAlertDialog'
import { EditDropdownMenuItem } from './editDropdownMenuItem'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

type EnrichedRequests = Request & { username: string }

export const columns: ColumnDef<EnrichedRequests>[] = [
    {
        accessorKey: 'title',
        header: 'Title',
    },
    {
        accessorKey: 'customer',
        header: 'Customer',
        cell: ({ row }) => <div className='truncate max-w-[120px]'>{row.getValue('customer')}</div>,
        // TODO: Wrap with tool tip
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => <div className='truncate max-w-[180px]'>{row.getValue('description')}</div>,
    },
    {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ row }) => <div className=''>{(row.getValue('type') as string).replace('_', ' ')}</div>,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = (row.getValue('status') as string).replace('_', ' ')
            function bgColor(status: string) {
                if (status === 'Cancelled') {
                    return 'bg-red-500 hover:bg-red-500/80'
                }
                if (status === 'In Progress') {
                    return 'bg-orange-500 hover:bg-orange-500/80'
                }
                if (status === 'Completed') {
                    return 'bg-green-500 hover:bg-green-500/80'
                }
            }
            return <Badge className={bgColor(status)}>{status}</Badge>
        },
    },
    {
        accessorKey: 'username',
        header: 'Requester',
        cell: ({ row }) => (
            <div className=''>
                {(row.getValue('username') as string).charAt(0).toUpperCase() +
                    (row.getValue('username') as string).slice(1)}
            </div>
        ),
    },
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
    {
        id: 'actions',
        cell: ({ row }) => {
            const request = row.original
            return (
                <AlertDialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='ghost' className='h-8 w-8 p-0'>
                                <span className='sr-only'>Open menu</span>
                                <MoreHorizontal className='h-4 w-4' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <EditDropdownMenuItem id={request.id} />
                            <AlertDialogTrigger className='w-full '>
                                <DropdownMenuItem className='focus:bg-destructive focus:text-destructive-foreground text-red-500'>
                                    Delete
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DeleteAlertDialog id={request.id} />
                </AlertDialog>
            )
        },
    },
]