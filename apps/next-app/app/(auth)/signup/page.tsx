"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Code2, ArrowLeft, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/theme-toggle"
import { OTPDialog } from "@/components/otp-dialog"
import { authClient } from "@/lib/auth-client";
import { signupSchema } from "@repo/database/zod"
import { setAdmin } from "@/lib/set-admin"

export default function SignUpPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [showOTPDialog, setShowOTPDialog] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  })
  const [zodError,setZodError] = React.useState({
    status: false,
    message: ""
  })
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const zodResult = signupSchema.safeParse(formData)
    if (zodResult.error) {
      setZodError({status: true,message: JSON.parse(zodResult.error.message)[0].message})
      return
    }
    const { data, error } = await authClient.signUp.email({
            email: formData.email, 
            password: formData.password, // min 8 characters by default
            name: formData.name
        }, {
            onRequest: (ctx) => {
                setIsLoading(true)
            },
            onSuccess: async (ctx) => {
                setIsLoading(false)
                const { data,error } = await authClient.emailOtp.sendVerificationOtp({
                    email: formData.email,
                    type: "email-verification"
                });
                if (error) return alert("Error while sending verification email")
                setShowOTPDialog(true)
            },
            onError: (ctx) => {
                // display the error message
                console.log(ctx.error)
                alert(ctx.error.message);
            },
    });
    if (error) alert("Error while signing up, please try again")
  }

  const handleVerifyOTP = async (otp: string) => {
    const { data, error } = await authClient.emailOtp.verifyEmail({
        email: formData.email, 
        otp
    });
    if (error) {
      throw new Error(error.message)
    }
    const response = await setAdmin(formData.email)
    if (!response) {
      throw new Error("error while creating admin")
    }
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold tracking-tight">CodeArena</span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="container mx-auto flex max-w-6xl flex-col items-center px-4 py-12 md:py-24">
        <Button variant="ghost" size="sm" asChild className="mb-8 self-start">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </Button>

        <div className="w-full max-w-md">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
            <p className="mt-2 text-muted-foreground">Start your journey to becoming a better developer</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              { (zodError.status) ? <p className="text-sm text-red-500 text-muted-foreground">Error! : {zodError.message}</p> : null}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/signin" className="font-medium text-primary underline-offset-4 hover:underline">
              Sign in
            </Link>
          </p>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            By creating an account, you agree to our{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-foreground">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-foreground">
              Privacy Policy
            </Link>
          </p>
        </div>
      </main>

      <OTPDialog
        open={showOTPDialog}
        onOpenChange={setShowOTPDialog}
        email={formData.email}
        onVerify={handleVerifyOTP}
      />
    </div>
  )
}
