'use client'
import { buttonVariants } from '../components/ui/button'
import { ClipboardPlus, Home, LayoutList, Users, Notebook } from 'lucide-react'
import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Separator } from '../components/ui/separator'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const navItems = [
    { text: 'Home', href: '/', icon: <Home /> },
    { text: 'New Request', href: '/requests/new', icon: <ClipboardPlus /> },
    { text: 'Requests', href: '/requests', icon: <LayoutList /> },
    { text: 'Users', href: '/users', icon: <Users /> },
]

export const Sidebar = () => {
    const pathname = usePathname()
    const { user } = useUser()

    const MenuItem = ({ href, icon, text, key }: { href: string; icon: ReactNode; text: string; key: number }) => {
        return (
            <Tooltip key={key}>
                <TooltipTrigger className='w-full'>
                    <Link
                        href={href}
                        className={cn(
                            buttonVariants({
                                variant: href === pathname ? 'default' : 'ghost',
                                size: 'icon',
                            }),
                            'w-full justify-start cursor-pointer gap-2 px-2 py-2'
                        )}
                    >
                        <div>{icon}</div>
                        <div className='hidden md:block'>{text}</div>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side='right' className='flex items-center gap-4 md:hidden'>
                    <span>{text}</span>
                </TooltipContent>
            </Tooltip>
        )
    }

    return (
        <TooltipProvider delayDuration={0}>
            <div className='sticky top-0 h-screen flex flex-col w-[60px] md:w-[220px] border-r p-2 '>
                <Link
                    href='/'
                    className={cn(
                        buttonVariants({ variant: 'ghost', size: 'icon' }),
                        'w-full justify-start cursor-pointer gap-2 px-2 mb-8 hover:bg-transparent'
                    )}
                >
                    <div>
                        <Notebook />
                    </div>
                    <div className='text-xl font-bold text-center scale-0 md:scale-100'>ER.TRACKER</div>
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
                    <div className='flex justify-start items-center text-center font-bold gap-2 px-2'>
                        <SignedIn>
                            {/* Signed in users get sign out button */}
                            <UserButton />
                            <p className='scale-0 md:scale-100'>{user && user.fullName}</p>
                        </SignedIn>
                        <SignedOut>
                            {/* Signed out users get sign in button */}
                            <SignInButton />
                        </SignedOut>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    )
}
