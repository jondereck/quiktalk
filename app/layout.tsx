import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/provider/theme-provider'
import { cn } from '@/lib/utils'
import { ModalProvider } from '@/components/provider/modal-provider'
import { Toaster } from '@/components/ui/toaster'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quiktalk ',
  description: 'Fastest conversation starter',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>

        <body className={cn(font.className,
          "bg-[#FFFAE7] dark:bg-[#1B2430]")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark" 
            enableSystem={false}
            storageKey="quiktalk-theme"
          >
          <Toaster/>
          <ModalProvider/>
            {children}
          </ThemeProvider>
        </body>

      </html>
    </ClerkProvider>
  )
}
