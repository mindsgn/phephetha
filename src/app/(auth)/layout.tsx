import Link from "next/link"
import { WrenchIcon } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.02),transparent_40%)]" />
      <div className="relative z-10 w-full max-w-md">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-red-600">
            <WrenchIcon className="size-5 text-white" />
          </div>
          <span className="text-xl font-bold">
            PHEPHETHA<span className="text-red-600">AUTO</span>
          </span>
        </Link>
        {children}
      </div>
    </div>
  )
}
