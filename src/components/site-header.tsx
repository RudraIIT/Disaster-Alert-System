"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserMenu } from "@/components/user-menu"
import { useAuth } from "@/components/providers/auth-provider"
import Cookies from "js-cookie"

export function SiteHeader() {
  const { isAuthenticated } = useAuth()

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold">
          Disaster Alert System
        </Link>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <>
              <Button asChild onClick={ () => Cookies.remove('user') }>
                <Link href="/login">Logout</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

