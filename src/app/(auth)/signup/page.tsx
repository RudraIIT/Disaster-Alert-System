import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SignUpForm } from "@/components/auth/signup-form"


export const metadata: Metadata = {
  title: "Sign Up - Disaster Alert System",
  description: "Create an account for the Disaster Alert System",
}

export default function SignUpPage() {
  return (
    <div className="w-full max-w-[400px]">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>Enter your details to get started with the Disaster Alert System</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

