'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Request } from '@prisma/client'
import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DeleteAlertDialog } from '../app/requests/_components/deleteAlertDialog'
import { EditDropdownMenuItem } from '../app/requests/_components/editDropdownMenuItem'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { statuses } from './request-table-toolbar'

type EnrichedRequests = Request & { username: string }

export const columns: ColumnDef<EnrichedRequests>[] = [
    {
        accessorKey: 'title',
        header: ({ column }) => {
            return (
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Title
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
    },
    {
        accessorKey: 'customer',
        header: ({ column }) => {
            return (
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Customer
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
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
        header: ({ column }) => {
            return (
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Type
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: ({ row }) => <div className=''>{(row.getValue('type') as string).replace('_', ' ')}</div>,
    },
    {
        accessorKey: 'status',
        header: ({ column }) => {
            return (
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Status
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: ({ row }) => {
            const status = statuses.find((status) => status.value === row.getValue('status'))
            if (!status) return null
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
            return <Badge className={bgColor(status.label as string)}>{status.value}</Badge>
        },
        filterFn: (row, status, value) => {
            return value.includes(row.getValue(status))
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
        header: ({ column }) => {
            return (
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Created At
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = row.getValue('createdAt')
            const formattedDate = new Date(date as string).toLocaleDateString('en-AU')

            return <div className='font-medium'>{formattedDate}</div>
        },
    },
    {
        accessorKey: 'updatedAt',
        header: ({ column }) => {
            return (
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Updated At
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = row.getValue('updatedAt')
            const formattedDate = new Date(date as string).toLocaleDateString('en-AU')

            return <div className='font-medium'>{formattedDate}</div>
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
