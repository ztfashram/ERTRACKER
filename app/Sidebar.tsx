'use client'
import { Button, buttonVariants } from '../components/ui/button'
import {
    ChevronLeft,
    ChevronRight,
    ClipboardPlus,
    Home,
    LayoutList,
    LogIn,
    TrainFront,
    Users,
    Notebook,
} from 'lucide-react'
import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Separator } from '../components/ui/separator'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs'

const navItems = [
    { text: 'Home', href: '/', icon: <Home /> },
    { text: 'New Request', href: '/requests/new', icon: <ClipboardPlus /> },
    { text: 'Requests', href: '/requests', icon: <LayoutList /> },
    { text: 'Users', href: '/users', icon: <Users /> },
]

export const Sidebar = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<Boolean>(false)
    const pathname = usePathname()
    const { user, isLoaded } = useUser()

    const MenuItem = ({ href, icon, text, key }: { href: string; icon: ReactNode; text: string; key: number }) => {
        return (
            <Link
                href={href}
                className={cn(
                    buttonVariants({
                        variant: href === pathname ? 'default' : 'ghost',
                        size: 'icon',
                    }),
                    'w-full justify-start cursor-pointer gap-2 px-4 py-2'
                )}
                key={key}
            >
                <div>{icon}</div>
                <div>{text}</div>
            </Link>
        )
    }

    return (
        <div className='sticky top-0 h-screen flex flex-col w-[300px] min-w-[80px] border-r p-2 '>
            {/* TODO: Collapse Button */}
            {/* <div className='absolute right-[-20px] top-1/2 transform -translate-y-1/2 h-screen w-10 flex justify-center items-center z-50'>
				<Button
					onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
					variant='secondary'
					className=' rounded-full p-2'
				>
					{isSidebarCollapsed ? <ChevronLeft /> : <ChevronRight />}
				</Button>
			</div> */}
            <Link
                href='/'
                className={cn(
                    buttonVariants({ variant: 'ghost', size: 'icon' }),
                    'w-full justify-start cursor-pointer gap-2 px-4 text-2xl font-bold text-center mb-8 hover:bg-transparent'
                )}
            >
                <Notebook />
                <div>ER.TRACKER</div>
            </Link>
            <div className='space-y-1 grow py-2  group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
                {navItems.map((item, i) =>
                    MenuItem({
                        href: item.href,
                        icon: item.icon,
                        text: item.text,
                        key: i,
                    })
                )}
            </div>
            <Separator />
            <div className='pt-4'>
                <div className='flex justify-start items-center text-center font-bold gap-2 px-4'>
                    <SignedIn>
                        {/* Signed in users get sign out button */}
                        <UserButton />
                        <p>{user && user.fullName}</p>
                    </SignedIn>
                    <SignedOut>
                        {/* Signed out users get sign in button */}
                        <SignInButton />
                    </SignedOut>
                </div>
            </div>
        </div>
    )
}
