import type { Metadata } from 'next'
import './globals.css'
import { Poppins } from 'next/font/google'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext"

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'MCASH MEETTING SCHEDULER',
  description: 'Created by BCC STUDENTS',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`font-poppins ${poppins.className}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}