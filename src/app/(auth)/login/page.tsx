import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Login - Disaster Alert System",
  description: "Login to access the Disaster Alert System",
}

export default function LoginPage() {
  return (
    <div className="w-full max-w-[400px]"> {/* Container with a max width of 400px */}
      <Card className="w-full"> {/* Card component to wrap the login form */}
        <CardHeader className="space-y-1"> {/* Card header section */}
          <CardTitle className="text-2xl">Login</CardTitle> {/* Title of the login card */}
          <CardDescription>
            Enter your Username and password to access the dashboard
          </CardDescription> {/* Short description for users */}
        </CardHeader>
        <CardContent>
          <LoginForm /> {/* Renders the LoginForm component */}
        </CardContent>
        <CardFooter> {/* Footer section of the card */}
          <div className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "} {/* Display sign-up prompt */}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up {/* Link to the sign-up page */}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

