import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Mona_Sans as FontSans, Fira_Mono as FontMono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/navbar"
import MatrixFooter from "@/components/matrix-footer"
import ScrollToTop from "@/components/scroll-to-top"
import FloatingWasteModels from "@/components/floating-waste-models"

const inter = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
})

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <ScrollToTop />
            <div className="flex min-h-screen flex-col bg-black text-green-400 relative">
              <FloatingWasteModels
                types={["organic", "plastic", "e-waste"]}
                opacity={0.15}
                rotationSpeed={0.002}
              />
              <Navbar />
              <main className="flex-1 relative z-10">{children}</main>
              <MatrixFooter />
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
