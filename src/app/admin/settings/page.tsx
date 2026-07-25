"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { SaveIcon, UploadIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/layout/page-header"
import { settingsSchema, type SettingsInput } from "@/lib/validations"

const defaultValues: SettingsInput = {
  siteName: "Phephetha Auto",
  siteDescription: "Premium automotive service centre and parts supplier",
  contactInfo: {
    email: "info@phephetha.co.za",
    phone: "+27 11 234 5678",
    address: "123 Main Road, Randburg, Gauteng, 2194",
  },
  businessHours: {
    monday: { open: "07:30", close: "17:30" },
    tuesday: { open: "07:30", close: "17:30" },
    wednesday: { open: "07:30", close: "17:30" },
    thursday: { open: "07:30", close: "17:30" },
    friday: { open: "07:30", close: "17:00" },
    saturday: { open: "08:00", close: "14:00" },
    sunday: { open: "09:00", close: "12:00", closed: false },
  },
}

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const

export default function AdminSettingsPage() {
  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://facebook.com/phephetha",
    instagram: "https://instagram.com/phephetha",
    twitter: "https://twitter.com/phephetha",
    youtube: "",
  })
  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailBookings: true,
    emailLowStock: true,
    emailReviews: false,
    smsOrders: false,
    smsBookings: true,
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsInput>({
    resolver: zodResolver(settingsSchema),
    defaultValues,
  })

  const onSubmit = (data: SettingsInput) => {
    console.log("Saving settings:", { ...data, socialLinks, notifications })
    toast.success("Settings saved successfully!")
  }

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Settings"
        description="Configure your site settings"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name *</Label>
              <Input id="siteName" {...register("siteName")} />
              {errors.siteName && <p className="text-xs text-destructive">{errors.siteName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Site Description *</Label>
              <Textarea id="siteDescription" {...register("siteDescription")} rows={3} />
              {errors.siteDescription && <p className="text-xs text-destructive">{errors.siteDescription.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Logo</Label>
              <div className="flex items-center gap-4">
                <div className="flex size-16 items-center justify-center rounded-lg border border-dashed bg-muted">
                  <UploadIcon className="size-6 text-muted-foreground" />
                </div>
                <Button type="button" variant="outline" size="sm">
                  <UploadIcon className="size-4" />
                  Upload Logo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" {...register("contactInfo.email")} />
                {errors.contactInfo?.email && <p className="text-xs text-destructive">{errors.contactInfo.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" {...register("contactInfo.phone")} />
                {errors.contactInfo?.phone && <p className="text-xs text-destructive">{errors.contactInfo.phone.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input id="address" {...register("contactInfo.address")} />
              {errors.contactInfo?.address && <p className="text-xs text-destructive">{errors.contactInfo.address.message}</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {days.map((day) => (
                <div key={day} className="flex items-center gap-4">
                  <span className="w-28 capitalize text-sm font-medium">{day}</span>
                  <Input
                    type="time"
                    {...register(`businessHours.${day}.open`)}
                    className="w-32"
                  />
                  <span className="text-muted-foreground">to</span>
                  <Input
                    type="time"
                    {...register(`businessHours.${day}.close`)}
                    className="w-32"
                  />
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      {...register(`businessHours.${day}.closed`)}
                      className="size-4 rounded border-input"
                    />
                    Closed
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Media Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(socialLinks).map(([platform, url]) => (
              <div key={platform} className="space-y-2">
                <Label className="capitalize">{platform}</Label>
                <Input
                  value={url}
                  onChange={(e) => setSocialLinks({ ...socialLinks, [platform]: e.target.value })}
                  placeholder={`https://${platform}.com/yourpage`}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(notifications).map(([key, value]) => {
                const label = key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (s) => s.toUpperCase())
                return (
                  <div key={key} className="flex items-center justify-between rounded-lg border p-3">
                    <span className="text-sm">{label}</span>
                    <button
                      type="button"
                      onClick={() => setNotifications({ ...notifications, [key]: !value })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? "bg-primary" : "bg-muted"}`}
                    >
                      <span className={`inline-block size-4 rounded-full bg-white transition-transform ${value ? "translate-x-6" : "translate-x-1"}`} />
                    </button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            <SaveIcon className="size-4" />
            {isSubmitting ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  )
}
