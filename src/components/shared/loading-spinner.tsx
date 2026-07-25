import { cn } from "@/lib/utils"
import { Loader2Icon } from "lucide-react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const sizeMap = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
  xl: "size-12",
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  return (
    <Loader2Icon
      className={cn("animate-spin text-muted-foreground", sizeMap[size], className)}
    />
  )
}
