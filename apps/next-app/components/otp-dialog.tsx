"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface OTPDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  email: string
  onVerify: (otp: string) => Promise<void>
}

export function OTPDialog({ open, onOpenChange, email, onVerify }: OTPDialogProps) {
  const [otp, setOtp] = React.useState("")
  const [isVerifying, setIsVerifying] = React.useState(false)
  const [error, setError] = React.useState("")

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit code")
      return
    }

    setIsVerifying(true)
    setError("")

    try {
      await onVerify(otp)
    } catch {
      setError("Invalid code. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResend = () => {
    setOtp("")
    setError("")
    // Add resend logic here
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify your email</DialogTitle>
          <DialogDescription>
            We&apos;ve sent a 6-digit verification code to <span className="font-medium text-foreground">{email}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-4">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => {
              setOtp(value)
              setError("")
            }}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button onClick={handleVerify} disabled={otp.length !== 6 || isVerifying} className="w-full">
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Didn&apos;t receive the code?{" "}
            <button onClick={handleResend} className="font-medium text-primary underline-offset-4 hover:underline">
              Resend
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
