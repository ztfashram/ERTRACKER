'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'

export function EditDropdownMenuItem({ id }: { id: string }) {
    const router = useRouter()
    return (
        <DropdownMenuItem
            onClick={() => {
                router.push(`/requests/${id}/edit`)
            }}
        >
            Edit
        </DropdownMenuItem>
    )
}
