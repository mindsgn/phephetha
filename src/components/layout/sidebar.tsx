"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboardIcon,
  PackageIcon,
  ShoppingCartIcon,
  CalendarIcon,
  UsersIcon,
  WarehouseIcon,
  WrenchIcon,
  StarIcon,
  FileTextIcon,
  TagIcon,
  TicketIcon,
  BarChart3Icon,
  SettingsIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  LogOutIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboardIcon },
  { label: "Products", href: "/dashboard/products", icon: PackageIcon },
  { label: "Orders", href: "/dashboard/orders", icon: ShoppingCartIcon },
  { label: "Bookings", href: "/dashboard/bookings", icon: CalendarIcon },
  { label: "Customers", href: "/dashboard/customers", icon: UsersIcon },
  { label: "Inventory", href: "/dashboard/inventory", icon: WarehouseIcon },
  { label: "Services", href: "/dashboard/services", icon: WrenchIcon },
  { label: "Reviews", href: "/dashboard/reviews", icon: StarIcon },
  { label: "Blog", href: "/dashboard/blog", icon: FileTextIcon },
  { label: "Promotions", href: "/dashboard/promotions", icon: TagIcon },
  { label: "Coupons", href: "/dashboard/coupons", icon: TicketIcon },
  { label: "Reports", href: "/dashboard/reports", icon: BarChart3Icon },
  { label: "Settings", href: "/dashboard/settings", icon: SettingsIcon },
]

interface AdminSidebarProps {
  collapsed?: boolean
  onToggle?: () => void
  className?: string
  user?: {
    displayName?: string | null
    email?: string | null
    photoURL?: string | null
  }
  role?: string
}

export function AdminSidebar({
  collapsed = false,
  onToggle,
  className,
  user,
  role = "admin",
}: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <TooltipProvider delay={0}>
      <aside
        className={cn(
          "flex h-screen flex-col border-r bg-card transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          className
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!collapsed && (
            <Link
              href="/dashboard"
              className="flex items-center gap-1 text-lg font-bold"
            >
              P<span className="text-red-600">A</span>
            </Link>
          )}
          {onToggle && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onToggle}
              className="ml-auto"
            >
              {collapsed ? (
                <ChevronsRightIcon className="size-4" />
              ) : (
                <ChevronsLeftIcon className="size-4" />
              )}
            </Button>
          )}
        </div>

        <ScrollArea className="flex-1 py-2">
          <nav className="flex flex-col gap-0.5 px-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger
                    render={
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-red-600/10 text-red-600"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          collapsed && "justify-center px-0"
                        )}
                      />
                    }
                  >
                    <item.icon
                      className={cn(
                        "size-4 shrink-0",
                        isActive
                          ? "text-red-600"
                          : "text-muted-foreground group-hover:text-foreground"
                      )}
                    />
                    {!collapsed && <span>{item.label}</span>}
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      {item.label}
                    </TooltipContent>
                  )}
                </Tooltip>
              )
            })}
          </nav>
        </ScrollArea>

        <Separator />

        <div
          className={cn(
            "flex items-center gap-3 border-t p-3",
            collapsed && "justify-center"
          )}
        >
          {!collapsed && user && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {user.displayName || "Admin"}
              </p>
              <Badge variant="secondary" className="mt-0.5 text-[10px]">
                {role}
              </Badge>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => signOut(auth)}
            aria-label="Sign out"
          >
            <LogOutIcon className="size-4" />
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  )
}

interface MobileAdminSidebarProps {
  open: boolean
  onClose: () => void
  user?: {
    displayName?: string | null
    email?: string | null
    photoURL?: string | null
  }
  role?: string
}

export function MobileAdminSidebar({
  open,
  onClose,
  user,
  role = "admin",
}: MobileAdminSidebarProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] lg:hidden"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute inset-y-0 left-0 flex w-64 flex-col border-r bg-card shadow-xl"
          >
            <div className="flex h-16 items-center justify-between border-b px-4">
              <Link
                href="/dashboard"
                className="text-lg font-bold"
                onClick={onClose}
              >
                PHEPHETHA<span className="text-red-600">AUTO</span>
              </Link>
              <Button variant="ghost" size="icon-sm" onClick={onClose}>
                <ChevronsLeftIcon className="size-4" />
              </Button>
            </div>

            <ScrollArea className="flex-1 py-2">
              <nav className="flex flex-col gap-0.5 px-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
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

            {user && (
              <div className="flex items-center gap-3 border-t p-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {user.displayName || "Admin"}
                  </p>
                  <Badge variant="secondary" className="mt-0.5 text-[10px]">
                    {role}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => signOut(auth)}
                >
                  <LogOutIcon className="size-4" />
                </Button>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
