import './globals.css'
import { Inter } from "next/font/google"
import { SocketProvider } from '@/context/SocketContext'
import { Toaster } from "sonner"
import { AuthProvider } from "@/components/providers/auth-provider"
import { Location } from '@/components/location'

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head> */}
      <body className={inter.className}> {/* SocketProvider ensures real-time WebSocket communication for updates */}
        <SocketProvider>  {/* Location component handles user geolocation tracking for location-based alerts */}
          <Location />      {/* AuthProvider manages authentication state and user access */}
          <AuthProvider>{children}</AuthProvider>  {/* Toaster displays notifications (success, errors, warnings) at the top-center */}
          <Toaster position="top-center" />  
        </SocketProvider>
      </body>

    </html>
  )
}