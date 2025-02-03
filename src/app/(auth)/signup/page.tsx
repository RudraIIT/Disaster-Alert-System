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
      <div className="w-full max-w-[400px]"> {/* Container with a max width of 400px for responsiveness */}
        <Card className="w-full"> {/* Card component to wrap the signup form */}
          <CardHeader className="space-y-1"> {/* Card header section with spacing */}
            <CardTitle className="text-2xl">Create an account</CardTitle> {/* Title for the signup card */}
            <CardDescription>
              Enter your details to get started with the Disaster Alert System
            </CardDescription> {/* Short description guiding users */}
          </CardHeader>
          <CardContent>
            <SignUpForm /> {/* Renders the SignUpForm component for user input */}
          </CardContent>
          <CardFooter> {/* Footer section of the card */}
            <div className="text-sm text-muted-foreground">
              Already have an account?{" "} {/* Display login prompt for existing users */}
              <Link href="/login" className="text-primary hover:underline">
                Login {/* Link to the login page */}
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>

  )
}

