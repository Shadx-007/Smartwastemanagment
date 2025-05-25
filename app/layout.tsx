import type React from "react"
import type { Metadata } from "next"
import { Inter, Cinzel } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import Navbar from "@/components/navbar"
import { EnhancedFooter } from "@/components/enhanced-footer"
import { Chatbot } from "@/components/chatbot"
import { ScrollToTop } from "@/components/scroll-to-top"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" })

export const metadata: Metadata = {
  title: "Smart Waste Segregation System",
  description: "AI-powered waste management solution",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${cinzel.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ScrollToTop />
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <EnhancedFooter />
          </div>
          <Chatbot />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
