"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  LayoutDashboardIcon,
  UserIcon,
  CarIcon,
  CalendarIcon,
  PackageIcon,
  HeartIcon,
  MapPinIcon,
  MenuIcon,
  BellIcon,
  LogOutIcon,
  WrenchIcon,
  ChevronDownIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/stores/auth-store"
import { cn, getInitials } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", href: "/customer/dashboard", icon: LayoutDashboardIcon },
  { label: "My Profile", href: "/customer/profile", icon: UserIcon },
  { label: "My Vehicles", href: "/customer/vehicles", icon: CarIcon },
  { label: "My Bookings", href: "/customer/bookings", icon: CalendarIcon },
  { label: "My Orders", href: "/customer/orders", icon: PackageIcon },
  { label: "Wishlist", href: "/customer/wishlist", icon: HeartIcon },
  { label: "Addresses", href: "/customer/addresses", icon: MapPinIcon },
]

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { userData, logout } = useAuthStore()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2 border-b px-4">
        <div className="flex size-8 items-center justify-center rounded-lg bg-red-600">
          <WrenchIcon className="size-4 text-white" />
        </div>
        <span className="text-lg font-bold">
          P<span className="text-red-600">A</span>
        </span>
      </div>

      <ScrollArea className="flex-1 py-3">
        <nav className="flex flex-col gap-0.5 px-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/customer/dashboard" &&
                pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-red-600/10 text-red-600"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon
                  className={cn(
                    "size-4 shrink-0",
                    isActive ? "text-red-600" : "text-muted-foreground"
                  )}
                />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      <Separator />

      <div className="flex items-center gap-3 p-3">
        <Avatar size="sm">
          <AvatarImage src={userData?.photoURL || ""} alt={userData?.displayName} />
          <AvatarFallback>
            {getInitials(userData?.displayName || "U")}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">
            {userData?.displayName || "Customer"}
          </p>
          <Badge variant="secondary" className="mt-0.5 text-[10px]">
            {userData?.role || "customer"}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleLogout}
          aria-label="Sign out"
        >
          <LogOutIcon className="size-4" />
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 border-r bg-card lg:block">
        <SidebarContent />
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-card px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger render={<Button variant="ghost" size="icon-sm" className="lg:hidden" />}>
                <MenuIcon className="size-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <h2 className="text-sm font-medium text-muted-foreground lg:hidden">
              {navItems.find(
                (item) =>
                  item.href === pathname ||
                  (item.href !== "/customer/dashboard" &&
                    pathname.startsWith(item.href))
              )?.label || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon-sm" className="relative">
              <BellIcon className="size-4" />
              <span className="absolute right-1 top-1 size-2 rounded-full bg-red-600" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" size="sm" className="gap-2" />}>
                <Avatar size="sm">
                  <AvatarImage
                    src={userData?.photoURL || ""}
                    alt={userData?.displayName}
                  />
                  <AvatarFallback>
                    {getInitials(userData?.displayName || "U")}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium md:inline-block">
                  {userData?.displayName || "Customer"}
                </span>
                <ChevronDownIcon className="size-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem render={<Link href="/customer/profile" />}>
                  <UserIcon className="size-4" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/customer/orders" />}>
                  <PackageIcon className="size-4" />
                  My Orders
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOutIcon className="size-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
