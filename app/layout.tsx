import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Inter, Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/navbar"
import MatrixFooter from "@/components/matrix-footer"
import ScrollToTop from "@/components/scroll-to-top"
import { FloatingChatbot } from "@/components/floating-chatbot"
import { EnhancedLight3DBackground } from "@/components/enhanced-light-3d-background"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Smart Waste Segregation - AI-Powered Waste Management",
  description:
    "Revolutionary waste management through AI-powered classification, real-time monitoring, and blockchain verification",
  generator: "Smart Waste AI",
  keywords: ["waste management", "AI", "recycling", "sustainability", "environment"],
  authors: [{ name: "Smart Waste Team" }],
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          themes={["light", "dark", "ocean", "sunset", "forest"]}
        >
          <AuthProvider>
            <ScrollToTop />
            <EnhancedLight3DBackground />
            <div className="flex min-h-screen flex-col relative">
              <Navbar />
              <main className="flex-1 relative z-10">{children}</main>
              <FloatingChatbot />
              <MatrixFooter />
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
