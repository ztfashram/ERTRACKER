'use client'

import { Table } from '@tanstack/react-table'

interface RequestTableToolbarProps<TData> {
    table: Table<TData>
}
export function RequestTableToolbar<TData>({ table }: RequestTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    return <div>request-table-toolbar</div>
}
