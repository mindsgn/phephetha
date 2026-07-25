"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  XIcon,
  ShoppingCartIcon,
  HeartIcon,
  UserIcon,
  LogInIcon,
  LogOutIcon,
  LayoutDashboardIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/providers/auth-provider"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Parts Store", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    onClose()
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] md:hidden"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-background shadow-xl"
          >
            <div className="flex items-center justify-between border-b p-4">
              <span className="text-lg font-bold">
                PHEPHETHA<span className="text-red-600">AUTO</span>
              </span>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <XIcon className="size-5" />
              </Button>
            </div>

            <nav className="flex-1 space-y-1 p-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={link.href}
                    className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                      pathname === link.href
                        ? "bg-red-600/10 text-red-600"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="border-t p-4 space-y-3">
              <div className="flex gap-2">
                <Link href="/cart" className="flex-1">
                  <Button variant="outline" className="w-full gap-2">
                    <ShoppingCartIcon className="size-4" />
                    Cart
                  </Button>
                </Link>
                <Link href="/wishlist" className="flex-1">
                  <Button variant="outline" className="w-full gap-2">
                    <HeartIcon className="size-4" />
                    Wishlist
                  </Button>
                </Link>
              </div>

              <Separator />

              {user ? (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                    onClick={() => router.push("/account")}
                  >
                    <UserIcon className="size-4" />
                    My Account
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                    onClick={() => router.push("/dashboard")}
                  >
                    <LayoutDashboardIcon className="size-4" />
                    Dashboard
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full gap-2"
                    onClick={() => signOut(auth)}
                  >
                    <LogOutIcon className="size-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 gap-2"
                    onClick={() => router.push("/login")}
                  >
                    <LogInIcon className="size-4" />
                    Sign In
                  </Button>
                  <Button
                    className="flex-1 gap-2 bg-red-600 text-white hover:bg-red-700"
                    onClick={() => router.push("/register")}
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
