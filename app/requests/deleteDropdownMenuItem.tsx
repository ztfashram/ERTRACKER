'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import deleteRequest from '@/app/requests/delete-request'
import { useRouter } from 'next/navigation'

export function DeleteDropdownMenuItem({ id }: { id: string }) {
    const router = useRouter()
    return (
        <DropdownMenuItem
            onClick={async () => {
                await deleteRequest(id)
                router.refresh()
            }}
        >
            Delete
        </DropdownMenuItem>
    )
}
