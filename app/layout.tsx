import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Sidebar } from '@/app/sidebar'
import { Header } from '@/app/header'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Engineering Request Tracker',
    description: 'created by F',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClerkProvider>
            <html lang='en'>
                <body className={`${inter.className} min-h-screen w-full flex`}>
                    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                        <Sidebar />
                        <main className='w-full'>
                            <Header />
                            {children}
                        </main>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
