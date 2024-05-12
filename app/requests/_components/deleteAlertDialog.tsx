'use client'

import { deleteRequest } from '@/app/requests/_actions/requests'
import { useRouter } from 'next/navigation'
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export function DeleteAlertDialog({ id }: { id: string }) {
    const router = useRouter()
    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                {/* <AlertDialogDescription>Are you sure you want to delete this request? </AlertDialogDescription> */}
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                    onClick={async () => {
                        await deleteRequest(id)
                        router.refresh()
                    }}
                >
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    )
}
