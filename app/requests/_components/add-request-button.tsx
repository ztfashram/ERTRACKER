'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function AddRequestButton() {
    const router = useRouter()
    return <Button onClick={() => router.push('/requests/new')}>New Request</Button>
}
