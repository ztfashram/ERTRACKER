'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { deleteRequest } from '@/app/requests/_actions/delete-request'
import { useRouter } from 'next/navigation'

export function DeleteDropdownMenuItem({ id }: { id: string }) {
    const router = useRouter()
    return (
        <DropdownMenuItem
            className='focus:bg-destructive focus:text-destructive-foreground text-red-500'
            onClick={async () => {
                await deleteRequest(id)
                router.refresh()
            }}
        >
            Delete
        </DropdownMenuItem>
    )
}
