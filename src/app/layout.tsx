import { Header } from '@/components/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { NextAuthProvider } from '@/providers/auth'
import { ToastProvider } from '@/providers/toats'
import { ProductContextProvider } from '@/context/listProducts'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shopy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <NextAuthProvider>
          <ToastProvider>
            <ProductContextProvider>
              <Header />
              {children}
            </ProductContextProvider>
          </ToastProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
