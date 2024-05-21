'use client'

import { Table } from '@tanstack/react-table'
import { Input } from './ui/input'
import { RequestTableFacetedFilter } from './request-table-faceted-filter'
import { Button } from './ui/button'
import { X } from 'lucide-react'

export const statuses = [
    {
        value: 'Open',
        label: 'Open',
    },
    {
        value: 'Completed',
        label: 'Completed',
    },
    {
        value: 'Cancelled',
        label: 'Cancelled',
    },
    {
        value: 'In_Progress',
        label: 'In Progress',
    },
]

interface RequestTableToolbarProps<TData> {
    table: Table<TData>
}
export function RequestTableToolbar<TData>({ table }: RequestTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    return (
        <div className='flex items-center justy-between'>
            <div className='flex flex-1 item-center space-x-2'>
                <Input
                    placeholder='Filter requests...'
                    value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
                    className='h-8 w-[150px] lg:w-[250px]'
                />
                {table.getColumn('status') && (
                    <RequestTableFacetedFilter column={table.getColumn('status')} title='Status' options={statuses} />
                )}
                {isFiltered && (
                    <Button variant='ghost' onClick={() => table.resetColumnFilters()} className='h-8 px-2 lg:px-3'>
                        Reset
                        <X className='ml-2 h-4 w-4' />
                    </Button>
                )}
            </div>
        </div>
    )
}
