"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { MailIcon, Loader2Icon, ArrowLeftIcon, CheckCircleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useAuthStore } from "@/stores/auth-store"
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validations"

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  })

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsLoading(true)
    const result = await resetPassword(data.email)
    setIsLoading(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      setSubmitted(true)
      toast.success("Reset link sent! Check your email.")
    }
  }

  if (submitted) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center py-12 text-center">
          <div className="rounded-full bg-green-500/10 p-4">
            <CheckCircleIcon className="size-10 text-green-600" />
          </div>
          <h2 className="mt-4 text-xl font-bold">Check Your Email</h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            We&apos;ve sent a password reset link to your email address. Please
            check your inbox and follow the instructions.
          </p>
          <Button className="mt-6" variant="outline" render={<Link href="/login" />}>
            <ArrowLeftIcon className="mr-2 size-4" />
            Back to Login
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
        <CardDescription>
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <MailIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="pl-10"
                disabled={isLoading}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2Icon className="mr-2 size-4 animate-spin" />}
            Send Reset Link
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-medium text-red-600 hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
