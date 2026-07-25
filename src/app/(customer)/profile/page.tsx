"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  LockIcon,
  Loader2Icon,
  CheckCircleIcon,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ConfirmDialog } from "@/components/shared/confirm-dialog"
import { useAuthStore } from "@/stores/auth-store"
import { profileSchema } from "@/lib/validations"
import { formatDateTime } from "@/lib/utils"

type ProfileFormData = {
  name: string
  email: string
  phone?: string
}

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type ChangePasswordInput = z.infer<typeof changePasswordSchema>

export default function CustomerProfilePage() {
  const { userData, refreshUserData } = useAuthStore()
  const [isSaving, setIsSaving] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema) as never,
    defaultValues: {
      name: userData?.displayName || "",
      email: userData?.email || "",
      phone: userData?.phoneNumber || "",
    },
  })

  const onSubmit = async (data: ProfileFormData) => {
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsSaving(false)
    await refreshUserData()
    toast.success("Profile updated successfully")
  }

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  })

  const handlePasswordSubmit = async (data: ChangePasswordInput) => {
    void data
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsSaving(false)
    toast.success("Password changed successfully")
    resetPasswordForm()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage your personal information and account settings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your name, email, and phone number.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    className="pl-10"
                    disabled={isSaving}
                    {...register("name")}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10"
                    disabled
                    {...register("email")}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Contact support to change your email.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone <span className="text-muted-foreground">(optional)</span>
                </Label>
                <div className="relative">
                  <PhoneIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    className="pl-10"
                    disabled={isSaving}
                    {...register("phone")}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-destructive">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving || !isDirty}>
                {isSaving && <Loader2Icon className="mr-2 size-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitPassword(handlePasswordSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="currentPassword"
                  type="password"
                  className="pl-10"
                  placeholder="••••••••"
                  disabled={isSaving}
                  {...registerPassword("currentPassword")}
                />
              </div>
              {passwordErrors.currentPassword && (
                <p className="text-xs text-destructive">
                  {passwordErrors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="newPassword"
                    type="password"
                    className="pl-10"
                    placeholder="••••••••"
                    disabled={isSaving}
                    {...registerPassword("newPassword")}
                  />
                </div>
                {passwordErrors.newPassword && (
                  <p className="text-xs text-destructive">
                    {passwordErrors.newPassword.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="pl-10"
                    placeholder="••••••••"
                    disabled={isSaving}
                    {...registerPassword("confirmPassword")}
                  />
                </div>
                {passwordErrors.confirmPassword && (
                  <p className="text-xs text-destructive">
                    {passwordErrors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2Icon className="mr-2 size-4 animate-spin" />}
                Change Password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-green-500/10 p-2">
              <CheckCircleIcon className="size-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Email Verified</p>
              <p className="text-xs text-muted-foreground">
                Your email address has been verified.
              </p>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            Account created: {userData?.createdAt ? formatDateTime(userData.createdAt) : "N/A"}
          </div>
          <Separator />
          <div>
            <h4 className="text-sm font-medium text-destructive">Danger Zone</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <Button
              variant="destructive"
              size="sm"
              className="mt-3"
              onClick={() => setShowDeleteDialog(true)}
            >
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete Account"
        description="This action cannot be undone. All your data will be permanently deleted."
        confirmLabel="Delete Account"
        destructive
        onConfirm={() => {
          setShowDeleteDialog(false)
          toast.success("Account deletion request submitted")
        }}
      />
    </div>
  )
}
